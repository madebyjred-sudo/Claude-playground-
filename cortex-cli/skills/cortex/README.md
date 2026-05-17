```
     ___/\/\/\/\/\____/\/\/\/\____/\/\/\/\/\____/\/\/\/\/\/\__/\/\/\/\/\/\__/\/\____/\/\_
    _/\/\__________/\/\____/\/\__/\/\____/\/\______/\/\______/\______________/\/\/\/\___
   _/\/\__________/\/\____/\/\__/\/\/\/\/\________/\/\______/\/\/\/\/\________/\/\_____
  _/\/\__________/\/\____/\/\__/\/\__/\/\________/\/\______/\/\____________/\/\/\/\___
 ___/\/\/\/\/\____/\/\/\/\____/\/\____/\/\______/\/\______/\/\/\/\/\/\__/\/\____/\/\_
____________________________________________________________________________________

  skill portable · una vez para siempre
```

# CORTEX · Skill

Una sola pieza que enseña a **cualquier IA** cómo leer, citar y hacer
crecer un CORTEX. Se instala como Skill de Claude o se pega como
prompt en cualquier otra IA que no tenga skills.

---

## Si usás Claude (claude.ai · Claude Code · Claude Desktop)

Copiá esta carpeta a tu directorio de skills:

```bash
mkdir -p ~/.claude/skills
cp -r cortex ~/.claude/skills/
```

Claude la carga automáticamente cuando pegás un CORTEX o mencionás uno
por nombre. No tenés que invocarla.

Para verificar que quedó bien:

```bash
ls ~/.claude/skills/cortex/
# debería listar: SKILL.md  README.md
```

---

## Si usás ChatGPT, Gemini, o cualquier otra IA

1. Abrí `SKILL.md` en este repo
2. Copiá el contenido **completo** (incluyendo el frontmatter YAML
   del principio — no molesta, las IAs lo leen como contexto)
3. Pegalo como **primer mensaje** en una conversación nueva
   (o como "system instruction" / "custom instructions" si tu IA lo soporta)
4. Pegá tu `CORTEX.md` a continuación
5. Empezá a preguntar

La IA va a saber qué hacer en ambos casos: responder citando secciones,
no inventar, y sugerir actualizaciones en el formato exacto que
`cortex update` sabe parsear.

---

## El flujo completo de extremo a extremo

```
  ┌───────────────────────────────┐
  │  cortex-cli (en tu máquina)   │
  │  parsea documentos →          │
  │  genera CORTEX.md             │
  └───────────────┬───────────────┘
                  │
                  ▼
  ┌───────────────────────────────┐
  │  pegás CORTEX.md              │
  │  en tu IA favorita            │
  │                               │
  │  · Claude: skill ya cargada   │
  │  · ChatGPT/Gemini: pegar      │
  │    primero esta SKILL.md      │
  └───────────────┬───────────────┘
                  │
                  ▼
  ┌───────────────────────────────┐
  │  conversás · la IA responde   │
  │  citando secciones del córtex │
  └───────────────┬───────────────┘
                  │
                  ▼
  ┌───────────────────────────────┐
  │  la IA propone ACTUALIZACIONES│
  │  en bloques ╭─ ─╮ parseables  │
  │  al final de sus respuestas   │
  └───────────────┬───────────────┘
                  │
                  ▼
  ┌───────────────────────────────┐
  │  copiás la respuesta,         │
  │  corrés `cortex update`,      │
  │  los bloques se aplican       │
  │  al CORTEX.md, se versiona    │
  │  el anterior en historial/    │
  └───────────────────────────────┘
```

---

## ¿Para qué sirve separar la skill del córtex?

Sin skill, cada córtex tendría que llevar sus propias instrucciones de
uso (eso es lo que hace el `PROMPT.md` que genera el CLI). Funciona,
pero infla cada conversación con texto repetido.

Con la skill instalada:

- Las instrucciones se cargan **una sola vez** (Claude) o **una vez por
  conversación** (otras IAs).
- El `CORTEX.md` queda limpio — solo contenido, sin meta.
- Cambios al protocolo (nuevas reglas de crecimiento, nuevos campos del
  bloque de actualización) actualizan la skill, no cada córtex viejo.

---

## Filosofía

El cortex es **tuyo**. Vive en tu Drive en Markdown puro, sin lock-in.

Esta skill no decide nada — solo enseña a la IA las reglas del juego.
Las decisiones de qué entra al cortex y cómo crece son del LLM. La
aplicación de esas decisiones es del CLI. División limpia.

---

## Versión

`cortex-skill v0.1.0` · alineada con `cortex-cli v0.1.0`. Si cambia el
formato del cortex o el formato de bloques de actualización, ambos
suben de versión juntos para no quedar desincronizados.
