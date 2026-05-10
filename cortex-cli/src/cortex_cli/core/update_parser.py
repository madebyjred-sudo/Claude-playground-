"""Parse 'SUGGESTED CORTEX UPDATES' blocks from LLM-generated text.

Format expected (must match prompt.py exactly):

    ╭─ actualización ─────────────────────────────────────╮
    │ cortex:    <name>
    │ sección:   <SINAPSIS|HIPOCAMPO|CONEXIONES|ABIERTAS|NOTAS PROPIAS>
    │ acción:    <agregar|modificar|migrar|eliminar>
    │ contenido: <text, may span multiple lines>
    │ ubicación: <after "<X>" | al final | nuevo subtema "<X>">
    │ por qué:   <one-line justification>
    ╰─────────────────────────────────────────────────────╯

Same in English with frame title "update" and English field labels.

The parser is forgiving:
  · accepts both ES and EN field labels
  · accepts variations of frame characters (╭ ╮ ╰ ╯ ─) or alternatives like
    ┌ ┐ └ ┘ if the LLM substitutes them
  · handles multi-line `contenido:` correctly (lines starting with │ that
    don't have a known field label are appended to the previous field)
  · ignores fenced code blocks around the update so users can paste raw
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Literal

# Fields synonyms ES <-> EN
FIELD_KEYS = {
    "cortex": "cortex",
    "sección": "section",
    "seccion": "section",  # tolerate missing accent
    "section": "section",
    "acción": "action",
    "accion": "action",
    "action": "action",
    "contenido": "content",
    "content": "content",
    "ubicación": "location",
    "ubicacion": "location",
    "location": "location",
    "por qué": "why",
    "por que": "why",
    "porque": "why",
    "why": "why",
}

# Section name normalization (ES preferred internal; EN aliases map to ES)
SECTION_ALIASES = {
    "sinapsis": "SINAPSIS",
    "synapse": "SINAPSIS",
    "hipocampo": "HIPOCAMPO",
    "hippocampus": "HIPOCAMPO",
    "conexiones": "CONEXIONES",
    "connections": "CONEXIONES",
    "abiertas": "ABIERTAS",
    "open": "ABIERTAS",
    "notas propias": "NOTAS PROPIAS",
    "notas_propias": "NOTAS PROPIAS",
    "my notes": "NOTAS PROPIAS",
    "mynotes": "NOTAS PROPIAS",
}

# Action normalization
ACTION_ALIASES = {
    "agregar": "add",
    "añadir": "add",
    "anadir": "add",
    "add": "add",
    "modificar": "modify",
    "modify": "modify",
    "edit": "modify",
    "migrar": "migrate",
    "migrate": "migrate",
    "mover": "migrate",
    "move": "migrate",
    "eliminar": "delete",
    "borrar": "delete",
    "delete": "delete",
    "remove": "delete",
}

ActionLiteral = Literal["add", "modify", "migrate", "delete"]


@dataclass
class Update:
    cortex: str
    section: str          # SINAPSIS, HIPOCAMPO, etc. (ES canonical)
    action: ActionLiteral
    content: str
    location: str
    why: str
    raw: str = ""         # the original block, for debugging

    def is_valid(self) -> bool:
        return bool(self.cortex and self.section and self.action and self.content)


# Frame characters that mark a block's boundary
_OPEN_CHARS = "╭┌"
_CLOSE_CHARS = "╰└"


def _normalize_section(text: str) -> str:
    cleaned = text.strip().lower()
    return SECTION_ALIASES.get(cleaned, text.strip().upper())


def _normalize_action(text: str) -> ActionLiteral:
    cleaned = text.strip().lower()
    return ACTION_ALIASES.get(cleaned, "add")  # type: ignore[return-value]


def _is_frame_open(line: str) -> bool:
    s = line.strip()
    return any(s.startswith(c) for c in _OPEN_CHARS)


def _is_frame_close(line: str) -> bool:
    s = line.strip()
    return any(s.startswith(c) for c in _CLOSE_CHARS)


def _strip_pipe(line: str) -> str:
    """Remove leading │ or | and trailing │ or |, plus surrounding spaces."""
    s = line.strip()
    if s.startswith(("│", "|")):
        s = s[1:]
    if s.endswith(("│", "|")):
        s = s[:-1]
    return s.rstrip()


def _detect_field(line_inner: str) -> tuple[str, str] | None:
    """If `line_inner` starts with a known field label followed by ':', return
    (canonical_field, value). Otherwise None (continuation line)."""
    # Try to split on first colon
    if ":" not in line_inner:
        return None
    label, _, value = line_inner.partition(":")
    label_clean = label.strip().lower()
    canonical = FIELD_KEYS.get(label_clean)
    if canonical:
        return canonical, value.lstrip()
    return None


def parse_blocks(text: str) -> list[Update]:
    """Find and parse all update blocks in `text`."""
    if not text:
        return []

    lines = text.splitlines()
    blocks: list[list[str]] = []
    current: list[str] | None = None

    for line in lines:
        if _is_frame_open(line):
            current = []
            continue
        if _is_frame_close(line):
            if current is not None:
                blocks.append(current)
            current = None
            continue
        if current is not None:
            current.append(line)

    updates: list[Update] = []
    for block in blocks:
        upd = _parse_single_block(block)
        if upd and upd.is_valid():
            updates.append(upd)
    return updates


def _parse_single_block(lines: list[str]) -> Update | None:
    fields: dict[str, str] = {}
    last_field: str | None = None

    for raw in lines:
        inner = _strip_pipe(raw).strip()
        if not inner:
            continue

        detected = _detect_field(inner)
        if detected:
            field, value = detected
            fields[field] = value
            last_field = field
        else:
            # Continuation line — append to last field
            if last_field is not None:
                if fields[last_field]:
                    fields[last_field] += "\n" + inner
                else:
                    fields[last_field] = inner

    if not fields:
        return None

    return Update(
        cortex=fields.get("cortex", "").strip(),
        section=_normalize_section(fields.get("section", "")),
        action=_normalize_action(fields.get("action", "add")),
        content=fields.get("content", "").strip(),
        location=fields.get("location", "").strip(),
        why=fields.get("why", "").strip(),
        raw="\n".join(lines),
    )
