# Reglas de crecimiento

Un córtex no se mide por su tamaño. Se mide por su utilidad. Las
reglas de crecimiento que CORTEX inyecta en el PROMPT.md son las
que mantienen al córtex utilizable a lo largo del tiempo.

## Por qué las reglas importan

Sin reglas, un córtex se infla. Cada conversación agrega cosas, nada
se poda, nada se consolida. En seis meses tenés un documento de cien
páginas que el LLM ya no procesa bien y vos ya no podés revisar.

Con reglas, un córtex tiene metabolismo. Crece, sí, pero también
consolida, también poda, también se especializa. Como un cerebro.

## Las reglas

### 1 · SINAPSIS no debería pasar de ~50 conceptos

Si lo supera, la IA sugiere consolidar conceptos similares.

Por ejemplo, si tenés `prompt`, `prompt engineering`, `prompting`,
`técnicas de prompt`, podrías consolidarlos en un solo concepto
`prompt (incluye técnicas y engineering)`.

### 2 · HIPOCAMPO se organiza por subtemas. Cada subtema, ~8 párrafos máximo

Si un subtema crece más de eso, la IA sugiere dividirlo en sub-subtemas.

Por ejemplo, si en HIPOCAMPO tenés un subtema `Llama 4` que llegó a
quince párrafos, sugerirá dividirlo en `Llama 4 · arquitectura`,
`Llama 4 · pricing`, `Llama 4 · benchmarks`.

### 3 · NOTAS PROPIAS es memoria de trabajo, no permanente

Lo que aparece varias veces en NOTAS PROPIAS y se valida con
investigación o conversación, debería migrar a HIPOCAMPO. Lo que se
queda en NOTAS PROPIAS sin validarse, eventualmente se archiva.

### 4 · ABIERTAS también se podan

Si una pregunta lleva mucho tiempo sin avances, la IA sugiere
archivarla o reformularla. Las preguntas abiertas que no se trabajan
contaminan el córtex con ruido.

### 5 · Si el CORTEX pasa ~25.000 palabras, dividir

Cuando un córtex se vuelve demasiado grande, la IA sugiere dividirlo
en sub-córtex temáticos. Por ejemplo, un `CORTEX-mincyt.md` de 30K
palabras podría dividirse en `CORTEX-mincyt-tecnico.md`,
`CORTEX-mincyt-politico.md`, `CORTEX-mincyt-historico.md`.

## Cómo se ven las sugerencias en la respuesta de la IA

Al final de cada respuesta donde la IA detecta una oportunidad de
mejora, agrega bloques como este:

```
╭─ actualización ─────────────────────────────────────╮
│ cortex:    el-codigo-de-etica
│ sección:   SINAPSIS
│ acción:    agregar
│ contenido: Llama 4 Scout · modelo MoE de 109B params (17B activos),
│            context window de 10M tokens, multimodal nativo.
│ ubicación: al final
│ por qué:   concepto que apareció varias veces en esta conversación
╰─────────────────────────────────────────────────────╯
```

Vos copiás la respuesta entera (incluyendo estos bloques), corrés
`cortex update`, y CORTEX aplica los cambios.

## Cuándo NO crece el córtex

- Cuando tu IA detecta que no hay nada nuevo que valga la pena
  registrar, no agrega bloques. La conversación pasa pero el córtex
  no cambia.
- Cuando la sugerencia es marginal. La IA tiene instrucción explícita
  de "no forzar actualizaciones para parecer útil".
- Una conversación promedio genera entre 0 y 3 actualizaciones, no más.

## El ciclo vivo en una imagen

```
   conversación útil
         ↓
   IA propone updates en bloques
         ↓
   vos copiás la respuesta
         ↓
   cortex update (lee del clipboard)
         ↓
   CORTEX aplica + versiona historial
         ↓
   Drive sincroniza
         ↓
   próxima conversación arranca con el córtex mejorado
```

Así crece bien.
