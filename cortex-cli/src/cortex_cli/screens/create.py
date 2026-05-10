"""Create screen: 3-step flow to build a new cortex."""

from __future__ import annotations

import re
import time
from pathlib import Path
from shutil import copy2

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical
from textual.reactive import reactive
from textual.screen import Screen
from textual.widgets import Button, Footer, Input, Label, ListItem, ListView, Static

from .. import ascii_art
from ..core import ingest, structure, prompt as prompt_gen
from ..i18n import t

NAME_PATTERN = re.compile(r"^[A-Za-z0-9_\-]+$")


class CreateScreen(Screen):
    BINDINGS = [
        Binding("q", "back", "atrás / back"),
        Binding("escape", "back", "atrás / back", show=False),
    ]

    step: reactive[int] = reactive(1)

    def __init__(self) -> None:
        super().__init__()
        self.selected_files: list[Path] = []
        self.inbox_path: Path | None = None
        self.documents: list[ingest.Document] = []
        self.cortex_name: str = ""

    def compose(self) -> ComposeResult:
        self.body = Vertical(id="create-body")
        yield self.body
        yield Footer()

    def on_mount(self) -> None:
        self.run_worker(self._render_step1(), exclusive=True)

    # ───────── Step 1: choose source folder ─────────

    async def _render_step1(self) -> None:
        await self.body.remove_children()
        lang = self._lang()
        default_inbox = self.app.cfg.cortex_root / "inbox"
        self.inbox_path = default_inbox

        items = [
            ListItem(Label(f"  ▸  {t('create.source.default')}\n     {default_inbox}"), id="src-default"),
        ]
        await self.body.mount_all([
            Static(ascii_art.get_logo(lang), classes="logo"),
            Static(t("create.title").upper(), classes="heading"),
            Static(t("create.step1"), classes="subheading"),
            Static(ascii_art.DIVIDER, classes="divider"),
            Static(""),
            ListView(*items, id="create-step1-options"),
        ])

    # ───────── Step 2: pick documents ─────────

    async def _render_step2(self) -> None:
        await self.body.remove_children()
        lang = self._lang()

        all_files = ingest.list_documents(self.inbox_path) if self.inbox_path else []

        widgets = [
            Static(ascii_art.get_logo(lang), classes="logo"),
            Static(t("create.title").upper(), classes="heading"),
            Static(t("create.step2"), classes="subheading"),
            Static(ascii_art.DIVIDER, classes="divider"),
            Static(""),
            Static(t("create.detected", path=str(self.inbox_path))),
            Static(""),
        ]

        if not all_files:
            widgets.append(Static(t("create.empty"), classes="warning"))
            await self.body.mount_all(widgets)
            return

        # For simplicity, all files are selected by default
        self.selected_files = list(all_files)

        items = []
        for i, p in enumerate(all_files):
            size_kb = p.stat().st_size // 1024
            label_text = f"  [✓]  {p.name}  ·  {size_kb} KB"
            items.append(ListItem(Label(label_text), id=f"file-{i}"))
        widgets.extend([
            ListView(*items, id="create-step2-files"),
            Static(""),
            Static(
                t("create.selected", n=len(self.selected_files), words="?"),
                id="selection-summary",
                classes="muted",
            ),
            Static(""),
            Static("[ENTER] continuar / continue   [ESC] atrás / back", classes="muted"),
        ])
        await self.body.mount_all(widgets)

    # ───────── Step 3: name ─────────

    async def _render_step3(self) -> None:
        await self.body.remove_children()
        lang = self._lang()

        self.name_input = Input(
            placeholder=t("create.name.placeholder"),
            id="name-input",
        )
        await self.body.mount_all([
            Static(ascii_art.get_logo(lang), classes="logo"),
            Static(t("create.title").upper(), classes="heading"),
            Static(t("create.step3"), classes="subheading"),
            Static(ascii_art.DIVIDER, classes="divider"),
            Static(""),
            self.name_input,
            Static(""),
            Static(t("create.location"), classes="muted"),
            Static(
                f"  {self.app.cfg.cortex_root}/<nombre>/",
                id="location-preview",
                classes="muted",
            ),
            Static(""),
            Static("[ENTER] " + t("create.button") + "   [ESC] " + t("nav.back"), classes="muted"),
        ])
        self.set_focus(self.name_input)

    # ───────── Step 4: process & finish ─────────

    async def _render_step4_processing(self) -> None:
        await self.body.remove_children()
        lang = self._lang()
        self.process_log = Static("", id="process-log")
        await self.body.mount_all([
            Static(ascii_art.get_logo(lang), classes="logo"),
            Static(t("process.title").upper(), classes="heading"),
            Static(ascii_art.DIVIDER, classes="divider"),
            Static(""),
            self.process_log,
        ])

    def _process(self) -> tuple[Path, float]:
        start = time.time()
        log_lines: list[str] = []

        def log(msg: str) -> None:
            log_lines.append(f"  ▸  {msg}")
            self.process_log.update("\n".join(log_lines))

        # Parse all selected files
        self.documents = []
        for p in self.selected_files:
            log(t("process.reading", file=p.name))
            try:
                doc = ingest.parse_file(p)
                self.documents.append(doc)
            except Exception as e:
                log(t("process.error", file=p.name, error=str(e)))

        log(t("process.extracting"))
        log(t("process.organizing"))

        # Generate the cortex
        cortex_dir = self.app.cfg.cortex_root / self.cortex_name
        cortex_dir.mkdir(parents=True, exist_ok=True)
        sources_dir = cortex_dir / "fuentes" if self._lang() == "es" else cortex_dir / "sources"
        sources_dir.mkdir(exist_ok=True)

        # Copy originals
        for p in self.selected_files:
            try:
                copy2(p, sources_dir / p.name)
            except Exception:
                pass

        log(t("process.generating_cortex"))
        cortex_md = structure.generate_cortex_md(
            name=self.cortex_name,
            documents=self.documents,
            language=self._lang(),
        )
        (cortex_dir / "CORTEX.md").write_text(cortex_md, encoding="utf-8")

        log(t("process.generating_prompt"))
        prompt_md = prompt_gen.generate_prompt_md(
            name=self.cortex_name, language=self._lang()
        )
        (cortex_dir / "PROMPT.md").write_text(prompt_md, encoding="utf-8")

        elapsed = time.time() - start
        log(f"\n  ✓  {t('process.done', seconds=f'{elapsed:.1f}')}")
        return cortex_dir, elapsed

    # ───────── Event handlers ─────────

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        item_id = event.item.id or ""
        if item_id == "src-default":
            self.step = 2
        elif item_id.startswith("file-"):
            # Toggle selection — for MVP we just continue with all
            self.step = 3

    def on_input_submitted(self, event: Input.Submitted) -> None:
        if event.input.id == "name-input":
            name = (event.value or "").strip()
            if not NAME_PATTERN.match(name):
                self.app.notify(t("error.invalid_name"), severity="error")
                return
            cortex_dir = self.app.cfg.cortex_root / name
            if cortex_dir.exists():
                self.app.notify(t("error.cortex_exists"), severity="error")
                return
            self.cortex_name = name
            self.step = 4

    def watch_step(self, step: int) -> None:
        if step == 1:
            self.run_worker(self._render_step1(), exclusive=True)
        elif step == 2:
            self.run_worker(self._render_step2(), exclusive=True)
        elif step == 3:
            self.run_worker(self._render_step3(), exclusive=True)
        elif step == 4:
            self.run_worker(self._render_step4_processing(), exclusive=True)
            # Schedule processing after the screen renders
            self.set_timer(0.3, self._do_process_and_finish)

    def _do_process_and_finish(self) -> None:
        try:
            cortex_dir, elapsed = self._process()
            # Switch to result screen
            from .result import ResultScreen
            self.app.push_screen(ResultScreen(cortex_dir, self.cortex_name))
        except Exception as e:
            self.app.notify(f"Error: {e}", severity="error")

    def action_back(self) -> None:
        if self.step > 1:
            self.step = self.step - 1
        else:
            self.app.pop_screen()

    def _lang(self) -> str:
        return self.app.cfg.language if (hasattr(self.app, "cfg") and self.app.cfg) else "es"
