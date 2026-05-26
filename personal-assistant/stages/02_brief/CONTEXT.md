# Stage 02 — brief

## Purpose

Tomar el plan ya revisado por Jred y producir un **briefing matutino accionable**: qué hace ahora, qué posterga, qué delega, qué necesita preparar antes de cada bloque. Es el output que Jred consume al arrancar el día (en el futuro, vía voz desde la UI).

## Inputs

| Layer | Path | Para qué |
|---|---|---|
| 3 | `_config/voice.md` | tono del briefing (directo, sin relleno) |
| 3 | `_config/preferences.md` | reglas que el plan ya respeta, pero útil para flaggear |
| 3 | `stages/02_brief/references/` | plantillas de briefing, ejemplos |
| 4 | `stages/01_plan/output/{YYYY-MM-DD}-plan.md` | el plan revisado del día |

**No cargar:** `active.md` ni `notes/` (el plan ya destiló lo relevante).

## Process

1. Leer el último plan en `stages/01_plan/output/`. Asumir que está revisado/aprobado por Jred.
2. Leer `voice.md`. Aplicar tono.
3. Para cada bloque del plan:
   - Resumir en 1 frase qué hay que hacer.
   - Listar lo que hace falta preparar antes (link/documento/contacto).
   - Si hay decisión pendiente, marcarla con `⚠️`.
4. Generar una sección "Primera hora" con la acción concreta de arranque.
5. Generar una sección "Posterga / delega" con TODOs que el plan dejó fuera.
6. Escribir en `output/` siguiendo la plantilla.

## Outputs

Archivo: `output/YYYY-MM-DD-brief.md`.

Plantilla:

```markdown
# Briefing — {fecha}

## Primera hora (arranque)
{1 párrafo: qué hacer en los primeros 60 min, sin decisiones}

## Bloques del día

### {hora} · {bloque}
- **Qué:** ...
- **Preparar:** ...
- **Decisión:** ⚠️ ... (si aplica)

### ...

## Posterga
- #id-... — razón
- ...

## Delega / pide
- a @persona: ...
- ...

## Cierre (revisar al final del día)
- ¿Qué se completó? Mover #ids a `shared/todos/done.md`.
- ¿Qué se aprendió? Posible nota en `shared/notes/`.
```

## Routing

- **Next:** ninguno. El día arranca con este briefing.
- **Al final del día:** Jred (o el agente, si Jred lo pide) actualiza `shared/todos/active.md` → `done.md` con lo completado.
- **On failure:** si no hay plan del día en `stages/01_plan/output/`, parar y pedir correr `01_plan` primero.
