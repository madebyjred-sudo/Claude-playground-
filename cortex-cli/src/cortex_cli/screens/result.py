"""Result screen: shown after a cortex is created. Displays summary,
file paths, copy actions, and 'open folder' option."""

from __future__ import annotations

from pathlib import Path

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Footer, Label, Static

from .. import ascii_art
from ..core import clipboard, opener, prompt as prompt_gen
from ..i18n import t


class ResultScreen(Screen):
    BINDINGS = [
        Binding("c", "copy_all", "copiar todo / copy all"),
        Binding("p", "copy_prompt", "solo prompt / prompt only"),
        Binding("x", "copy_cortex", "solo córtex / cortex only"),
        Binding("o", "open_folder", "abrir carpeta / open folder"),
        Binding("enter", "open_folder", "abrir carpeta / open folder", show=False),
        Binding("q", "back", "salir / exit"),
        Binding("escape", "back", "atrás / back", show=False),
    ]

    def __init__(self, cortex_dir: Path, cortex_name: str) -> None:
        super().__init__()
        self.cortex_dir = cortex_dir
        self.cortex_name = cortex_name

    def compose(self) -> ComposeResult:
        lang = self._lang()
        cortex_md_size = (self.cortex_dir / "CORTEX.md").stat().st_size
        prompt_md_size = (self.cortex_dir / "PROMPT.md").stat().st_size

        with Vertical(id="result-summary"):
            yield Static(ascii_art.banner(f"  ✓  {t('result.title').upper()}", width=70), classes="success")
            yield Static("")
            yield Static(t("result.location"), classes="label")
            yield Static(f"  {self.cortex_dir}")
            yield Static("")
            yield Static(t("result.files"), classes="label")
            yield Static(f"  CORTEX.md      {self._format_size(cortex_md_size)}   ←  {t('result.cortex_desc')}")
            yield Static(f"  PROMPT.md      {self._format_size(prompt_md_size)}   ←  {t('result.prompt_desc')}")
            yield Static(f"  fuentes/                       ←  {t('result.fuentes_desc')}")
            yield Static("")
            yield Static(t("result.next"), classes="label")
            yield Static(f"  1.  {t('result.next.1')}")
            yield Static(f"  2.  {t('result.next.2')}")
            yield Static(f"  3.  {t('result.next.3')}")
            yield Static(f"  4.  {t('result.next.4')}")
            yield Static("")
            yield Static(ascii_art.DIVIDER, classes="divider")
            yield Static(
                f"[ENTER/o] {t('result.action.open')}    "
                f"[c] {t('result.action.copy_all')}    "
                f"[p] {t('result.action.copy_prompt')}    "
                f"[x] {t('result.action.copy_cortex')}    "
                f"[q] {t('nav.exit')}",
                classes="muted",
            )
        yield Footer()

    def _format_size(self, n: int) -> str:
        if n < 1024:
            return f"{n} b"
        if n < 1024 * 1024:
            return f"{n // 1024} KB"
        return f"{n // (1024 * 1024)} MB"

    def _lang(self) -> str:
        return self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"

    def action_copy_all(self) -> None:
        cortex_md = (self.cortex_dir / "CORTEX.md").read_text(encoding="utf-8")
        prompt_md = (self.cortex_dir / "PROMPT.md").read_text(encoding="utf-8")
        combined = prompt_gen.combined_prompt_and_cortex(self.cortex_name, self._lang(), cortex_md)
        # combined uses the canonical prompt; if the user re-edited PROMPT.md, prefer the file
        # Use file content if exists & differs:
        from ..core import prompt as prompt_gen2  # avoid name collision in scope
        full = prompt_md.rstrip() + "\n\n---\n\n" + cortex_md
        if clipboard.copy(full):
            self.app.notify(t("result.copied"))
        else:
            self.app.notify("clipboard not available", severity="error")

    def action_copy_prompt(self) -> None:
        prompt_md = (self.cortex_dir / "PROMPT.md").read_text(encoding="utf-8")
        if clipboard.copy(prompt_md):
            self.app.notify(t("result.copied"))
        else:
            self.app.notify("clipboard not available", severity="error")

    def action_copy_cortex(self) -> None:
        cortex_md = (self.cortex_dir / "CORTEX.md").read_text(encoding="utf-8")
        if clipboard.copy(cortex_md):
            self.app.notify(t("result.copied"))
        else:
            self.app.notify("clipboard not available", severity="error")

    def action_open_folder(self) -> None:
        if opener.open_folder(self.cortex_dir):
            self.app.notify(f"opened {self.cortex_dir}")

    def action_back(self) -> None:
        # Pop until we reach home
        while len(self.app.screen_stack) > 1:
            self.app.pop_screen()
