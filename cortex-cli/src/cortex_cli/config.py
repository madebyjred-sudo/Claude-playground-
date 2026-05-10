"""User config persistence. Stores cortex_root and language in a TOML
file at ~/.config/cortex/config.toml (or platform equivalent)."""

from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

if sys.version_info >= (3, 11):
    import tomllib
else:
    import tomli as tomllib

import tomli_w
from platformdirs import user_config_dir


CONFIG_DIR = Path(user_config_dir("cortex"))
CONFIG_PATH = CONFIG_DIR / "config.toml"


@dataclass
class Config:
    cortex_root: Path
    language: str = "es"

    def to_toml(self) -> str:
        return tomli_w.dumps({
            "cortex_root": str(self.cortex_root),
            "language": self.language,
        })


def load() -> Config | None:
    """Load config if it exists and is valid. Returns None on first run."""
    if not CONFIG_PATH.exists():
        return None
    try:
        with CONFIG_PATH.open("rb") as f:
            data = tomllib.load(f)
        return Config(
            cortex_root=Path(data["cortex_root"]).expanduser(),
            language=data.get("language", "es"),
        )
    except Exception:
        return None


def save(cfg: Config) -> None:
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    CONFIG_PATH.write_text(cfg.to_toml(), encoding="utf-8")


def first_run() -> bool:
    return not CONFIG_PATH.exists()
