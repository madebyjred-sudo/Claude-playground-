```
     ___/\/\/\/\/\____/\/\/\/\____/\/\/\/\/\____/\/\/\/\/\/\__/\/\/\/\/\/\__/\/\____/\/\_
    _/\/\__________/\/\____/\/\__/\/\____/\/\______/\/\______/\______________/\/\/\/\___
   _/\/\__________/\/\____/\/\__/\/\/\/\/\________/\/\______/\/\/\/\/\________/\/\_____
  _/\/\__________/\/\____/\/\__/\/\__/\/\________/\/\______/\/\____________/\/\/\/\___
 ___/\/\/\/\/\____/\/\/\/\____/\/\____/\/\______/\/\______/\/\/\/\/\/\__/\/\____/\/\_
____________________________________________________________________________________

  la memoria que tu IA no tiene · cortex
```

> Un **cortex** es un archivo Markdown que cualquier IA (Claude, ChatGPT,
> Gemini) puede leer como memoria primaria sobre un tema.
> Vive en tu Drive. Crece con cada conversación. Es tuyo.

**Cortex** es un **protocolo**, no una app. No hay que instalar nada
para usarlo. Lo único que hay que hacer es pegar un link en una
conversación con tu IA y empezar a trabajar.

---

## Cómo se usa, en una acción

Abrí tu IA favorita y pegá este prompt como primer mensaje:

```
Antes de empezar, leé y seguí este protocolo:
https://raw.githubusercontent.com/madebyjred-sudo/CORTEX-CLI/main/skills/cortex/SKILL.md

Cuando lo hayas leído, confirmame y esperá mis documentos o cortex.
```

Listo. La IA ya sabe leer, crear, hacer crecer y exportar cortex.

📖 **Empezá acá** → [`skills/cortex/README.md`](./skills/cortex/README.md)
para la guía completa, el flujo de tres movimientos (crear · conversar ·
hand-off), y ejemplos reales.

---

## Las tres piezas

| Pieza | Qué es | Para quién |
|---|---|---|
| [`skills/cortex/SKILL.md`](./skills/cortex/SKILL.md) | El **protocolo completo** en una skill que cualquier IA puede leer | Todos — esto es el corazón |
| [`skills/cortex/CORTEX-TEMPLATE.md`](./skills/cortex/CORTEX-TEMPLATE.md) | La **plantilla vacía** de un cortex | Para escribir uno a mano |
| [`skills/cortex/examples/`](./skills/cortex/examples/) | **Cortex reales** completos como referencia | Para ver cómo se ve un cortex maduro |

Esas tres son suficientes para usar Cortex con cualquier IA.

---

## Las cinco capas del cortex

Un cortex es un archivo Markdown con estas cinco secciones:

```
  ┌─────────────────────────────────────────────────────────┐
  │  SINAPSIS    · conceptos núcleo                         │
  │  HIPOCAMPO   · memoria de hechos verificables           │
  │  CONEXIONES  · cómo se relacionan los conceptos         │
  │  ABIERTAS    · preguntas no resueltas                   │
  │  NOTAS PROPIAS · interpretaciones (no hechos)           │
  └─────────────────────────────────────────────────────────┘
```

Cada capa cumple un rol cognitivo distinto. La metáfora cerebral no es
decorativa: la IA fue inspirada en arquitecturas neurales y este formato
las respeta. SINAPSIS son los conceptos. HIPOCAMPO los hechos.
CONEXIONES la red inferencial. ABIERTAS lo que falta resolver.
NOTAS PROPIAS la memoria de trabajo subjetiva.

---

## El CLI (opcional · para power users)

Si tenés mucho volumen de documentos largos y querés un primer scaffold
deterministico **antes** de pasar el cortex por la IA, hay un CLI Python
en este repo que automatiza el parseo de PDFs / Word / EPUB / Wikipedia
y arma un cortex inicial. **No es necesario para usar Cortex** — el
protocolo + tu IA cubren el 100% del flujo.

Instalación en una línea (cuando lo necesites):

```bash
curl -LsSf https://raw.githubusercontent.com/madebyjred-sudo/CORTEX-CLI/main/install.sh | sh
```

Después:

```bash
cortex                  # TUI con menú
cortex update           # aplica actualizaciones del clipboard a un cortex local
cortex --help
```

Más detalles en [`docs/cli.md`](./docs/cli.md) (TBD) o en el código en
[`src/cortex_cli/`](./src/cortex_cli/).

---

## Filosofía

- El cortex es **tuyo**. Vive en tu Drive en Markdown puro, sin lock-in.
- La skill no decide nada — solo enseña a la IA las reglas del juego.
- El **usuario** es la mano que guarda. La **IA** es el cerebro que
  piensa. El **archivo** es el puente.
- Esto no es una app: es un **protocolo**. Cualquier IA presente o
  futura puede usarlo mientras siga el formato.

---

## Roadmap

- ✅ Protocolo CORTEX + Skill portable (Claude / ChatGPT / Gemini)
- ✅ CLI complementario opcional (parseo PDF/Word/EPUB/Wikipedia, TUI, ciclo de updates)
- [ ] MCP server para Claude Desktop / Cursor / Cline — cierre de loop completo sin copy-paste manual
- [ ] OCR para PDFs escaneados
- [ ] Transcripción de audio/video como input
- [ ] Plantillas verticales (cortex de proyecto, cortex de libro, cortex de cliente, etc.)

---

## Autor

Juan Manuel Rojas · 2026 · MIT License
