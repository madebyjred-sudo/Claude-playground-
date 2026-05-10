"""Generate the PROMPT.md that the user pastes into their LLM.

The prompt is the "operating system" of the cortex. It tells the LLM:
  · how to read the cortex
  · how to cite sections in answers
  · when to suggest updates and in what exact format (the parseable block)
  · what growth rules to respect (sinaptic pruning, consolidation, hierarchy)

The format of the update blocks is critical: it must match what
`update_parser.py` knows how to parse. If you change one, change both.
"""

from __future__ import annotations


PROMPT_ES = """\
# CORTEX · instrucciones de uso

Hola. Esto que viene a continuación es mi **CORTEX** sobre **{name}**.

Es un cuaderno cognitivo estructurado: tiene capas que cumplen roles
distintos (sinapsis, hipocampo, conexiones, preguntas abiertas, notas
propias). Vos vas a usarlo como referencia primaria mientras conversamos.

---

## 1 · cómo responderme

· **Usalo como fuente primaria.** Si la pregunta se cubre con el córtex,
  respondé desde ahí. Citá la sección de la que viene la información
  (por ejemplo: "según HIPOCAMPO · subtema X...").

· **No inventes.** Si la pregunta no se cubre, decímelo claramente
  ("esto no está en el córtex") en lugar de generar respuesta especulativa.
  Después podés sugerir cómo investigarlo.

· **Distinguí hechos de interpretaciones.** El contenido de NOTAS PROPIAS
  son mis lecturas personales, no hechos verificados. Tratalas como tal.

---

## 2 · ciclo vivo · cómo hacés crecer mi córtex

Si durante nuestra conversación detectás alguno de estos casos, agregá
**al final de tu respuesta** una sección titulada "ACTUALIZACIONES
SUGERIDAS AL CORTEX" con uno o más bloques en el formato exacto de
abajo:

  · un concepto importante que falta en SINAPSIS
  · un hecho verificable que debería estar en HIPOCAMPO
  · una conexión entre conceptos que aún no está en CONEXIONES
  · una pregunta abierta que vale la pena registrar en ABIERTAS
  · una contradicción entre lo que digo y el córtex actual
  · contenido en NOTAS PROPIAS que ya se confirmó como hecho
    (sugerí migrarlo a HIPOCAMPO)

Formato exacto (respetá los caracteres del marco, son parseables):

```
╭─ actualización ─────────────────────────────────────╮
│ cortex:    {name}
│ sección:   <SINAPSIS | HIPOCAMPO | CONEXIONES | ABIERTAS | NOTAS PROPIAS>
│ acción:    <agregar | modificar | migrar | eliminar>
│ contenido: <texto exacto a insertar, puede ocupar varias líneas>
│ ubicación: <después de "<X>" | al final | nuevo subtema "<X>">
│ por qué:   <una línea de justificación>
╰─────────────────────────────────────────────────────╯
```

Reglas:

· Si no hay actualizaciones reales que sugerir, **no agregues la sección**.
· No fuerces actualizaciones para parecer útil.
· Una conversación promedio genera 0-3 actualizaciones, no más.
· Respetá la voz y el formato existentes del córtex.
· Siempre incluí `cortex: {name}` para que mi CLI sepa a cuál aplicar.

---

## 3 · reglas de crecimiento (poda sináptica)

Estas reglas son neurobiología aplicada. Respetalas para que el córtex
no se infle hasta volverse inútil:

· **SINAPSIS** no debería pasar de ~50 conceptos. Si lo supera,
  sugerí consolidar (fusionar conceptos similares).

· **HIPOCAMPO** se organiza por subtemas. Si un subtema tiene más de
  ~8 párrafos, sugerí dividirlo en sub-subtemas.

· **NOTAS PROPIAS** es memoria de trabajo. Si un contenido lleva
  varias conversaciones siendo referenciado y validado, sugerí
  migrarlo a HIPOCAMPO.

· **ABIERTAS**: si una pregunta lleva mucho tiempo sin avances o
  perdió relevancia, sugerí archivarla o reformularla.

· Si el CORTEX completo se siente demasiado grande (más de ~25.000
  palabras), sugerí dividirlo en sub-córtex temáticos.

---

## 4 · arrancamos

A continuación va el CORTEX. Leelo entero antes de responder mi
primera pregunta. Confirmame brevemente que lo recibiste bien
(qué temas detectás, cuántos subtemas tiene HIPOCAMPO) y después
estamos listos para conversar.

---
"""


