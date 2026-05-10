"""Main Textual app for CORTEX-CLI."""

from __future__ import annotations

from pathlib import Path

from textual.app import App

from . import config
from .i18n import set_lang
from .screens.browse import BrowseScreen
from .screens.create import CreateScreen
from .screens.home import HomeScreen
from .screens.setup import SetupScreen
from .screens.settings import SettingsScreen
from .screens.update import UpdateScreen


class CortexApp(App):
    TITLE = "CORTEX"
    SUB_TITLE = "el cuaderno cognitivo · the cognitive notebook"
    CSS_PATH = "theme.tcss"

    SCREENS = {
        "home": HomeScreen,
        "setup": SetupScreen,
        "create": CreateScreen,
        "update": UpdateScreen,
        "browse": BrowseScreen,
        "settings": SettingsScreen,
    }

    def __init__(self) -> None:
        super().__init__()
        self.cfg: config.Config | None = config.load()
        if self.cfg:
            set_lang(self.cfg.language)
        else:
            set_lang("es")

    def on_mount(self) -> None:
        if self.cfg is None:
            # First run: setup. setup will switch to home once config is saved.
            self.push_screen("setup")
        else:
            self.push_screen("home")


def run() -> None:
    CortexApp().run()
