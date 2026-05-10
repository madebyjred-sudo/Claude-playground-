"""First-time setup screen: choose where to store cortexes."""

from __future__ import annotations

from pathlib import Path

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Footer, Label, ListItem, ListView, Static

from .. import ascii_art, config
from ..core import drive
from ..i18n import t


class SetupScreen(Screen):
    BINDINGS = [
        Binding("q", "exit", "salir / exit"),
        Binding("escape", "exit", "salir / exit", show=False),
    ]

    def compose(self) -> ComposeResult:
        lang = self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"
        self.options = drive.all_options(prefer_language=lang)

        with Vertical():
            yield Static(ascii_art.get_logo(lang), classes="logo")
            yield Static(t("setup.title").upper(), classes="heading")
            yield Static(ascii_art.DIVIDER, classes="divider")
            yield Static("")
            yield Static(t("setup.question"))
            yield Static("")
            yield Static(t("setup.detected"), classes="subheading")
            yield Static("")

            items = []
            for i, opt in enumerate(self.options):
                detail = f"  {opt.detail}" if opt.detail else ""
                label_text = f"  ▸  {opt.service}{detail}\n     {opt.path}"
                items.append(ListItem(Label(label_text), id=f"opt-{i}"))
            yield ListView(*items, id="setup-options")

            yield Static("")
            yield Static(t("setup.recommendation"), classes="muted")
            yield Static("")
            yield Static(t("setup.changeable"), classes="muted")

        yield Footer()

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        item_id = event.item.id or ""
        if not item_id.startswith("opt-"):
            return
        idx = int(item_id.split("-", 1)[1])
        opt = self.options[idx]
        # Build cortex root: <selected_path>/Cortex/
        cortex_root = opt.path / "Cortex"
        cortex_root.mkdir(parents=True, exist_ok=True)
        (cortex_root / "inbox").mkdir(exist_ok=True)
        # Save config
        cfg = config.Config(cortex_root=cortex_root, language=self._lang())
        config.save(cfg)
        self.app.cfg = cfg
        self.app.notify(t("setup.saved", path=str(config.CONFIG_PATH)))
        # If setup was the only screen (first run), go to home.
        # Otherwise we were opened from settings — pop back.
        if len(self.app.screen_stack) <= 2:
            self.app.switch_screen("home")
        else:
            self.app.pop_screen()

    def _lang(self) -> str:
        return self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"

    def action_exit(self) -> None:
        self.app.exit()
