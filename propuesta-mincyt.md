# PROPUESTA TÉCNICA Y ECONÓMICA

## Asistente Conversacional Inteligente para el Ministerio del Poder Popular para Ciencia y Tecnología

**Preparado por:** Shift
**Fecha:** Mayo 2026
**Validez:** 30 días

---

## Resumen ejecutivo

El Ministerio del Poder Popular para Ciencia y Tecnología opera un ecosistema vivo de 27 entidades aliadas, decenas de programas activos, becas, planes nacionales, publicaciones científicas y comunicación institucional constante. El ciudadano que llega a mincyt.gob.ve hoy debe navegarlo manualmente para encontrar lo que necesita.

Esta propuesta presenta el desarrollo e implementación de un **asistente conversacional inteligente** que responde en lenguaje natural a cada visitante en su propio registro, conectándolo directamente con la oferta del Ministerio que le corresponde. Sin menús. Sin formularios. Sin que el ciudadano deba aprender la estructura administrativa para acceder a lo que el Estado le ofrece.

El asistente se construye íntegramente sobre **software libre**, en línea con la posición pública del Ministerio en FLISoL 2026, y bajo los principios del **Código de Ética de Inteligencia Artificial de la República Bolivariana** publicado por el propio Ministerio en 2026.

---

## Posicionamiento estratégico

Esta no es solo una herramienta de servicio al ciudadano. El proyecto entrega tres activos institucionales al Ministerio:

**Implementación referencial del Código de Ética de IA.** El asistente se construye y opera bajo los principios del Código publicado por el Ministerio. Demostración pública de que el Estado venezolano practica lo que normativiza.

**Manifestación concreta de soberanía digital.** El asistente corre 100% sobre software libre — modelo abierto, infraestructura abierta, código abierto. Sin dependencia de proveedores propietarios extranjeros.

**Puerta unificada al ecosistema científico-tecnológico nacional.** El asistente conoce y articula la oferta de las 27 entidades aliadas — Fonacit, Oncti, IVIC, Cenditel, Cantv, ABAE, Idea, Infocentro, Fundacite y demás — convirtiéndose en el primer punto de contacto inteligente con todo el aparato CTI del país.

---

## 1. Qué hará el asistente

### Capacidades centrales

**Conversación natural en múltiples registros.** El asistente identifica el perfil del usuario por su forma de escribir y adapta la respuesta. Un investigador recibe respuesta técnica con referencias a publicaciones. Un estudiante recibe respuesta accesible con pasos concretos. Un agricultor recibe respuesta directa orientada a acción. Misma información subyacente, registros adaptados.

**Cobertura completa del ecosistema institucional.** El asistente comprende y articula:

- Los programas nacionales activos (Plan Nacional del Cacao, Plan Cayapa Heroica, Alianza Científico-Campesina, Plan Nacional de Ciencia y Tecnología para el Control Integrado de Vectores, Programa Nacional Semilleros Científicos)
- El Programa Nacional de Becas
- Las convocatorias activas de investigación, incluida la convocatoria de 1.700 proyectos liderados por mujeres científicas
- Los servicios de las 27 entidades aliadas y cómo acceder a cada una
- Las publicaciones científicas, podcasts y noticias institucionales
- Los ejes de gestión del Ministerio

**Respuesta verificable y citada.** Cada respuesta del asistente referencia su fuente: programa, página oficial, documento institucional. El usuario nunca debe confiar a ciegas; siempre puede verificar.

**Reconocimiento de límites.** Cuando una pregunta excede el alcance institucional o requiere atención humana especializada, el asistente lo dice con claridad y orienta al canal correcto. **No inventa, no rellena, no pretende saber lo que no sabe.** Este principio — central en el Código de Ética de IA — se implementa explícitamente en la arquitectura del sistema.

**Memoria conversacional con privacidad por diseño.** El asistente mantiene contexto durante la conversación pero no almacena identidad ni traza al usuario más allá de lo necesario. Adherencia al principio de minimización de datos.

**Multimodalidad de entrada.** El asistente procesa contenido del Ministerio en sus múltiples formatos: texto del sitio, PDFs institucionales, transcripciones de los podcasts "Con Ciencia +Vida", documentos del Código de Ética, planes nacionales.

### Caso de uso ejemplificado

> **Usuario:** *"Hola, soy estudiante de biología en Mérida y me interesa la investigación sobre vectores. ¿Hay algo del ministerio que me sirva?"*
>
> **Asistente:** *"Sí. El Ministerio impulsa el Plan Nacional de Ciencia y Tecnología para el Control Integrado de Vectores, que articula investigación aplicada en este tema. Para tu perfil hay dos rutas concretas: (1) si querés sumarte a un equipo de investigación, podés registrarte en Recitven —el sistema del Oncti— y postular a la convocatoria abierta para mujeres científicas. (2) Si lo tuyo es seguir formándote primero, el Programa Nacional de Becas tiene línea para áreas estratégicas. ¿Querés que profundice en alguna? También puedo orientarte hacia la Fundacite Mérida, tu instancia regional."*

