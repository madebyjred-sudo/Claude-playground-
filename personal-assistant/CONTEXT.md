# Routing (Layer 1)

> Si abriste este workspace por primera vez en una sesión, lee `IDENTITY.md` y este archivo antes de actuar.

---

## Session Start Protocol

1. Leer `IDENTITY.md` (Layer 0) — entender qué es este workspace.
2. Leer este `CONTEXT.md` (Layer 1) — encontrar a qué stage va la tarea.
3. Cargar el `CONTEXT.md` del stage correspondiente (Layer 2).
4. Cargar **solo** los archivos listados en `Inputs` de ese stage (Layer 3 y 4).
5. Ejecutar el `Process` del stage.
6. Escribir en `output/` siguiendo la convención de nombres.
7. Reportar a Jred qué archivo se generó y esperar review antes del siguiente stage.

---

## Routing table

| Tarea pedida por Jred | Stage / destino | Cargar primero |
|---|---|---|
| "Planéame el día / la semana" | `stages/01_plan/` | `_config/preferences.md`, `shared/todos/active.md` |
| "Dame el briefing de hoy" | `stages/02_brief/` | último plan en `stages/01_plan/output/`, `_config/voice.md` |
| "Agrega un TODO: X" | Editar `shared/todos/active.md` directo | `_config/conventions.md` (formato de TODO) |
| "¿Qué dije sobre X?" | Buscar en `shared/notes/` | `_config/glossary.md` para resolver términos |
| "Marcar X como hecho" | Mover de `active.md` a `done.md` con fecha | `_config/conventions.md` |
| "Recuerda esto: ..." | Crear nota nueva en `shared/notes/YYYY-MM-DD-<slug>.md` | `_config/conventions.md` |
| "Cambia mi preferencia X" | Editar `_config/preferences.md` | (nada) |
| "¿Quién es X?" / "Agenda con X" | Consultar/editar `_config/people.md` | (nada) |

---

## Recursos compartidos (`_config/` y `shared/`)

| Archivo | Para qué sirve |
|---|---|
| `_config/voice.md` | Cómo hablo a Jred (tono, longitud, formato) |
| `_config/preferences.md` | Horarios, prioridades, reglas duras ("nunca agendar viernes pm") |
| `_config/conventions.md` | Formato de TODOs, notas, IDs, naming de archivos |
| `_config/people.md` | Personas relevantes en la vida y trabajo de Jred |
| `_config/glossary.md` | Vocabulario propio (proyectos, lugares, abreviaciones) |
| `shared/notes/` | Segundo cerebro — notas markdown (estilo Obsidian) |
| `shared/todos/active.md` | TODOs activos. Única fuente de verdad |
| `shared/todos/done.md` | Historial de completados con fecha |
| `shared/todos/someday.md` | Backlog sin fecha de compromiso |

---

## Pipeline

```
Input del día (calendario, mensajes, contexto que da Jred conversacionalmente)
        │
        ▼
┌────────────────┐
│ 01_plan        │  Lee preferences + todos activos + contexto
│                │  Escribe: stages/01_plan/output/YYYY-MM-DD-plan.md
└────────────────┘
        │
        ▼
   [Review gate] ─── Jred revisa el plan, edita si quiere
        │
        ▼
┌────────────────┐
│ 02_brief       │  Lee el plan revisado + voice
│                │  Escribe: stages/02_brief/output/YYYY-MM-DD-brief.md
└────────────────┘
```

El pipeline es **opt-in**: ningún stage corre solo. Jred (o un trigger futuro) pide explícitamente cada uno.
