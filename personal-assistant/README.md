# Personal Assistant (ICM workspace)

Asistente personal para Jred, construido siguiendo la **Interpretable Context Methodology** (Van Clief & McDermott, 2026). Operado por Claude Code desde este repo.

## Uso

1. **Primera vez:** abre `setup/questionnaire.md` y respóndelo. Tus respuestas alimentan `_config/`.
2. **Cada día:**
   - Pídele a Claude: *"corre el stage 01_plan"* — genera un plan en `stages/01_plan/output/`.
   - Revisa, edita el plan si quieres.
   - Pídele: *"corre el stage 02_brief"* — genera el briefing matutino.
3. **Durante el día:**
   - *"agrega TODO: …"* → se añade a `shared/todos/active.md`.
   - *"recuerda esto: …"* → se crea nota en `shared/notes/`.
   - *"¿qué dije sobre X?"* → busca en `shared/notes/`.

## Estructura

Ver `IDENTITY.md` para el mapa completo. Resumen:

- `_config/` → tus reglas (voz, preferencias, gente, vocabulario)
- `shared/` → tu base de conocimiento (notas + TODOs)
- `stages/` → pipeline (plan → brief)
- `setup/` → cuestionario inicial
- `vendor/icm-template/` (en el repo raíz) → metodología upstream para referencia

## Filosofía

Layer 3 es la **receta** (cambia pocas veces). Layer 4 son los **ingredientes** del día (cambian cada run). Cuando el output sale mal de forma recurrente, no edites el output — edita la receta en `_config/`.

## Próximos pasos planeados

- UI propia en VPS conectada al mismo workspace
- Entrada de voz (Whisper) para capturar TODOs y notas
- Triggers automáticos (cron diario para `01_plan` a las 7am)
