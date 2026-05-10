"""Update screen: read clipboard, parse update blocks, apply to a CORTEX.md."""

from __future__ import annotations

from pathlib import Path

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical
from textual.screen import Screen
from textual.widgets import Footer, Label, ListItem, ListView, Static

from .. import ascii_art
from ..core import apply, clipboard, opener
from ..core.update_parser import Update, parse_blocks
from ..i18n import t


class UpdateScreen(Screen):
    BINDINGS = [
        Binding("enter", "apply", "aplicar / apply"),
        Binding("q", "back", "atrás / back"),
        Binding("escape", "back", "atrás / back", show=False),
        Binding("r", "refresh", "releer portapapeles / re-read clipboard"),
    ]

    def __init__(self) -> None:
        super().__init__()
        self.updates: list[Update] = []
        self.cortex_dir: Path | None = None

    def compose(self) -> ComposeResult:
        self.body = Vertical(id="update-body")
        yield self.body
        yield Footer()

    def on_mount(self) -> None:
        self._render()

    def _render(self) -> None:
        self.body.remove_children()
        lang = self._lang()

        self.body.mount(Static(ascii_art.get_logo(lang), classes="logo"))
        self.body.mount(Static(t("update.title").upper(), classes="heading"))
        self.body.mount(Static(ascii_art.DIVIDER, classes="divider"))
        self.body.mount(Static(""))

        text = clipboard.paste()
        self.updates = parse_blocks(text)

        if not self.updates:
            self.body.mount(Static(t("update.no_updates"), classes="warning"))
            self.body.mount(Static(""))
            self.body.mount(Static("[r] " + t("update.title").lower() + " · releer portapapeles    [q] " + t("nav.back"), classes="muted"))
            return

        # Determine the target cortex from the first update
        target_name = self.updates[0].cortex
        if not target_name:
            self.body.mount(Static(
                "no detecté el campo `cortex:` en las actualizaciones. asegurate de que tu IA lo incluya.",
                classes="error",
            ))
            return

        cortex_dir = self.app.cfg.cortex_root / target_name
        if not cortex_dir.exists() or not (cortex_dir / "CORTEX.md").exists():
            self.body.mount(Static(
                f"no encontré un córtex llamado «{target_name}» en {self.app.cfg.cortex_root}.",
                classes="error",
            ))
            return

        self.cortex_dir = cortex_dir

        self.body.mount(Static(t("update.detected", n=len(self.updates)), classes="success"))
        self.body.mount(Static(t("update.cortex_target", name=target_name)))
        self.body.mount(Static(""))

        for u in self.updates:
            preview = u.content[:80] + ("…" if len(u.content) > 80 else "")
            line = f"  ·  {u.section}  ·  {u.action}  ·  \"{preview}\""
            self.body.mount(Static(line))

        self.body.mount(Static(""))
        self.body.mount(Static(t("update.confirm", n=len(self.updates)), classes="label"))
        self.body.mount(Static(""))
        self.body.mount(Static("[ENTER] aplicar / apply    [r] releer    [q] " + t("nav.back"), classes="muted"))

    def action_refresh(self) -> None:
        self._render()

    def action_apply(self) -> None:
        if not self.updates or not self.cortex_dir:
            return
        history_dir_name = "historial" if self._lang() == "es" else "history"
        cortex_md = self.cortex_dir / "CORTEX.md"
        try:
            result = apply.apply_updates(cortex_md, self.updates, history_dir_name=history_dir_name)
        except Exception as e:
            self.app.notify(f"error: {e}", severity="error")
            return

        # Show result inline
        self.body.remove_children()
        self.body.mount(Static(ascii_art.banner(f"  ✓  {t('update.applied', n=result.applied)}", width=70), classes="success"))
        self.body.mount(Static(""))
        if result.backup_path:
            self.body.mount(Static(t("update.backup", file=result.backup_path.name), classes="muted"))
        if result.skipped:
            self.body.mount(Static(f"  ({result.skipped} skipped — couldn't apply)", classes="muted"))
        self.body.mount(Static(""))
        self.body.mount(Static("[o] " + t("update.action.open") + "    [q] " + t("nav.exit"), classes="muted"))

    def on_key(self, event) -> None:
        if event.key == "o" and self.cortex_dir:
            opener.open_folder(self.cortex_dir)

    def action_back(self) -> None:
        self.app.pop_screen()

    def _lang(self) -> str:
        return self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"
