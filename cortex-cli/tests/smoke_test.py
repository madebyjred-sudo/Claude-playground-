"""End-to-end smoke test that exercises the core pipeline without the TUI.

Parses the Mincyt PDF (already downloaded earlier in /tmp), generates
CORTEX.md and PROMPT.md, then simulates an LLM update and applies it.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from cortex_cli.core import ingest, structure, prompt as prompt_gen, apply
from cortex_cli.core.update_parser import parse_blocks


def main() -> None:
    pdf = Path("/tmp/test-inbox/codigo_etica_mincyt.pdf")
    assert pdf.exists(), f"missing test PDF at {pdf}"

    out_dir = Path("/tmp/cortex-smoke-test")
    if out_dir.exists():
        import shutil
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)

    name = "codigo-etica-mincyt"
    cortex_dir = out_dir / name
    cortex_dir.mkdir()

    # 1. Parse PDF
    print(f"→ parseando {pdf.name}...")
    doc = ingest.parse_file(pdf)
    print(f"  ✓ título: {doc.title}")
    print(f"  ✓ secciones detectadas: {len(doc.sections)}")
    print(f"  ✓ palabras totales: {doc.word_count():,}")

    # 2. Generate CORTEX.md
    print("→ generando CORTEX.md...")
    cortex_md = structure.generate_cortex_md(name=name, documents=[doc], language="es")
    (cortex_dir / "CORTEX.md").write_text(cortex_md, encoding="utf-8")
    print(f"  ✓ CORTEX.md: {(cortex_dir / 'CORTEX.md').stat().st_size:,} bytes")

    # 3. Generate PROMPT.md
    print("→ generando PROMPT.md...")
    prompt_md = prompt_gen.generate_prompt_md(name=name, language="es")
    (cortex_dir / "PROMPT.md").write_text(prompt_md, encoding="utf-8")
    print(f"  ✓ PROMPT.md: {(cortex_dir / 'PROMPT.md').stat().st_size:,} bytes")

    # 4. Simulate an LLM update suggestion
    print("→ simulando una actualización del LLM...")
    fake_llm_response = f"""
Acá está la respuesta a tu pregunta...

Y al final, agrego mis sugerencias:

ACTUALIZACIONES SUGERIDAS AL CORTEX

╭─ actualización ─────────────────────────────────────╮
│ cortex:    {name}
│ sección:   SINAPSIS
│ acción:    agregar
│ contenido: GraphRAG · arquitectura RAG basada en grafos de conocimiento
│            que captura relaciones entre conceptos en lugar de solo
│            similitud vectorial.
│ ubicación: al final
│ por qué:   concepto recurrente en últimas conversaciones
╰─────────────────────────────────────────────────────╯

╭─ actualización ─────────────────────────────────────╮
│ cortex:    {name}
│ sección:   ABIERTAS
│ acción:    agregar
│ contenido: ¿Cómo se compatibiliza el principio de Ciencia Abierta del
│            Código con modelos LLM propietarios?
│ ubicación: al final
│ por qué:   tensión filosófica que aparece en uso práctico
╰─────────────────────────────────────────────────────╯
"""

    updates = parse_blocks(fake_llm_response)
    print(f"  ✓ updates parseadas: {len(updates)}")
    for u in updates:
        print(f"    · {u.section} · {u.action} · '{u.content[:50]}...'")

    # 5. Apply
    print("→ aplicando updates...")
    result = apply.apply_updates(cortex_dir / "CORTEX.md", updates, history_dir_name="historial")
    print(f"  ✓ aplicadas: {result.applied}")
    print(f"  ✓ skipped: {result.skipped}")
    if result.backup_path:
        print(f"  ✓ backup: {result.backup_path.name}")

    # 6. Show resulting files
    print("\n→ archivos generados:")
    for p in sorted(cortex_dir.rglob("*")):
        if p.is_file():
            print(f"  {p.relative_to(out_dir)} ({p.stat().st_size:,} bytes)")

    # 7. Print first 50 lines of resulting cortex
    print("\n→ primeras 50 líneas del CORTEX.md:")
    print("─" * 60)
    content = (cortex_dir / "CORTEX.md").read_text(encoding="utf-8")
    for line in content.splitlines()[:50]:
        print(line)
    print("─" * 60)

    print("\n✓ smoke test completed")


if __name__ == "__main__":
    main()
