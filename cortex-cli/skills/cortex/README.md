```
     ___/\/\/\/\/\____/\/\/\/\____/\/\/\/\/\____/\/\/\/\/\/\__/\/\/\/\/\/\__/\/\____/\/\_
    _/\/\__________/\/\____/\/\__/\/\____/\/\______/\/\______/\______________/\/\/\/\___
   _/\/\__________/\/\____/\/\__/\/\/\/\/\________/\/\______/\/\/\/\/\________/\/\_____
  _/\/\__________/\/\____/\/\__/\/\__/\/\________/\/\______/\/\____________/\/\/\/\___
 ___/\/\/\/\/\____/\/\/\/\____/\/\____/\/\______/\/\______/\/\/\/\/\/\__/\/\____/\/\_
____________________________________________________________________________________

  un cortex es la memoria que tu IA no tiene · y la podés mover entre ellas
```

# CORTEX

Un **cortex** es un archivo Markdown estructurado en cinco capas
(SINAPSIS, HIPOCAMPO, CONEXIONES, ABIERTAS, NOTAS PROPIAS) que cualquier
IA (Claude, ChatGPT, Gemini) puede leer como **memoria primaria** sobre
un tema. Vive en tu Drive como un `.md` cualquiera. La IA lo lee, lo
cita, propone cómo hacerlo crecer, y cuando se te acaba el contexto, te
devuelve la versión actualizada lista para guardar y seguir en otra
conversación.

Esto es un **protocolo**, no una app. No hay que instalar nada.

---

## Cómo se usa, en una sola acción

Abrí tu IA favorita (Claude, ChatGPT, Gemini Pro — cualquiera que
soporte abrir links o subir archivos). Pegá este prompt como **primer
mensaje** de un chat nuevo:

```
Antes de empezar, leé y seguí este protocolo:
https://raw.githubusercontent.com/madebyjred-sudo/CORTEX-CLI/main/skills/cortex/SKILL.md

Cuando lo hayas leído, confirmame y esperá mis documentos o cortex.
```

La IA va a leer la skill, confirmar que la entendió, y quedar lista para
trabajar con cortex.

Después tenés tres movimientos posibles, en orden natural:

### Primer movimiento · creación

Subí o pegá tus documentos en el chat (PDFs, links, texto, lo que
tengas) y decile: *"creame un cortex sobre este material"*. La IA va a
generar el archivo `CORTEX.md` completo en un bloque de código. **Copialo
y guardalo en tu Drive** como `CORTEX-<nombre>.md`.

### Segundo movimiento · conversación

Cada vez que quieras hablar de ese tema (ahora o en seis meses), abrí un
chat nuevo, pegá el prompt de arriba, y después pegá el contenido de tu
`CORTEX-<nombre>.md`. La IA va a responder citando las secciones del
cortex y proponiendo cómo crecerlo al final de respuestas útiles.

### Tercer movimiento · hand-off (la continuidad)

Cuando termines la sesión (o cuando se te acabe el contexto del chat),
decile: *"guardá el córtex"* o *"/handoff"*. La IA te va a devolver el
archivo **completo actualizado** en un bloque de código. **Reemplazá tu
archivo local con eso.** Listo: la próxima vez seguís donde quedaste.

---

## Diagrama del flujo

```
   ┌─────────────────────────────┐
   │  1. abrís tu IA             │
   │  2. pegás el prompt con el  │
   │     link a este SKILL.md    │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌─────────────────────────────┐
   │  3a. subís documentos →     │
   │     IA crea CORTEX.md       │
   │  3b. o pegás un CORTEX.md   │
   │     existente               │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌─────────────────────────────┐
   │  4. conversás · la IA cita  │
   │     secciones y propone     │
   │     actualizaciones         │
   └──────────────┬──────────────┘
                  │
                  ▼
   ┌─────────────────────────────┐
   │  5. al cerrar la sesión:    │
   │     pedís "/handoff"        │
   │  6. IA devuelve archivo     │
   │     completo actualizado    │
   │  7. lo guardás en Drive     │
   └──────────────┬──────────────┘
                  │
                  ▼
            (próxima sesión:
             volvés al paso 1)
```

---

## Las cinco capas · qué significan

