"""Cross-platform 'open folder in the system's file explorer' helper."""

from __future__ import annotations

import platform
import subprocess
from pathlib import Path


def open_folder(path: Path) -> bool:
    """Open the given folder in Finder / Explorer / xdg-open. Returns True
    if the call dispatched (it does not block waiting for a return code)."""
    if not path.exists():
        return False
    system = platform.system()
    try:
        if system == "Darwin":
            subprocess.Popen(["open", str(path)])
        elif system == "Windows":
            # Use os.startfile for native handling
            import os
            os.startfile(str(path))  # type: ignore[attr-defined]
        else:  # Linux and others
            subprocess.Popen(["xdg-open", str(path)])
        return True
    except Exception:
        return False
