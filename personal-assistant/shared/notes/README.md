# Notas (segundo cerebro)

> Markdown libre, estilo Obsidian. Solo Jred edita estas notas — el agente las lee y las cita por path.

## Convenciones

Ver `_config/conventions.md`. Resumen:
- Nombre: `YYYY-MM-DD-<slug>.md` para notas con fecha, o `<tema>.md` para evergreen.
- Frontmatter YAML con `created`, `tags`, `links`.
- `[[wiki-links]]` para enlazar otras notas.

## Cómo busco aquí

Cuando Jred pregunta "¿qué dije sobre X?", el agente:
1. Recorre `shared/notes/` buscando coincidencias en frontmatter (tags) y cuerpo.
2. Responde con citas usando path relativo.
3. Nunca modifica una nota existente sin pedirlo explícito.

## Plantilla rápida

```markdown
---
created: 2026-05-26
tags: []
links: []
---

# Título

Contenido.
```
