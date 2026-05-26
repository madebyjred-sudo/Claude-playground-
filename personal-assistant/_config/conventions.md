# Convenciones

> Formatos canónicos para TODOs, notas y outputs. Toda salida del agente debe seguir esto.

## Nombres de archivo

- Outputs de stages: `YYYY-MM-DD-<slug>.md` (ej. `2026-05-26-plan.md`)
- Notas en `shared/notes/`: `YYYY-MM-DD-<slug>.md` o `<tema>.md` para evergreen
- Slug: minúsculas, palabras separadas por `-`, sin acentos, sin stop-words

## Formato de TODO

Cada línea en `shared/todos/active.md`:

```
- [ ] [P{1-3}] <descripción concreta> · @<contexto> · ⏰<deadline opcional> · #id-{8chars}
```

- **P1** = hoy. **P2** = esta semana. **P3** = sin urgencia.
- `@contexto`: `@trabajo`, `@casa`, `@compras`, `@llamada`, `@vps`, etc.
- `⏰`: fecha en `YYYY-MM-DD` o "viernes", "fin de mes", etc.
- `#id-{8chars}`: nanoid corto para referenciar el TODO desde notas y stages

Ejemplo:
```
- [ ] [P1] revisar PR del asistente personal · @vps · ⏰2026-05-26 · #id-a3f9b21c
```

Al completar: mover línea entera a `done.md` cambiando `[ ]` → `[x]` y agregando `→ done YYYY-MM-DD` al final.

## Formato de nota

Cada nota en `shared/notes/` empieza con frontmatter YAML:

```yaml
---
created: 2026-05-26
tags: [proyecto, idea]
links: [otra-nota.md]
---
```

Después, contenido en markdown libre. Cuando una nota referencia otra, usar `[[wiki-link]]` estilo Obsidian; el agente resuelve el path.

## Citas en outputs de stages

Cuando un stage referencia algo, usa el path relativo desde la raíz del workspace:

> Fuente: `shared/notes/2026-05-20-pitch-cliente-x.md` línea 12

## IDs

Para nuevos `#id-` generar con: `python3 -c "import secrets; print(secrets.token_hex(4))"` o equivalente. 8 chars hex.
