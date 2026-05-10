"""Detect cloud-sync folders (Google Drive, iCloud, Dropbox, OneDrive,
Proton Drive) installed locally so we can offer them to the user as
the cortex root. Cross-platform.
"""

from __future__ import annotations

import platform
from dataclasses import dataclass
from pathlib import Path


@dataclass
class CloudFolder:
    service: str          # "Google Drive", "iCloud Drive", etc.
    path: Path            # absolute path to the folder
    detail: str = ""      # optional extra info (e.g. account email)


def _expand_glob(pattern: str) -> list[Path]:
    """Expand a glob with ~ (tilde) and return existing matches."""
    p = Path(pattern).expanduser()
    if "*" in str(p):
        # Use pathlib glob from parent
        try:
            parts = p.parts
            # Find the first part with a wildcard
            base = Path(parts[0]) if parts[0] else Path("/")
            for part in parts[1:]:
                if "*" in part:
                    matches = list(base.glob(part))
                    return [m for m in matches if m.exists()]
                base = base / part
            return [p] if p.exists() else []
        except Exception:
            return []
    return [p] if p.exists() else []


def detect_cloud_folders() -> list[CloudFolder]:
    """Return all cloud folders detected on this system, ordered by
    likely preference (Google Drive first, then iCloud, then Dropbox,
    then OneDrive, then Proton)."""
    system = platform.system()
    out: list[CloudFolder] = []

    if system == "Darwin":  # macOS
        # New Google Drive (CloudStorage)
        for match in _expand_glob("~/Library/CloudStorage/GoogleDrive-*"):
            email = match.name.split("-", 1)[1] if "-" in match.name else ""
            out.append(CloudFolder("Google Drive", match, email))
        # Legacy Google Drive
        legacy = Path("~/Google Drive").expanduser()
        if legacy.exists() and not any(c.service == "Google Drive" for c in out):
            out.append(CloudFolder("Google Drive", legacy, "(legacy)"))

        # iCloud Drive
        icloud = Path("~/Library/Mobile Documents/com~apple~CloudDocs").expanduser()
        if icloud.exists():
            out.append(CloudFolder("iCloud Drive", icloud))

        # Dropbox
        for cand in [
            Path("~/Library/CloudStorage/Dropbox").expanduser(),
            Path("~/Dropbox").expanduser(),
        ]:
            if cand.exists():
                out.append(CloudFolder("Dropbox", cand))
                break

        # OneDrive (CloudStorage)
        for match in _expand_glob("~/Library/CloudStorage/OneDrive-*"):
            kind = match.name.split("-", 1)[1] if "-" in match.name else ""
            out.append(CloudFolder("OneDrive", match, kind))
        legacy_one = Path("~/OneDrive").expanduser()
        if legacy_one.exists() and not any(c.service == "OneDrive" for c in out):
            out.append(CloudFolder("OneDrive", legacy_one))

        # Proton Drive
        proton = Path("~/Library/CloudStorage/ProtonDrive-Folder").expanduser()
        if proton.exists():
            out.append(CloudFolder("Proton Drive", proton))

    elif system == "Windows":
        userprof = Path("~").expanduser()
        candidates: list[tuple[str, str]] = [
            ("Google Drive", "Google Drive"),
            ("Google Drive", "GoogleDrive"),  # newer naming
            ("iCloud Drive", "iCloudDrive"),
            ("Dropbox", "Dropbox"),
            ("OneDrive", "OneDrive"),
            ("OneDrive", "OneDrive - Personal"),
            ("Proton Drive", "Proton Drive"),
        ]
        seen_services: set[str] = set()
        for service, dirname in candidates:
            cand = userprof / dirname
            if cand.exists() and service not in seen_services:
                out.append(CloudFolder(service, cand))
                seen_services.add(service)

    else:  # Linux
        home = Path("~").expanduser()
        # Insync clients name folders after the email account
        for child in home.iterdir() if home.exists() else []:
            if child.is_dir() and "@" in child.name and "Drive" in str(home / child):
                pass  # too noisy for now
        # Common explicit names
        for service, dirname in [
            ("Google Drive", "Google Drive"),
            ("Google Drive", "google-drive"),
            ("Dropbox", "Dropbox"),
            ("OneDrive", "OneDrive"),
            ("Proton Drive", "ProtonDrive"),
            ("Insync", "Insync"),
        ]:
            cand = home / dirname
            if cand.exists():
                out.append(CloudFolder(service, cand))

    return out


def default_local_folder() -> Path:
    """The fallback non-synced folder. Same name on every OS."""
    return Path("~/Documentos/Cortex").expanduser() if _is_spanish_locale() else Path("~/Documents/Cortex").expanduser()


def _is_spanish_locale() -> bool:
    """Best-effort detection: returns True if system locale appears Spanish."""
    import locale
    try:
        loc = locale.getlocale()[0] or ""
    except Exception:
        loc = ""
    return loc.lower().startswith(("es", "spanish"))


def all_options(prefer_language: str = "es") -> list[CloudFolder]:
    """Return cloud folders + the default local folder as the last option."""
    cloud = detect_cloud_folders()
    if prefer_language == "es":
        local_path = Path("~/Documentos/Cortex").expanduser()
    else:
        local_path = Path("~/Documents/Cortex").expanduser()
    cloud.append(CloudFolder("Local folder", local_path, "(does not sync)"))
    return cloud