| Capa | Rol | Ejemplo |
|---|---|---|
| **SINAPSIS** | índice de conceptos | *"embedding: representación vectorial de texto en un espacio de similitud semántica"* |
| **HIPOCAMPO** | memoria de hechos | *"GraphRAG vs Vector RAG: el primero modela relaciones explícitas, el segundo modela cercanía geométrica"* |
| **CONEXIONES** | red de inferencias | *"sinapsis e hipocampo se diferencian en granularidad: sinapsis es la abstracción, hipocampo es el detalle"* |
| **ABIERTAS** | preguntas pendientes | *"¿cuándo conviene fine-tuning vs RAG?"* |
| **NOTAS PROPIAS** | tus interpretaciones | *"creo que GraphRAG sirve mejor en dominios con ontologías estables"* |

La metáfora cerebral no es decorativa — la IA fue inspirada en
arquitecturas neurales, y este formato la respeta. SINAPSIS son los
conceptos. HIPOCAMPO son los hechos consolidados. CONEXIONES son la red
inferencial. ABIERTAS son lo que no resolviste. NOTAS PROPIAS son tu
memoria de trabajo, marcada como subjetiva.

---

## La continuidad entre sesiones (la pregunta clave)

> *"¿Qué pasa cuando se me acaba el chat? ¿Pierdo todo?"*

**No.** La conversación es efímera, pero el archivo no. El hand-off
(PROTOCOLO 4 de la skill) está diseñado exactamente para esto:

1. Cuando vas a cerrar, decile *"/handoff"* o *"guardá el cortex"*.
2. La IA te devuelve el archivo completo, con todas las actualizaciones
   integradas.
3. Lo guardás en tu Drive sobreescribiendo el viejo.
4. Próxima vez: chat nuevo, pegás el prompt + el cortex actualizado,
   seguís.

El cortex es tu **save game**. La IA es tu compañero de juego. El chat
es la sesión. Si el chat se cierra, el save game queda — solo necesitás
volver a cargarlo.

---

## Ejemplos

Mirá [`examples/`](./examples/) para ver cortex reales:

- [`CORTEX-borges-aleph.md`](./examples/CORTEX-borges-aleph.md) —
  un cortex sobre el libro de Borges, ~150 líneas, mostrando una capa
  HIPOCAMPO organizada por subtemas reales.
- [`CORTEX-mincyt.md`](./examples/CORTEX-mincyt.md) — un cortex sobre
  un proyecto de software (más operativo, menos literario).
- [`CORTEX-TEMPLATE.md`](./CORTEX-TEMPLATE.md) — la plantilla vacía
  que la IA usa al generar uno nuevo, por si querés escribir uno a mano.

---

## Instalación opcional · como Skill nativa de Claude

Si usás Claude Code o Claude Desktop podés instalarla localmente para
que se cargue automáticamente sin pegar el link cada vez:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/madebyjred-sudo/CORTEX-CLI.git /tmp/cortex
cp -r /tmp/cortex/skills/cortex ~/.claude/skills/
rm -rf /tmp/cortex
```

A partir de ahí Claude la activa sola cuando detecta un cortex en la
conversación. Para ChatGPT, Gemini y otros, el flujo del link sigue
siendo el más rápido.

---

## El CLI complementario (opcional, para power users)

En la raíz del repo hay un CLI Python ([`cortex-cli`](../../)) que
automatiza la creación de cortex desde PDFs/Word/EPUBs sin pasar por la
IA — útil si tenés muchos documentos largos y querés un primer scaffold
deterministico. **No es necesario para usar Cortex.** El protocolo + la
skill + tu IA cubren el 100% del flujo. El CLI es solo para acelerar
ingesta cuando hay volumen.

---

## Filosofía

- El cortex es **tuyo**. Vive en tu Drive en Markdown puro, sin lock-in.
- La skill no decide nada — solo enseña a la IA las reglas del juego.
- El usuario es la **mano** que guarda. La IA es el **cerebro** que
  piensa. El archivo es el **puente**.
- Esto no es una app: es un **protocolo**. Cualquier IA presente o
  futura puede usarlo mientras siga el formato.

---

## Versión

`cortex-skill v0.1.0` · MIT License · 2026