Esto es una conversación que el ciudadano hubiera tenido con un funcionario que conoce el aparato entero — algo prácticamente imposible de obtener en la práctica actual.

### Adherencia al Código de Ética de IA

El asistente implementa de forma visible y auditable los principios del Código:

- **Transparencia:** cita fuente en cada respuesta sustantiva
- **Explicabilidad:** puede explicar por qué entregó determinada respuesta
- **No discriminación:** validado contra perfiles diversos en QA estructurado
- **Privacidad por diseño:** minimización de datos, sin perfilamiento del usuario
- **Supervisión humana:** el equipo del Ministerio puede revisar conversaciones, ajustar corpus y corregir comportamiento
- **Soberanía tecnológica:** stack libre, conocimiento residente en infraestructura nacional

### Lo que el asistente NO hace en esta versión

- No ejecuta trámites (no postula, no inscribe, no firma)
- No accede a sistemas internos privados ni a datos personales de ciudadanos
- Solo texto en esta versión (la voz queda como evolución posterior)
- No reemplaza la atención humana — la complementa y reduce su carga en consultas rutinarias

---

## 2. Arquitectura técnica — software libre integral

### Principios

- **Modelos 100% open-source.** Familia Llama, Qwen, Mistral o equivalentes. Auditables, sustituibles, sin dependencia de un proveedor único.
- **Inferencia vía proveedores accesibles.** Hugging Face Inference API u OpenRouter en su rama de modelos abiertos, según validación de acceso desde Venezuela en semana 1. La arquitectura permite migrar a infraestructura de cómputo soberana en el futuro sin reescribir el sistema.
- **Infraestructura propia del Ministerio.** La base de conocimiento, el motor RAG, el widget y el backend corren en infraestructura del Ministerio o de Cenditel/CNTI. **El conocimiento institucional no sale del país.**
- **Vector DB:** Qdrant (open-source, auto-hospedable).
- **Backend:** Python/FastAPI (open-source).
- **Widget:** componente JS embebible vanilla, sin frameworks propietarios.

### Topología de soberanía

| Componente | Dónde corre | Nivel de soberanía |
|---|---|---|
| Corpus institucional indexado | Servidor del Ministerio | Total |
| Vector DB con embeddings | Servidor del Ministerio | Total |
| Backend / lógica del asistente | Servidor del Ministerio | Total |
| Widget en mincyt.gob.ve | Mismo dominio del Ministerio | Total |
| Inferencia LLM | API a proveedor de modelos abiertos | Auditable, sustituible |
| Logs y métricas de uso | Servidor del Ministerio | Total |

---

## 3. Cronograma — 10 semanas

| Semanas | Etapa | Qué pasa | Entregable |
|---|---|---|---|
| 1-2 | **Discovery institucional** | Sesiones con el Ministerio, mapeo del ecosistema, definición de tono institucional, recolección y validación del corpus, validación técnica de proveedor de inferencia | Documento de alcance firmado, corpus consolidado, decisiones técnicas cerradas |
| 3-4 | **Construcción de la base de conocimiento** | Procesamiento del corpus completo (sitio, PDFs, transcripciones de podcasts, documentación del ecosistema aliado), indexación semántica, primera versión del pipeline RAG funcionando | Demo interna funcionando contra el corpus real |
| 5-7 | **Asistente conversacional y experiencia** | Calibración del tono institucional, pruebas masivas (más de 500 consultas reales simuladas en distintos perfiles), implementación del citado de fuentes, desarrollo del widget embebible | Asistente con tono validado por el Ministerio + widget listo |
| 8-9 | **Integración y QA** | Deploy en infraestructura del Ministerio, integración al sitio, QA exhaustivo con equipo de validación, pruebas con casos límite, validación de adherencia al Código de Ética | Asistente en staging + reporte de QA + reporte de adherencia ética |
| 10 | **Lanzamiento y handover** | Puesta en producción, documentación técnica completa, capacitación al equipo del Ministerio | Asistente en vivo + equipo capacitado + documentación entregada |

**Posterior al lanzamiento:** 30 días de soporte y ajustes menores incluidos.

---

## 4. Qué se requiere del Ministerio

El éxito del proyecto depende de que el Ministerio provea acceso e información que el asistente necesita para servir al ciudadano. Cada solicitud está pensada en términos de **qué experiencia recibe el usuario final** — no se solicita nada que no se traduzca en mejor servicio público.

### A. Acceso a información — el corazón del asistente

