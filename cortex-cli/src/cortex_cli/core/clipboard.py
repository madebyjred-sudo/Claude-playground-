"""Cross-platform clipboard helpers. Writes and reads text from the
system clipboard. Falls back gracefully when no clipboard backend is
available (headless servers, sandboxes, etc.).
"""

from __future__ import annotations


def copy(text: str) -> bool:
    """Copy text to system clipboard. Returns True on success."""
    try:
        import pyperclip
        pyperclip.copy(text)
        return True
    except Exception:
        return False


def paste() -> str:
    """Read text from system clipboard. Returns empty string on failure."""
    try:
        import pyperclip
        return pyperclip.paste() or ""
    except Exception:
        return ""


def is_available() -> bool:
    """Quick check whether the clipboard works on this system."""
    try:
        import pyperclip
        # Just try a paste — most reliable test
        pyperclip.paste()
        return True
    except Exception:
        return False