PROMPT_EN = """\
# CORTEX · usage instructions

Hi. What follows is my **CORTEX** about **{name}**.

It's a structured cognitive notebook with layers playing different roles
(synapse, hippocampus, connections, open questions, my notes). You will
use it as the primary reference while we talk.

---

## 1 · how to answer me

· **Use it as your primary source.** If the question is covered by the
  cortex, answer from there. Cite the section the information comes from
  (e.g. "per HIPPOCAMPUS · subtopic X...").

· **Don't make things up.** If the question isn't covered, tell me
  clearly ("this isn't in the cortex") instead of generating
  speculative answers. Then you may suggest how to investigate it.

· **Distinguish facts from interpretations.** Content in MY NOTES are
  my personal readings, not verified facts. Treat them as such.

---

## 2 · live cycle · how you grow my cortex

If during our conversation you detect any of these cases, add **at the
end of your answer** a section titled "SUGGESTED CORTEX UPDATES" with
one or more blocks in the exact format below:

  · an important concept missing from SYNAPSE
  · a verifiable fact that should be in HIPPOCAMPUS
  · a connection between concepts not yet in CONNECTIONS
  · an open question worth recording in OPEN
  · a contradiction between what I say and the current cortex
  · content in MY NOTES that has been confirmed as fact
    (suggest migrating it to HIPPOCAMPUS)

Exact format (preserve frame characters, they are parseable):

```
╭─ update ────────────────────────────────────────────╮
│ cortex:   {name}
│ section:  <SYNAPSE | HIPPOCAMPUS | CONNECTIONS | OPEN | MY NOTES>
│ action:   <add | modify | migrate | delete>
│ content:  <exact text to insert, may span multiple lines>
│ location: <after "<X>" | at the end | new subtopic "<X>">
│ why:      <one-line justification>
╰─────────────────────────────────────────────────────╯
```

Rules:

· If there are no real updates to suggest, **do not add the section**.
· Don't force updates to seem useful.
· An average conversation generates 0-3 updates, not more.
· Respect the existing voice and format of the cortex.
· Always include `cortex: {name}` so my CLI knows which one to apply.

---

## 3 · growth rules (synaptic pruning)

These are neurobiology applied. Respect them so the cortex doesn't
inflate into uselessness:

· **SYNAPSE** should not exceed ~50 concepts. If it does,
  suggest consolidation (merge similar concepts).

· **HIPPOCAMPUS** is organized by subtopics. If a subtopic has more
  than ~8 paragraphs, suggest splitting it.

· **MY NOTES** is working memory. If content has been referenced and
  validated across several conversations, suggest migrating it to
  HIPPOCAMPUS.

· **OPEN**: if a question has been unresolved for a long time or has
  lost relevance, suggest archiving or rephrasing it.

· If the entire CORTEX feels too large (over ~25,000 words), suggest
  splitting it into thematic sub-cortexes.

---

## 4 · let's start

Below is the CORTEX. Read it fully before answering my first question.
Briefly confirm that you received it correctly (what topics you detect,
how many subtopics HIPPOCAMPUS has) and then we're ready to talk.

---
"""


def generate_prompt_md(name: str, language: str = "es") -> str:
    template = PROMPT_EN if language == "en" else PROMPT_ES
    return template.format(name=name)


def combined_prompt_and_cortex(name: str, language: str, cortex_content: str) -> str:
    """Concat prompt + separator + cortex for the 'copy all' clipboard action."""
    prompt = generate_prompt_md(name, language)
    sep = "\n\n---\n\n"
    return prompt + sep + cortex_content
