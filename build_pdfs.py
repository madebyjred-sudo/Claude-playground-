#!/usr/bin/env python3
"""Convert the two Mincyt markdown documents to PDF using weasyprint."""
import markdown
from weasyprint import HTML, CSS
from pathlib import Path

CSS_STYLE = """
@page {
    size: A4;
    margin: 2.2cm 2cm 2.5cm 2cm;
    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-size: 9pt;
        color: #888;
        font-family: 'Helvetica', 'Arial', sans-serif;
    }
}
body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1a1a1a;
}
h1 {
    font-size: 22pt;
    font-weight: 700;
    color: #0a2540;
    margin-top: 0;
    margin-bottom: 0.4em;
    letter-spacing: -0.3px;
    border-bottom: 3px solid #0a2540;
    padding-bottom: 0.3em;
}
h2 {
    font-size: 14pt;
    font-weight: 700;
    color: #0a2540;
    margin-top: 1.6em;
    margin-bottom: 0.5em;
    page-break-after: avoid;
}
h3 {
    font-size: 11.5pt;
    font-weight: 700;
    color: #0a2540;
    margin-top: 1.2em;
    margin-bottom: 0.4em;
    page-break-after: avoid;
}
h4 {
    font-size: 10.5pt;
    font-weight: 700;
    color: #2a3f5f;
    margin-top: 1em;
    margin-bottom: 0.3em;
}
p { margin: 0.5em 0; text-align: justify; }
strong { color: #0a2540; }
ul, ol { margin: 0.5em 0; padding-left: 1.5em; }
li { margin: 0.25em 0; }
hr {
    border: none;
    border-top: 1px solid #d0d7de;
    margin: 1.5em 0;
}
blockquote {
    border-left: 3px solid #0a2540;
    background: #f6f8fa;
    padding: 0.6em 1em;
    margin: 0.8em 0;
    font-style: italic;
    color: #2a3f5f;
}
blockquote p { margin: 0.3em 0; text-align: left; }
table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.8em 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
}
th {
    background: #0a2540;
    color: white;
    text-align: left;
    padding: 0.5em 0.7em;
    font-weight: 600;
    border: 1px solid #0a2540;
}
td {
    padding: 0.45em 0.7em;
    border: 1px solid #d0d7de;
    vertical-align: top;
}
tr:nth-child(even) td { background: #f6f8fa; }
code {
    background: #f6f8fa;
    padding: 0.1em 0.3em;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 9.5pt;
}
"""

CONFIDENTIAL_CSS = """
@page {
    @top-right {
        content: "CONFIDENCIAL — INTERNO SHIFT";
        font-size: 8pt;
        color: #b00;
        font-weight: 700;
        font-family: 'Helvetica', 'Arial', sans-serif;
    }
}
"""


def convert(md_path: Path, pdf_path: Path, extra_css: str = "") -> None:
    md_text = md_path.read_text(encoding="utf-8")
    html_body = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "sane_lists"],
    )
    html_doc = f"<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>{html_body}</body></html>"
    HTML(string=html_doc).write_pdf(
        target=str(pdf_path),
        stylesheets=[CSS(string=CSS_STYLE + extra_css)],
    )
    print(f"Generated: {pdf_path}")


if __name__ == "__main__":
    base = Path(__file__).parent
    convert(base / "propuesta-mincyt.md", base / "propuesta-mincyt.pdf")
    convert(base / "respuestas-mincyt.md", base / "respuestas-mincyt.pdf")
    convert(
        base / "nota-compensacion.md",
        base / "nota-compensacion.pdf",
        extra_css=CONFIDENTIAL_CSS,
    )
