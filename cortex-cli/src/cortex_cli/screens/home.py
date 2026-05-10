"""Home screen: main menu."""

from __future__ import annotations

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Center, Vertical
from textual.screen import Screen
from textual.widgets import Footer, Label, ListItem, ListView, Static

from .. import ascii_art
from ..i18n import t


class HomeScreen(Screen):
    BINDINGS = [
        Binding("q", "exit", "salir / exit"),
        Binding("escape", "exit", "salir / exit", show=False),
    ]

    def compose(self) -> ComposeResult:
        with Center():
            with Vertical():
                yield Static(ascii_art.get_logo(self._lang()), classes="logo")
                yield Static(t("app.tagline"), classes="tagline")
                yield Static(t("menu.prompt"), classes="heading")
                yield ListView(
                    ListItem(Label(f"  ▸  {t('menu.create')}"), id="item-create"),
                    ListItem(Label(f"  ▸  {t('menu.update')}"), id="item-update"),
                    ListItem(Label(f"  ▸  {t('menu.browse')}"), id="item-browse"),
                    ListItem(Label(f"  ▸  {t('menu.settings')}"), id="item-settings"),
                    ListItem(Label(f"  ▸  {t('menu.exit')}"), id="item-exit"),
                    id="home-menu",
                )
        yield Footer()

    def _lang(self) -> str:
        return self.app.cfg.language if hasattr(self.app, "cfg") and self.app.cfg else "es"

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        item_id = event.item.id or ""
        if item_id == "item-create":
            self.app.push_screen("create")
        elif item_id == "item-update":
            self.app.push_screen("update")
        elif item_id == "item-browse":
            self.app.push_screen("browse")
        elif item_id == "item-settings":
            self.app.push_screen("settings")
        elif item_id == "item-exit":
            self.app.exit()

    def action_exit(self) -> None:
        self.app.exit()
