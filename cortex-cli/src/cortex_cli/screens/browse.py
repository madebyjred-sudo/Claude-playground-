"""Browse screen: list existing cortexes."""

from __future__ import annotations

from pathlib import Path

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Footer, Label, ListItem, ListView, Static

from .. import ascii_art
from ..core import apply, opener
from ..i18n import t


class BrowseScreen(Screen):
    BINDINGS = [
        Binding("q", "back", "atrás / back"),
        Binding("escape", "back", "atrás / back", show=False),
        Binding("o", "open_root", "abrir carpeta raíz / open root"),
    ]

    def compose(self) -> ComposeResult:
        lang = self._lang()
        cortexes = apply.list_existing_cortexes(self.app.cfg.cortex_root)

        with Vertical():
            yield Static(ascii_art.get_logo(lang), classes="logo")
            yield Static(t("browse.title").upper(), classes="heading")
            yield Static(ascii_art.DIVIDER, classes="divider")
            yield Static("")

            if not cortexes:
                yield Static(t("browse.empty"), classes="warning")
            else:
                yield Static(f"  {self.app.cfg.cortex_root}", classes="muted")
                yield Static("")
                items = []
                for c in cortexes:
                    size = c["size_bytes"]
                    size_str = f"{size // 1024} KB" if size >= 1024 else f"{size} b"
                    detail = t("browse.size", size=size_str, date=c["created"], updates=c["num_updates"])
                    label_text = f"  ·  {c['name']}\n     {detail}"
                    items.append(ListItem(Label(label_text), id=f"cx-{c['name']}"))
                yield ListView(*items, id="browse-list")
            yield Static("")
            yield Static("[o] abrir carpeta / open folder    [q] " + t("nav.back"), classes="muted")
        yield Footer()

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        item_id = event.item.id or ""
        if item_id.startswith("cx-"):
            name = item_id[3:]
            cortex_dir = self.app.cfg.cortex_root / name
            opener.open_folder(cortex_dir)

    def action_open_root(self) -> None:
        opener.open_folder(self.app.cfg.cortex_root)

    def action_back(self) -> None:
        self.app.pop_screen()

    def _lang(self) -> str:
        return self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"