El asistente es tan bueno como el corpus que lo alimenta. La calidad y cobertura del corpus equivalen a la calidad y cobertura del servicio al ciudadano.

**Acceso a contenido del sitio mincyt.gob.ve:**

- API REST si existe (la metadata del sitio sugiere disponibilidad de TEC API v1)
- En su defecto, autorización para extracción estructurada del sitio completo
- Acceso al CMS para identificar contenido próximamente actualizable

**Acceso a documentos institucionales:**

- Código de Ética de IA de la República Bolivariana, como referencia normativa del asistente
- Planes nacionales en formato PDF (Cacao, Cayapa Heroica, Vectores, Alianza Científico-Campesina, Semilleros Científicos)
- Memorias institucionales recientes
- Documentación del Programa Nacional de Becas
- Bases de convocatorias activas
- Publicaciones científicas indexadas en el sitio

**Acceso a contenido multimedia:**

- Transcripciones, o autorización para generar transcripciones, de los 7 episodios del podcast "Con Ciencia +Vida"
- Archivo de noticias del sitio, idealmente cubriendo los últimos 12-24 meses

**Acceso al ecosistema aliado — clave del valor diferencial:**

Para que el asistente cumpla su promesa de ser puerta única al ecosistema CTI, necesita conocer la oferta de las 27 entidades aliadas. Tres niveles de acceso, en orden de preferencia:

1. **API o feed estructurado** de cada entidad (Fonacit, Oncti, IVIC, Cenditel, CNTI, Cantv, ABAE, Idea, Infocentro, Fundacite, Fidetel, Fiiidt, INZIT, IVIC, ACAV, CNTQ, CIDATA, CENDIT, CENVIH, CIEPE, Codecyt, Conati, Movilnet, SUSCERTE, Telecom Venezuela, Telecomunicaciones Gran Caribe, Industria Canaima)
2. **Autorización de extracción estructurada** de los sitios web de las aliadas
3. **Documentación institucional resumida** de cada aliada provista por el Ministerio

Lo realista: una mezcla de los tres según la madurez digital de cada entidad. Cenditel y CNTI pueden coordinar buena parte de esta articulación.

**Acceso a sistemas dinámicos:**

- Recitven (oncti.gob.ve) — registro de proyectos: idealmente endpoint de lectura para que el asistente conozca estado de convocatorias
- SAFID (Fidetel) — referencia para consultas sobre aporte trimestral
- Sistema de becas, si tiene catálogo digital
- Otros sistemas dinámicos del ecosistema según se identifiquen en discovery

### B. Definición de identidad institucional

**Tono y voz:**

- Documentación de identidad institucional (misión, visión, valores) — parcialmente disponible en /quienes-somos
- Ejemplos de comunicación oficial reciente que reflejen el registro deseado: notas de prensa, mensajes oficiales, intervenciones públicas de la ministra
- Lineamientos sobre temas que requieren respuesta cuidadosa o derivación obligatoria a canal humano

**Marcos normativos a respetar:**

- Adherencia al Código de Ética de IA (provisto por el Ministerio como documento base)
- Lineamientos de comunicación institucional vigentes
- Marco de protección de datos aplicable

### C. Punto único de contacto y validación

**Una persona del Ministerio** con autoridad de decisión sobre tono, alcance y aprobaciones. No un comité — una persona designada formalmente. Esto evita que la voz del asistente termine siendo una negociación interna.

**Equipo de validación de 3 a 4 personas** que prueben respuestas en semanas 5-7. Composición sugerida:

- 1 persona de comunicaciones
- 1 persona de un área sustantiva (ej. Despacho del Viceministerio de Investigación)
- 1 persona de un programa específico (ej. Programa de Becas u Oncti)
- 1 persona técnica de Cenditel o CNTI, para validar adherencia al stack libre

### D. Conexiones técnicas

- **Acceso para integrar el widget** en mincyt.gob.ve (acceso al tema WordPress o coordinación con quien lo administra)
- **Servidor para el backend y vector DB.** Especificaciones modestas: 4-8 vCPU, 16-32 GB RAM, 100 GB SSD. **No se requiere GPU.** Las especificaciones exactas se entregan en semana 1.
- **Cuenta del Ministerio con el proveedor de inferencia LLM elegido en semana 1** (Hugging Face Inference, OpenRouter o equivalente). El consumo de tokens del asistente en producción se factura directamente al Ministerio por el proveedor seleccionado.
- **Acceso a ambiente de staging** del sitio si existe, antes de tocar producción.

### E. Disponibilidad y compromisos de tiempo

- **2 sesiones semanales de 90 minutos** durante semanas 1-2 (discovery)
- **1 sesión semanal de 60 minutos** durante semanas 3-9 (revisión de avance)
- **Disponibilidad del equipo de validación** durante semanas 5-7 para probar y dar feedback (estimado 5h/semana por validador)
- **Aprobación formal en hitos:** alcance (semana 2), base de conocimiento funcional (semana 4), tono institucional validado (semana 7), staging aprobado (semana 9)

