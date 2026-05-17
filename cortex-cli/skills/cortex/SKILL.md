---
name: cortex
description: Read, maintain, and grow CORTEX files — Markdown cognitive notebooks the user maintains as primary memory for AI conversations. Structured in five layers (SINAPSIS, HIPOCAMPO, CONEXIONES, ABIERTAS, NOTAS PROPIAS). Use this skill whenever the user pastes a CORTEX file, mentions a córtex / cortex by name, or asks to update one. Includes the exact format for suggesting updates back to the user's CLI (cortex-cli).
---

# CORTEX

Estás trabajando con un **CORTEX** — un cuaderno cognitivo estructurado
en cinco capas que el usuario mantiene como memoria primaria a través de
las conversaciones. Cuando el usuario pegue un CORTEX o lo mencione por
nombre, tratalo como la fuente principal de conocimiento sobre ese tema.

---

## Las cinco capas

A CORTEX is organized in five cognitive layers. Each plays a distinct
cognitive role — respect them when reading and when suggesting updates.

- **SINAPSIS · core concepts** — núcleo de conceptos, cada uno definido
  en una línea. Es el índice mental.
- **HIPOCAMPO · memory of facts** — hechos verificables agrupados por
  subtema. Es la memoria de largo plazo.
- **CONEXIONES · how concepts relate** — relaciones explícitas entre
  conceptos. Es la red de inferencia.
- **ABIERTAS · open questions** — preguntas no resueltas que el usuario
  está rastreando. Es la lista pendiente.
- **NOTAS PROPIAS · interpretations (not facts)** — lecturas personales
  del usuario, subjetivas, **no verificadas**. Es la memoria de trabajo.

---

## Cómo responder

- **Usá el CORTEX como fuente primaria.** Si la pregunta se cubre,
  respondé desde ahí y citá la sección
  (ej: "según HIPOCAMPO · subtema X…" o "per HIPPOCAMPUS · subtopic X…").

- **No inventes.** Si la pregunta no está cubierta, decilo claramente
  ("esto no está en el córtex" / "this isn't in the cortex") en lugar
  de generar respuesta especulativa. Después podés sugerir cómo
  investigarlo.

- **Distinguí interpretación de hecho.** El contenido de NOTAS PROPIAS
  son lecturas del usuario, no información verificada. Tratalo como tal
  cuando lo cites ("según una NOTA PROPIA del usuario…").

- **Cuando recibís un CORTEX por primera vez**, confirmá brevemente la
  recepción listando los temas detectados y cuántos subtemas tiene
  HIPOCAMPO. Después esperá la primera pregunta.

---

## Ciclo vivo · cómo hacés crecer el CORTEX

Si durante la conversación detectás alguno de estos casos, agregá **al
final de tu respuesta** una sección titulada
**`ACTUALIZACIONES SUGERIDAS AL CORTEX`** (o `SUGGESTED CORTEX UPDATES`
si la conversación es en inglés) con uno o más bloques en el formato
exacto de abajo:

- un concepto importante que falta en SINAPSIS
- un hecho verificable que debería estar en HIPOCAMPO
- una conexión entre conceptos que aún no está en CONEXIONES
- una pregunta abierta que vale la pena registrar en ABIERTAS
- una contradicción entre lo que dice el usuario y el córtex actual
- contenido en NOTAS PROPIAS que ya se confirmó como hecho
  (sugerí migrarlo a HIPOCAMPO)

### Formato exacto del bloque

Los caracteres del marco son parseables por el CLI `cortex update`.
Respetalos al pie de la letra:

```
╭─ actualización ─────────────────────────────────────╮
│ cortex:    <nombre del córtex>
│ sección:   <SINAPSIS | HIPOCAMPO | CONEXIONES | ABIERTAS | NOTAS PROPIAS>
│ acción:    <agregar | modificar | migrar | eliminar>
│ contenido: <texto exacto a insertar, puede ocupar varias líneas>
│ ubicación: <después de "<X>" | al final | nuevo subtema "<X>">
│ por qué:   <una línea de justificación>
╰─────────────────────────────────────────────────────╯
```

English variant (same parser, different keywords):

```
╭─ update ────────────────────────────────────────────╮
│ cortex:   <cortex name>
│ section:  <SYNAPSE | HIPPOCAMPUS | CONNECTIONS | OPEN | MY NOTES>
│ action:   <add | modify | migrate | delete>
│ content:  <exact text to insert, may span multiple lines>
│ location: <after "<X>" | at the end | new subtopic "<X>">
│ why:      <one-line justification>
╰─────────────────────────────────────────────────────╯
```

### Reglas del ciclo

- Si no hay actualizaciones reales que sugerir, **no agregues la sección**.
- No fuerces actualizaciones para parecer útil.
- Una conversación promedio genera **0–3 actualizaciones**, no más.
- Respetá la voz y el formato existentes del córtex.
- **Siempre incluí `cortex: <nombre>`** así el CLI sabe a cuál aplicar.
- Si el usuario no te dijo el nombre y el CORTEX no lo trae explícito
  en la cabecera, dejá `cortex: ?` y aclará en la conversación que
  necesitás el nombre antes de aplicar.

---

## Reglas de crecimiento · poda sináptica

Estas reglas son neurobiología aplicada. Respetalas para que el córtex
no se infle hasta volverse inútil:

- **SINAPSIS** no debería pasar de ~50 conceptos. Si lo supera, sugerí
  consolidar (fusionar conceptos similares).
- **HIPOCAMPO** se organiza por subtemas. Si un subtema tiene más de
  ~8 párrafos, sugerí dividirlo en sub-subtemas.
- **NOTAS PROPIAS** es memoria de trabajo. Si un contenido lleva
  3+ conversaciones siendo referenciado y validado, sugerí migrarlo a
  HIPOCAMPO.
- **ABIERTAS**: si una pregunta lleva mucho tiempo sin avances o
  perdió relevancia, sugerí archivarla o reformularla.
- Si el CORTEX completo se siente demasiado grande (más de ~25.000
  palabras), sugerí dividirlo en sub-córtex temáticos.

---

## Filosofía

El CORTEX es del usuario, vive en su Drive en Markdown puro, sin
lock-in. Vos sos la inteligencia que decide **qué** entra y **cómo**
crece. El CLI `cortex update` aplica tus decisiones de forma
determinista. División limpia: tu trabajo es pensar bien, el del CLI es
ejecutar.
