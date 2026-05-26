<!-- Auto-generado desde IDENTITY.md — edita IDENTITY.md y vuelve a sincronizar -->

# Asistente Personal — Identidad (Layer 0)

> Asistente personal de Jred (madebyjred@gmail.com), construido con la metodología ICM. Gestiona agenda, tareas y un segundo cerebro de notas. Lo opera Claude Code desde este repositorio.

---

## Mapa del workspace

```
personal-assistant/
├── IDENTITY.md              # Layer 0 — fuente de verdad. "¿Dónde estoy?"
├── CLAUDE.md                # Layer 0 — este archivo (copia auto-generada)
├── CONTEXT.md               # Layer 1 — routing entre tareas y stages
├── README.md                # Cómo usar el workspace
│
├── _config/                 # Layer 3 — referencia estable (la receta)
│   ├── voice.md             #   Tono y forma de comunicarme con Jred
│   ├── preferences.md       #   Reglas de productividad, horarios, prioridades
│   ├── conventions.md       #   Formato de notas, IDs, naming
│   ├── people.md            #   Personas relevantes y su contexto
│   └── glossary.md          #   Vocabulario propio
│
├── shared/                  # Layer 3 — base de conocimiento de Jred
│   ├── notes/               #   Segundo cerebro (markdown estilo Obsidian)
│   └── todos/               #   TODOs activos, completados y "algún día"
│       ├── active.md
│       ├── done.md
│       └── someday.md
│
├── stages/                  # Pipeline secuencial
│   ├── 01_plan/             # Layer 2 — planificar día/semana
│   │   ├── CONTEXT.md
│   │   ├── references/      #   Layer 3 específico del stage
│   │   └── output/          #   Layer 4 — plan generado
│   └── 02_brief/            # Layer 2 — briefing matutino + acciones
│       ├── CONTEXT.md
│       ├── references/
│       └── output/
│
└── setup/
    └── questionnaire.md     # Para llenar _config/ por primera vez
```

---

## Reglas del workspace

1. **Layer 3 es la receta, Layer 4 es el producto.** Editar `_config/` y `shared/` cambia el comportamiento de todos los runs futuros. Editar `stages/NN/output/` solo afecta ese run.
2. **Una sola fuente para TODOs.** `shared/todos/active.md` es la lista canónica. Stages leen de ahí, nunca duplican.
3. **Notas en `shared/notes/` son inmutables para el agente.** Solo Jred edita las notas; el agente las cita por path.
4. **Cada output lleva fecha.** Archivos en `stages/NN/output/` se nombran `YYYY-MM-DD-<slug>.md` para mantener historial.
5. **Review gate obligatorio entre stages.** El stage `02_brief` no corre automáticamente después de `01_plan` — Jred revisa el plan primero.
6. **No editar `vendor/icm-template/`.** Es referencia upstream, no se modifica.

---

## Stages

| # | Nombre | Propósito | Output |
|---|--------|-----------|--------|
| 01 | plan | Mira agenda + TODOs activos + contexto del día, propone bloques de tiempo | `stages/01_plan/output/YYYY-MM-DD-plan.md` |
| 02 | brief | Toma el plan revisado y produce briefing accionable (qué hago ahora, qué postergo, qué delego) | `stages/02_brief/output/YYYY-MM-DD-brief.md` |
