# La filosofía del córtex

## ¿Por qué un córtex y no un prompt?

El prompt es la pregunta. El córtex es el cerebro que la responde.

Hace seis meses te pedíamos que aprendieras prompt engineering. Hoy ya
no es la pregunta — es el contexto. Lo que tu agente sabe sobre vos
vale más que cómo le hablás. Y lo que vos no documentaste, no existe
para él.

CORTEX es un cuaderno estructurado que cualquier IA puede leer como
memoria primaria. No es una app. Es un formato + una práctica + una
convención. Lo escribís en cualquier editor. Lo guardás en cualquier
Drive. Lo usás con cualquier IA.

## Las cinco capas

La estructura no es decorativa. Cada capa cumple un rol cognitivo
inspirado en la organización del cerebro humano.

### SINAPSIS · conceptos núcleo

Los términos y conceptos clave del dominio. Es el glosario operativo:
lo que la IA tiene que saber antes de empezar a responder. Definiciones
cortas, una línea por concepto.

### HIPOCAMPO · memoria de hechos verificables

Los hechos sólidos del dominio, organizados por subtemas. Es lo que la
IA puede afirmar sin caveat. Cada subtema es una unidad de memoria
explícita y citable.

### CONEXIONES · cómo se relacionan los conceptos

La red de relaciones entre conceptos. "X implica Y porque Z". "A
contradice B en contexto C". Esta capa crece con las conversaciones
porque las relaciones aparecen cuando preguntás cosas.

### ABIERTAS · preguntas no resueltas

Lo que todavía no está claro o no está cerrado. Es importante porque
le dice a la IA dónde es honesto decir "no sé". También es la lista
de tu propia investigación.

### NOTAS PROPIAS · interpretaciones (no hechos)

Tus lecturas personales del dominio. La IA las trata como interpretación,
no como hecho. Si una nota se confirma con tiempo y conversaciones, la
IA puede sugerir migrarla a HIPOCAMPO.

## El ciclo vivo

Cada conversación útil con tu IA puede mejorar el córtex. La IA, leyendo
las reglas del PROMPT.md, propone actualizaciones al final de su
respuesta en bloques estructurados. Vos copiás la respuesta, corrés
`cortex update`, CORTEX aplica los cambios.

El razonamiento sobre qué consolidar, qué podar, qué especializar lo
hace el LLM — porque eso requiere entender el contenido. CORTEX solo
es la mano que aplica.

## Las reglas de crecimiento (poda sináptica)

Un córtex que crece sin podarse se vuelve inútil. Las reglas que
CORTEX inyecta en el PROMPT son neurobiología aplicada:

- **SINAPSIS** no debería pasar de ~50 conceptos. Si lo supera, la IA
  sugiere consolidar.
- **HIPOCAMPO** se organiza por subtemas. Si un subtema tiene más de
  ~8 párrafos, se sugiere dividirlo.
- **NOTAS PROPIAS** es memoria de trabajo. Lo que se valida con varias
  conversaciones, migra a HIPOCAMPO.
- **ABIERTAS**: lo que no avanza en mucho tiempo, se archiva o reformula.
- Si el CORTEX completo pasa los ~25.000 palabras, la IA sugiere
  dividirlo en sub-córtex temáticos.

Eso es sinaptic pruning, consolidación de memoria y especialización
jerárquica — el cerebro humano hace lo mismo mientras dormís.

## División de roles

```
   USUARIO             CORTEX-CLI            LLM
   tira docs    →      parsea, estructura
                       guarda en Drive       
                ←      copia al clipboard

                                        →    conversa
                                             responde
                                             propone updates
                ←──────  copia respuesta ────

   cortex update →     parsea bloques
                       aplica al .md
                       versiona historial
                       Drive sincroniza
                ←      ✓ listo
```

CORTEX no decide qué entra al córtex. El LLM sí. CORTEX aplica.

## Anti-lock-in radical

- **Tu córtex es un archivo .md**. Lo abrís en Notes, Notepad,
  TextEdit, OneNote, Obsidian. Cualquier editor.
- **Vive en tu Drive.** Google, iCloud, Dropbox, OneDrive, local.
  Lo que vos elijas.
- **Funciona con cualquier IA.** Claude, ChatGPT, Gemini, llamada a
  API directa, modelo local. La que sea.
- **Si dejás de usar CORTEX, el córtex sigue funcionando.** Es texto
  plano. No hay servicio que mantener vivo.

Esa es la promesa.
