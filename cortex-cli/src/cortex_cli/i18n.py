"""Internationalization. Loads ES/EN strings from JSON locales.

Usage:
    from cortex_cli.i18n import t, set_lang
    set_lang("es")
    t("menu.create")  # -> "crear un nuevo córtex"
    t("update.detected", n=3)  # interpolation with {n}
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Literal

LOCALES_DIR = Path(__file__).parent / "locales"
SUPPORTED: tuple[str, ...] = ("es", "en")
DEFAULT_LANG = "es"

_strings: dict[str, str] = {}
_current: str = DEFAULT_LANG


def _load(lang: str) -> dict[str, str]:
    path = LOCALES_DIR / f"{lang}.json"
    if not path.exists():
        raise FileNotFoundError(f"No locale file at {path}")
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def set_lang(lang: str) -> None:
    """Set the active language. Falls back to default if unsupported."""
    global _strings, _current
    if lang not in SUPPORTED:
        lang = DEFAULT_LANG
    _strings = _load(lang)
    _current = lang


def get_lang() -> str:
    return _current


def t(key: str, **kwargs: object) -> str:
    """Translate a key. Accepts interpolation kwargs.

    If the key is not found, returns the key itself (debug-friendly).
    """
    if not _strings:
        set_lang(DEFAULT_LANG)
    text = _strings.get(key, key)
    if kwargs:
        try:
            return text.format(**kwargs)
        except (KeyError, IndexError):
            return text
    return text


# Initialize with default
set_lang(DEFAULT_LANG)
