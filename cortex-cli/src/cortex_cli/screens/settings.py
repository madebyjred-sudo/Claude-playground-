"""Settings screen: change language and re-run setup."""

from __future__ import annotations

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Footer, Label, ListItem, ListView, Static

from .. import ascii_art, config
from ..i18n import set_lang, t


class SettingsScreen(Screen):
    BINDINGS = [
        Binding("q", "back", "atrás / back"),
        Binding("escape", "back", "atrás / back", show=False),
    ]

    def compose(self) -> ComposeResult:
        lang = self._lang()
        cortex_root = self.app.cfg.cortex_root if (hasattr(self.app, "cfg") and self.app.cfg) else "—"

        with Vertical():
            yield Static(ascii_art.get_logo(lang), classes="logo")
            yield Static(t("settings.title").upper(), classes="heading")
            yield Static(ascii_art.DIVIDER, classes="divider")
            yield Static("")
            yield Static(t("settings.cortex_root"), classes="label")
            yield Static(f"  {cortex_root}")
            yield Static("")
            yield Static(t("settings.language"), classes="label")
            yield ListView(
                ListItem(Label(f"  {'▸' if lang == 'es' else ' '}  {t('settings.language.es')}"), id="lang-es"),
                ListItem(Label(f"  {'▸' if lang == 'en' else ' '}  {t('settings.language.en')}"), id="lang-en"),
                id="lang-list",
            )
            yield Static("")
            yield Static("[ESC] " + t("nav.back"), classes="muted")
        yield Footer()

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        item_id = event.item.id or ""
        if item_id == "lang-es":
            self._set_language("es")
        elif item_id == "lang-en":
            self._set_language("en")

    def _set_language(self, lang: str) -> None:
        cfg = self.app.cfg
        cfg.language = lang
        config.save(cfg)
        set_lang(lang)
        self.app.notify(f"✓ {lang}")
        # Re-render
        self.app.pop_screen()
        self.app.push_screen("settings")

    def action_back(self) -> None:
        self.app.pop_screen()

    def _lang(self) -> str:
        return self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"