### F. Equipo para sostenibilidad post-lanzamiento

El asistente es un activo vivo: requiere mantenimiento del corpus, monitoreo de calidad, ajustes ante nuevas convocatorias o programas. El Ministerio designa:

- **1 persona técnica o semi-técnica** que recibe la capacitación en semana 10 y se hace responsable de:
    - Mantener el corpus actualizado (nuevas convocatorias, programas, noticias, publicaciones)
    - Monitorear conversaciones y reportar problemas
    - Administrar la cuenta del proveedor de inferencia
    - Coordinar evoluciones del asistente

- **Idealmente, articulación con Cenditel** para sostenibilidad nacional del proyecto a largo plazo.

---

## 5. Inversión

**USD 14,500 — desarrollo completo, 10 semanas**

Incluye:

- Discovery institucional e ingesta del corpus completo (Ministerio + ecosistema aliado)
- Construcción de la base de conocimiento sobre stack 100% software libre
- Desarrollo del asistente conversacional con calibración de tono institucional y registros múltiples
- Pruebas masivas durante el desarrollo (cubiertas íntegramente por Shift, sin costo para el Ministerio)
- Widget embebible en mincyt.gob.ve
- Integración y deploy en infraestructura del Ministerio
- QA exhaustivo con equipo de validación
- Reporte de adherencia al Código de Ética de IA
- Documentación técnica completa
- Capacitación de 4 horas al equipo del Ministerio
- 30 días de soporte y ajustes menores post-lanzamiento

**Forma de pago:**

| Hito | Monto | Cuándo |
|---|---|---|
| Firma del contrato — arranque de discovery | USD 4,350 (30%) | Inicio |
| Cierre de semana 5 — base de conocimiento operativa | USD 4,350 (30%) | Mes 1.5 |
| Cierre de semana 8 — asistente integrado en staging | USD 4,350 (30%) | Mes 2 |
| Handover final — producción y capacitación | USD 1,450 (10%) | Mes 2.5 |

### Costos operativos posteriores (no incluidos)

Una vez el asistente está en producción, consume tokens de inferencia cada vez que un usuario interactúa. **Estos costos los paga el Ministerio directamente al proveedor de inferencia** elegido en semana 1. Sin intermediación de Shift, sin lock-in, sin facturación cruzada.

Estimaciones referenciales para un sitio gubernamental:

- **Tráfico moderado:** USD 50-200/mes
- **Tráfico alto:** USD 300-800/mes
- **Hosting de backend + vector DB:** USD 30-80/mes adicionales según el proveedor elegido

Esto da al Ministerio costos predecibles y controlables, sin sorpresas y sin dependencia comercial post-entrega.

---

## 6. Lo que NO incluye (cotizable como evolución posterior)

- Capacidades de voz (entrada por dictado, salida por audio)
- Panel de administración con editor visual de respuestas
- Integración con sistemas transaccionales internos
- Soporte continuo más allá de los 30 días incluidos
- Escalamiento a otros ministerios u órganos del ecosistema CTI
- Migración a infraestructura de cómputo soberana (LLM corriendo en servidores del Estado venezolano)
- Integración con redes sociales para asistencia conversacional en otros canales

---

## 7. Supuestos y riesgos

**Supuestos sobre los que se basa esta propuesta:**

- El Ministerio provee el corpus en formatos procesables o autoriza su recolección
- La infraestructura del cliente cumple los requerimientos descritos en la sección 4.D
- Existe punto único de contacto con disponibilidad real durante el proyecto
- El proveedor de inferencia elegido es accesible desde Venezuela (validación obligatoria en semana 1)

**Riesgos identificados:**

- Si el corpus está disperso entre las 27 entidades aliadas y la recolección requiere coordinación inter-institucional, las semanas 1-2 pueden extenderse — se cotiza el extra como addendum si así se decide
- Demoras del cliente en validaciones desplazan el cronograma proporcionalmente
- Si la accesibilidad del proveedor de inferencia desde Venezuela presenta restricciones, se evalúan alternativas (impacto posible en latencia o costo operativo, no en desarrollo)
- Cambios de scope mayor (capacidades de voz, sistemas transaccionales, expansión a otros entes) requieren addendum

---

## Cierre

El precio del desarrollo es modesto comparado con el activo institucional que queda. La conversación de costos operativos es transparente y razonable. El handover deja al Ministerio con autonomía completa. La arquitectura permite evolución sin reescritura.

Esta propuesta tiene validez de 30 días desde su emisión. Quedamos atentos para coordinar firma y arranque.

**Shift**
