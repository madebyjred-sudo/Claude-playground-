# Stage 01 — plan

## Purpose

Producir un plan del día (o semana, si Jred lo pide) tomando como input los TODOs activos, las preferencias, y el contexto que Jred dé conversacionalmente (eventos del calendario, energía, restricciones del día).

## Inputs

| Layer | Path | Para qué |
|---|---|---|
| 3 | `_config/preferences.md` | horarios, reglas duras/suaves, energía |
| 3 | `_config/people.md` | si aparecen reuniones con personas registradas |
| 3 | `shared/todos/active.md` | TODOs vivos a considerar |
| 3 | `stages/01_plan/references/` | plantillas de plan, ejemplos, restricciones extra |
| 4 | (input conversacional de Jred) | eventos del día, mood, restricciones específicas |

**No cargar:** `shared/notes/` completo (es enorme), `shared/todos/done.md` ni `someday.md`, outputs de planes anteriores (salvo que Jred lo pida explícito como contexto).

## Process

1. Leer `preferences.md`. Internalizar reglas duras (no se rompen) y suaves (se prefieren).
2. Leer `active.md`. Filtrar a P1 + P2 con deadline esta semana.
3. Tomar el contexto del día que dio Jred (eventos, energía, restricciones).
4. Asignar bloques de tiempo respetando: deep-work windows, ventanas de reuniones, buffers, reglas duras.
5. Para cada bloque, asociar 1 TODO (con su `#id`) o evento de calendario.
6. Flaggear conflictos explícitos: TODOs P1 que no caben hoy, reglas suaves violadas, deadlines en riesgo.
7. Escribir en `output/` siguiendo la plantilla de abajo.

## Outputs

Archivo: `output/YYYY-MM-DD-plan.md` (o `YYYY-MM-DD-week-N.md` para plan semanal).

Plantilla:

```markdown
# Plan — {fecha}

## Contexto del día
- Energía: {alta|media|baja}
- Eventos fijos: {lista}
- Restricciones: {lista}

## Bloques

| Hora | Bloque | TODO/Evento | Notas |
|------|--------|-------------|-------|
| 09:00–11:00 | deep-work | #id-... | ... |
| 11:00–11:15 | buffer | — | |
| 11:15–12:00 | reunión | con @persona | ... |
| ...

## TODOs que NO caben hoy
- #id-... (motivo: tiempo / energía / dependencia)

## Conflictos / decisiones pendientes
- ...

## Para review de Jred
- ¿Aprobado este plan? Si sí → siguiente: corre `stages/02_brief`.
- Si hay que ajustar: edita este archivo o dime qué cambiar.
```

## Routing

- **Next:** `stages/02_brief/` (después del review gate humano).
- **On failure:** si faltan inputs críticos (ej. `preferences.md` sin llenar), parar y pedir a Jred que llene `setup/questionnaire.md` primero.
