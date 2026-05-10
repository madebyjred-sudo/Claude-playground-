"""Apply parsed Updates to a CORTEX.md file. Versions the previous
file in `historial/` (or `history/` for English) before overwriting.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

from .update_parser import Update


# Map canonical section name to its possible heading patterns in the cortex.
# A real cortex header looks like:  ## SINAPSIS · conceptos núcleo
# or in English:                    ## SYNAPSE · core concepts
_SECTION_HEADING_PATTERNS = {
    "SINAPSIS": [r"^##\s+SINAPSIS\b", r"^##\s+SYNAPSE\b"],
    "HIPOCAMPO": [r"^##\s+HIPOCAMPO\b", r"^##\s+HIPPOCAMPUS\b"],
    "CONEXIONES": [r"^##\s+CONEXIONES\b", r"^##\s+CONNECTIONS\b"],
    "ABIERTAS": [r"^##\s+ABIERTAS\b", r"^##\s+OPEN\b"],
    "NOTAS PROPIAS": [r"^##\s+NOTAS PROPIAS\b", r"^##\s+MY NOTES\b"],
}


@dataclass
class ApplyResult:
    applied: int
    skipped: int
    backup_path: Path | None
    new_content: str


def _find_section_bounds(content: str, canonical: str) -> tuple[int, int] | None:
    """Return (start_line_idx, end_line_idx_exclusive) of a section's body,
    not including its own ## heading and not including any trailing `---`
    divider that belongs visually to the next section. End is the next ##
    heading or end-of-file.
    Returns None if section not found."""
    lines = content.splitlines()
    patterns = _SECTION_HEADING_PATTERNS.get(canonical, [])
    start: int | None = None
    for i, line in enumerate(lines):
        for pat in patterns:
            if re.match(pat, line):
                start = i + 1
                break
        if start is not None:
            break
    if start is None:
        return None
    # Find the next ## heading
    end = len(lines)
    for j in range(start, len(lines)):
        if re.match(r"^##\s+\S", lines[j]):
            end = j
            break
    # Trim trailing divider/blank lines so they don't end up in body
    while end > start:
        prev = lines[end - 1].strip()
        if prev == "" or prev == "---":
            end -= 1
        else:
            break
    return start, end


def _section_body(content: str, canonical: str) -> str:
    bounds = _find_section_bounds(content, canonical)
    if bounds is None:
        return ""
    lines = content.splitlines()
    return "\n".join(lines[bounds[0]:bounds[1]])


def _replace_section_body(content: str, canonical: str, new_body: str) -> str:
    """Replace the body lines of a section (between its heading and the next
    section heading, excluding any trailing divider) with new_body. Preserves
    the divider that visually separated the next section."""
    bounds = _find_section_bounds(content, canonical)
    if bounds is None:
        return content
    lines = content.splitlines()
    new_body_lines = new_body.rstrip("\n").splitlines()
    # Ensure a single trailing blank line in the new body for readability
    if new_body_lines and new_body_lines[-1].strip():
        new_body_lines.append("")
    # Re-insert a blank + divider + blank between this section and the next
    # if we trimmed them in bounds. We detect by checking the original lines
    # right after `bounds[1]` for a `---` divider.
    tail_padding: list[str] = []
    # Walk forward from bounds[1] to capture original divider/blank pattern
    idx = bounds[1]
    while idx < len(lines):
        s = lines[idx].strip()
        if s == "" or s == "---":
            tail_padding.append(lines[idx])
            idx += 1
        else:
            break
    # Default: ensure at least one blank line + --- + blank line if we have
    # subsequent content
    if not tail_padding and idx < len(lines):
        tail_padding = ["", "---", ""]

    new_lines = lines[: bounds[0]] + new_body_lines + tail_padding + lines[idx:]
    return "\n".join(new_lines)


def _is_placeholder_only(body: str) -> bool:
    """A section that only contains the placeholder '> (esta sección crece...)' line."""
    stripped_lines = [ln.strip() for ln in body.splitlines() if ln.strip()]
    if not stripped_lines:
        return True
    return all(ln.startswith(">") for ln in stripped_lines)


def _apply_single(content: str, update: Update) -> tuple[str, bool]:
    """Apply a single update. Returns (new_content, applied?)."""
    section = update.section
    body = _section_body(content, section)

    if update.action == "add":
        # Append to the section body (at end). If body is just placeholder, replace it.
        new_entry = update.content.strip()
        if not new_entry:
            return content, False

        if _is_placeholder_only(body):
            new_body = new_entry + "\n"
        else:
            # Append, separated by blank line
            new_body = body.rstrip() + "\n\n" + new_entry + "\n"
        new_content = _replace_section_body(content, section, new_body)
        return new_content, True

    if update.action == "modify":
        # If "ubicación: después de \"X\"" or similar, try to find that anchor
        anchor = _extract_anchor(update.location)
        if anchor and anchor in body:
            # Insert/modify after anchor — for simplicity, replace anchor entire line
            lines = body.splitlines()
            for i, line in enumerate(lines):
                if anchor in line:
                    lines[i] = update.content
                    new_body = "\n".join(lines)
                    new_content = _replace_section_body(content, section, new_body)
                    return new_content, True
        # Fallback: append as if it were add
        return _apply_single(content, Update(
            cortex=update.cortex,
            section=section,
            action="add",
            content=update.content,
            location="al final",
            why=update.why,
        ))

    if update.action == "migrate":
        # Apply as add to target section (the action's effect, since the LLM
        # already understood the source). Best-effort: we insert in target.
        # Source removal is harder to do automatically — we leave a note.
        return _apply_single(content, Update(
            cortex=update.cortex,
            section=section,
            action="add",
            content=update.content + "\n\n_(migrado desde otra sección por sugerencia)_",
            location="al final",
            why=update.why,
        ))

    if update.action == "delete":
        # Try to find and remove the matching paragraph
        target = update.content.strip()
        if target and target in body:
            new_body = body.replace(target, "").strip() + "\n"
            new_content = _replace_section_body(content, section, new_body)
            return new_content, True
        return content, False

    return content, False


def _extract_anchor(location: str) -> str:
    """From a location string like 'después de "X"' or 'after "X"', extract X."""
    m = re.search(r'"([^"]+)"', location)
    return m.group(1) if m else ""


def _bump_updated_date(content: str, today: str) -> str:
    """Update the '> Última actualización' / '> Last updated' line in the header."""
    lines = content.splitlines()
    for i, line in enumerate(lines[:20]):  # only header
        if re.match(r">\s*(Última actualización|Last updated)", line, re.IGNORECASE):
            label = line.split(":")[0]
            lines[i] = f"{label}: {today}"
            return "\n".join(lines)
    return content


def apply_updates(
    cortex_path: Path,
    updates: list[Update],
    *,
    history_dir_name: str = "historial",
) -> ApplyResult:
    """Apply a list of updates to the CORTEX.md at `cortex_path`.

    Backs up the previous version to `<cortex_dir>/<history_dir_name>/` with
    timestamp. Returns ApplyResult.
    """
    if not cortex_path.exists():
        raise FileNotFoundError(cortex_path)

    original = cortex_path.read_text(encoding="utf-8")
    new_content = original
    applied = 0
    skipped = 0
    for u in updates:
        new_content, ok = _apply_single(new_content, u)
        if ok:
            applied += 1
        else:
            skipped += 1

    new_content = _bump_updated_date(new_content, datetime.now().strftime("%Y-%m-%d"))

    backup_path: Path | None = None
    if applied > 0 and new_content != original:
        history_dir = cortex_path.parent / history_dir_name
        history_dir.mkdir(exist_ok=True)
        timestamp = datetime.now().strftime("%Y-%m-%d-%H%M")
        backup_path = history_dir / f"CORTEX-{timestamp}.md"
        backup_path.write_text(original, encoding="utf-8")
        cortex_path.write_text(new_content, encoding="utf-8")

    return ApplyResult(
        applied=applied,
        skipped=skipped,
        backup_path=backup_path,
        new_content=new_content,
    )


def list_existing_cortexes(root: Path) -> list[dict[str, object]]:
    """Return a list of dicts describing each cortex in the root folder.
    Each dict: {name, path, size_bytes, created (iso), num_updates}."""
    if not root.exists():
        return []
    out: list[dict[str, object]] = []
    for entry in sorted(root.iterdir()):
        if not entry.is_dir() or entry.name.startswith("."):
            continue
        cortex_md = entry / "CORTEX.md"
        if not cortex_md.exists():
            continue
        history_dir = entry / "historial"
        history_dir_en = entry / "history"
        num_updates = 0
        for hd in (history_dir, history_dir_en):
            if hd.exists():
                num_updates += len([f for f in hd.iterdir() if f.is_file()])
        out.append({
            "name": entry.name,
            "path": entry,
            "size_bytes": cortex_md.stat().st_size,
            "created": datetime.fromtimestamp(entry.stat().st_ctime).strftime("%Y-%m-%d"),
            "num_updates": num_updates,
        })
    return out
