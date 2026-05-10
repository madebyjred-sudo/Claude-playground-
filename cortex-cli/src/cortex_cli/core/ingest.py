"""Document ingestion. Parses PDF, Word, EPUB, Markdown, plain text and
Wikipedia articles into a uniform `Document` shape that the structure
generator can consume.

A `Document` is a sequence of `Section` objects. Each section has a title
(usually a chapter, heading, or H1/H2 from the source) and a body. We try
to preserve the structure of the source — that's what allows the cortex
generator to populate HIPOCAMPO with named subtopics instead of one big blob.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote, urlparse


@dataclass
class Section:
    title: str
    body: str

    def word_count(self) -> int:
        return len(self.body.split())


@dataclass
class Document:
    source: str          # filename or URL
    title: str           # human-readable title
    sections: list[Section] = field(default_factory=list)
    metadata: dict[str, str] = field(default_factory=dict)

    def word_count(self) -> int:
        return sum(s.word_count() for s in self.sections)

    @property
    def kind(self) -> str:
        return self.metadata.get("kind", "unknown")


# ───────────────────────── helpers ──────────────────────────


def _normalize_whitespace(text: str) -> str:
    """Collapse runs of whitespace, strip leading/trailing space per line."""
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    # Collapse 3+ blank lines into 2
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Strip per-line trailing whitespace
    lines = [ln.rstrip() for ln in text.split("\n")]
    return "\n".join(lines).strip()


def _smart_chunk_by_headings(text: str, fallback_title: str) -> list[Section]:
    """Split a flat text into sections using markdown-style headings, ALL-CAPS
    lines, or short Title-Case headings as boundaries. If no structure is
    found, returns a single section with the whole text.
    """
    text = _normalize_whitespace(text)
    if not text:
        return []

    # Try markdown-style headings first
    md_heading = re.compile(r"^(#{1,6})\s+(.+)$", re.MULTILINE)
    if md_heading.search(text):
        sections: list[Section] = []
        last_end = 0
        last_title = fallback_title
        for m in md_heading.finditer(text):
            body = text[last_end : m.start()].strip()
            if body and last_end > 0:
                sections.append(Section(last_title, body))
            last_title = m.group(2).strip()
            last_end = m.end()
        # Tail
        body = text[last_end:].strip()
        if body:
            sections.append(Section(last_title, body))
        if sections:
            return sections

    # Heading detection on standalone short lines
    # A heading line is: short (3-90 chars), no terminal punctuation, surrounded
    # by blank lines, and either ALL-CAPS or Title Case starting with uppercase.
    lines = text.split("\n")
    heading_indices: list[int] = []
    for i, ln in enumerate(lines):
        stripped = ln.strip()
        if not (3 <= len(stripped) <= 90):
            continue
        if stripped.endswith((".", ",", ";", ":", "?", "!")):
            continue
        if not stripped[0].isupper():
            continue
        # Surrounded by blank lines (or at start/end)
        prev_blank = (i == 0) or (not lines[i - 1].strip())
        next_blank = (i == len(lines) - 1) or (not lines[i + 1].strip())
        if not (prev_blank and next_blank):
            continue
        # Mostly uppercase OR title-case (every word starts with capital)
        words = stripped.split()
        if not words:
            continue
        is_all_caps = stripped == stripped.upper() and any(c.isalpha() for c in stripped)
        is_title_case = all(
            w[0].isupper() or w.lower() in {"de", "la", "el", "y", "o", "del", "los", "las", "en", "a", "of", "the", "and", "in", "to"}
            for w in words
            if w
        )
        if is_all_caps or (is_title_case and len(words) <= 8):
            heading_indices.append(i)

    if len(heading_indices) >= 2:
        sections = []
        last_idx = 0
        last_title = fallback_title
        for idx in heading_indices:
            body_lines = lines[last_idx:idx]
            body = "\n".join(body_lines).strip()
            if body and last_idx > 0:
                sections.append(Section(last_title, body))
            last_title = lines[idx].strip()
            last_idx = idx + 1
        # Tail
        tail = "\n".join(lines[last_idx:]).strip()
        if tail:
            sections.append(Section(last_title, tail))
        if sections:
            return sections

    # No structure detected — single section
    return [Section(fallback_title, text)]


# ───────────────────────── parsers ──────────────────────────


def parse_pdf(path: Path) -> Document:
    """Extract a Document from a PDF.

    Strategy:
      1. Extract text per page.
      2. Try to detect markdown-like or Title-Case headings in the
         concatenated text — if at least 2 are found, chunk by them.
      3. Otherwise, fall back to grouping pages into sections of
         roughly `target_words` words each, named by page range.
    """
    from pypdf import PdfReader

    target_words = 1500  # words per fallback section

    reader = PdfReader(str(path))
    title = (reader.metadata.title if reader.metadata and reader.metadata.title else None) or path.stem

    pages_text: list[tuple[int, str]] = []  # (page_num, text)
    for i, page in enumerate(reader.pages, start=1):
        try:
            page_text = page.extract_text() or ""
        except Exception:
            page_text = ""
        if page_text.strip():
            pages_text.append((i, page_text.strip()))

    if not pages_text:
        return Document(
            source=path.name,
            title=str(title),
            sections=[],
            metadata={"kind": "pdf", "pages": str(len(reader.pages))},
        )

    full_text = "\n\n".join(t for _, t in pages_text)

    # First attempt: structure detection
    sections = _smart_chunk_by_headings(full_text, fallback_title=str(title))

    # If we only got one big section and the doc is long, fall back to
    # page-range chunking so HIPOCAMPO has organized subtopics.
    if len(sections) <= 1 and len(pages_text) > 3:
        sections = []
        bucket_text: list[str] = []
        bucket_start: int | None = None
        bucket_words = 0
        last_page: int | None = None

        def flush(end_page: int) -> None:
            if not bucket_text:
                return
            joined = "\n\n".join(bucket_text)
            label = (
                f"Páginas {bucket_start}–{end_page}"
                if bucket_start != end_page
                else f"Página {bucket_start}"
            )
            sections.append(Section(label, joined))

        for page_num, text in pages_text:
            words_here = len(text.split())
            if bucket_start is None:
                bucket_start = page_num
            bucket_text.append(text)
            bucket_words += words_here
            last_page = page_num
            if bucket_words >= target_words:
                flush(page_num)
                bucket_text = []
                bucket_words = 0
                bucket_start = None
        if bucket_text and last_page is not None:
            flush(last_page)

    return Document(
        source=path.name,
        title=str(title),
        sections=sections,
        metadata={"kind": "pdf", "pages": str(len(reader.pages))},
    )


def parse_docx(path: Path) -> Document:
    from docx import Document as DocxDocument

    doc = DocxDocument(str(path))
    title = path.stem

    sections: list[Section] = []
    current_title = title
    current_body_parts: list[str] = []

    def flush():
        body = "\n\n".join(p for p in current_body_parts if p.strip())
        if body:
            sections.append(Section(current_title, body))

    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue
        style_name = (para.style.name or "") if para.style else ""
        if style_name.startswith("Heading"):
            # New section
            flush()
            current_title = text
            current_body_parts = []
        else:
            current_body_parts.append(text)
    flush()

    if not sections:
        # Document had no headings — chunk by ALL-CAPS or use whole body
        body = "\n\n".join(p.text for p in doc.paragraphs if p.text.strip())
        sections = _smart_chunk_by_headings(body, fallback_title=title)

    return Document(
        source=path.name,
        title=title,
        sections=sections,
        metadata={"kind": "docx"},
    )


def parse_epub(path: Path) -> Document:
    from ebooklib import epub, ITEM_DOCUMENT
    from bs4 import BeautifulSoup

    book = epub.read_epub(str(path))
    title = book.get_metadata("DC", "title")
    title_str = title[0][0] if title else path.stem

    sections: list[Section] = []
    for item in book.get_items_of_type(ITEM_DOCUMENT):
        try:
            soup = BeautifulSoup(item.get_content(), "html.parser")
        except Exception:
            continue

        # Get heading or fallback to file name
        heading_tag = soup.find(["h1", "h2", "h3", "title"])
        heading = heading_tag.get_text(strip=True) if heading_tag else item.get_name()

        # Extract clean text
        text = soup.get_text(separator="\n")
        text = _normalize_whitespace(text)
        if not text or len(text) < 50:
            continue
        sections.append(Section(heading, text))

    if not sections:
        sections = [Section(title_str, "")]

    return Document(
        source=path.name,
        title=title_str,
        sections=sections,
        metadata={"kind": "epub", "chapters": str(len(sections))},
    )


def parse_markdown(path: Path) -> Document:
    raw = path.read_text(encoding="utf-8", errors="replace")
    sections = _smart_chunk_by_headings(raw, fallback_title=path.stem)
    return Document(
        source=path.name,
        title=path.stem,
        sections=sections,
        metadata={"kind": "markdown"},
    )


def parse_text(path: Path) -> Document:
    raw = path.read_text(encoding="utf-8", errors="replace")
    sections = _smart_chunk_by_headings(raw, fallback_title=path.stem)
    return Document(
        source=path.name,
        title=path.stem,
        sections=sections,
        metadata={"kind": "text"},
    )


def parse_wikipedia(url: str) -> Document:
    """Fetch a Wikipedia article via the public REST API and return a Document."""
    import requests

    parsed = urlparse(url)
    if "wikipedia.org" not in parsed.netloc:
        raise ValueError("URL is not a Wikipedia article")

    # Extract language and article
    lang = parsed.netloc.split(".")[0] if parsed.netloc.split(".")[0] != "www" else "en"
    path_parts = [p for p in parsed.path.split("/") if p]
    if len(path_parts) < 2 or path_parts[0] != "wiki":
        raise ValueError("URL does not point to a Wikipedia article")
    article = unquote(path_parts[1])

    api_url = f"https://{lang}.wikipedia.org/api/rest_v1/page/html/{article}"
    headers = {"User-Agent": "cortex-cli/0.1 (https://github.com/madebyjred-sudo/cortex-cli)"}
    resp = requests.get(api_url, headers=headers, timeout=20)
    resp.raise_for_status()

    from bs4 import BeautifulSoup

    soup = BeautifulSoup(resp.text, "html.parser")

    # Article title
    title_tag = soup.find("h1") or soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else article.replace("_", " ")

    # Strip references, infoboxes, navboxes
    for selector in [".reference", ".mw-editsection", "table.infobox", "table.navbox", ".navbox", ".vertical-navbox", "style", "script"]:
        for el in soup.select(selector):
            el.decompose()

    # Walk through h2/h3 sections
    sections: list[Section] = []
    current_title = title
    current_buf: list[str] = []

    for el in soup.find_all(["h2", "h3", "p", "li"]):
        if el.name in ("h2", "h3"):
            body = "\n\n".join(p.strip() for p in current_buf if p.strip())
            if body:
                sections.append(Section(current_title, body))
            current_title = el.get_text(strip=True)
            current_buf = []
        else:
            text = el.get_text(separator=" ", strip=True)
            if text:
                current_buf.append(text)

    body = "\n\n".join(p.strip() for p in current_buf if p.strip())
    if body:
        sections.append(Section(current_title, body))

    return Document(
        source=url,
        title=title,
        sections=sections,
        metadata={"kind": "wikipedia", "lang": lang, "article": article},
    )


# ───────────────────────── dispatcher ──────────────────────────

SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".epub", ".md", ".markdown", ".txt"}


def parse_file(path: Path) -> Document:
    """Dispatch to the right parser based on extension."""
    suffix = path.suffix.lower()
    if suffix == ".pdf":
        return parse_pdf(path)
    if suffix == ".docx":
        return parse_docx(path)
    if suffix == ".epub":
        return parse_epub(path)
    if suffix in (".md", ".markdown"):
        return parse_markdown(path)
    if suffix == ".txt":
        return parse_text(path)
    raise ValueError(f"Unsupported file type: {suffix}")


def list_documents(folder: Path) -> list[Path]:
    """List all documents in a folder that we know how to parse.
    Excludes hidden files and READMEs. Sorted by name.
    """
    if not folder.exists() or not folder.is_dir():
        return []
    out: list[Path] = []
    for child in folder.iterdir():
        if child.name.startswith("."):
            continue
        if child.name.lower() == "readme.md":
            continue
        if not child.is_file():
            continue
        if child.suffix.lower() in SUPPORTED_EXTENSIONS:
            out.append(child)
    return sorted(out, key=lambda p: p.name.lower())


def estimate_words(documents: Iterable[Document]) -> int:
    return sum(d.word_count() for d in documents)
