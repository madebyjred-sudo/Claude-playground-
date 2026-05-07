# PROPUESTA TÉCNICA Y ECONÓMICA

## Asistente Conversacional Inteligente para el Ministerio del Poder Popular para Ciencia y Tecnología

**Preparado por:** Shift
**Fecha:** Mayo 2026
**Validez:** 30 días

---

## Resumen ejecutivo

El Ministerio del Poder Popular para Ciencia y Tecnología opera un ecosistema vivo de 27 entidades aliadas, decenas de programas activos, becas, planes nacionales, publicaciones científicas y comunicación institucional constante. El ciudadano que llega a mincyt.gob.ve hoy debe navegarlo manualmente para encontrar lo que necesita.

Esta propuesta presenta el desarrollo e implementación de un **asistente conversacional inteligente** que responde en lenguaje natural a cada visitante en su propio registro, conectándolo directamente con la oferta del Ministerio que le corresponde. Sin menús. Sin formularios. Sin que el ciudadano deba aprender la estructura administrativa para acceder a lo que el Estado le ofrece.

El asistente se construye íntegramente sobre **software libre**, en línea con la posición pública del Ministerio en FLISoL 2026, y bajo los principios del **Código de Ética para el Desarrollo y Aplicación Responsable de la Inteligencia Artificial** elaborado por la Dirección General de Desarrollo y Aplicación de IA (DGDAIA) del propio Ministerio.

---

## Posicionamiento estratégico

Esta no es solo una herramienta de servicio al ciudadano. El proyecto entrega tres activos institucionales al Ministerio:

**Implementación referencial del Código de Ética de IA.** El asistente se construye y opera bajo los nueve principios del Código publicado por el Ministerio. El Código no es una referencia que se consulta al final del proyecto: es **normativa de producción desde el día cero del desarrollo**, citada literalmente y mapeada a cada componente de la solución técnica.

**Manifestación concreta de soberanía digital.** El asistente corre 100% sobre software libre — modelo abierto, infraestructura abierta, código abierto. La elección del stack no es preferencia: es cumplimiento literal del principio de Ciencia Abierta del Código.

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

**Respuesta verificable y citada.** Cada respuesta del asistente referencia su fuente: programa, página oficial, documento institucional. El usuario nunca debe confiar a ciegas; siempre puede verificar. Esto materializa el principio de Transparencia del Código.

**Reconocimiento de límites.** Cuando una pregunta excede el alcance institucional o requiere atención humana especializada, el asistente lo dice con claridad y orienta al canal correcto. **No inventa, no rellena, no pretende saber lo que no sabe.** Política de "preferir el silencio honesto antes que inventar", embebida en la arquitectura del sistema.

**Memoria conversacional con privacidad por diseño.** El asistente mantiene contexto durante la conversación pero no almacena identidad ni traza al usuario más allá de lo necesario. Adherencia al principio de Privacidad del Código.

**Multimodalidad de entrada.** El asistente procesa contenido del Ministerio en sus múltiples formatos: texto del sitio, PDFs institucionales, transcripciones de los podcasts "Con Ciencia +Vida", documentos del Código de Ética, planes nacionales.

### Caso de uso ejemplificado

> **Usuario:** *"Hola, soy estudiante de biología en Mérida y me interesa la investigación sobre vectores. ¿Hay algo del ministerio que me sirva?"*
>
> **Asistente:** *"Sí. El Ministerio impulsa el Plan Nacional de Ciencia y Tecnología para el Control Integrado de Vectores, que articula investigación aplicada en este tema. Para tu perfil hay dos rutas concretas: (1) si querés sumarte a un equipo de investigación, podés registrarte en Recitven —el sistema del Oncti— y postular a la convocatoria abierta para mujeres científicas. (2) Si lo tuyo es seguir formándote primero, el Programa Nacional de Becas tiene línea para áreas estratégicas. ¿Querés que profundice en alguna? También puedo orientarte hacia la Fundacite Mérida, tu instancia regional."*

Esto es una conversación que el ciudadano hubiera tenido con un funcionario que conoce el aparato entero — algo prácticamente imposible de obtener en la práctica actual.

### Lo que el asistente NO hace en esta versión

- No ejecuta trámites (no postula, no inscribe, no firma)
- No accede a sistemas internos privados ni a datos personales de ciudadanos
- Solo texto en esta versión (la voz queda como evolución posterior)
- No reemplaza la atención humana — la complementa y reduce su carga en consultas rutinarias

---

## 2. Arquitectura técnica — software libre integral

### Stack tecnológico

| Componente | Tecnología | Naturaleza |
|---|---|---|
| Modelo de lenguaje | **Llama 4 Scout** (109B parámetros totales, 17B activos, contexto 10M tokens, multimodal nativo, español oficial) | Open-source, Meta |
| Modelo de respaldo | **Qwen 2.5 72B Instruct** | Open-source, Alibaba |
| Embeddings | **BGE-M3** (multilingüe nativo, 8K contexto) | Open-source, BAAI |
| Base de datos vectorial | **Qdrant** | Open-source, auto-hospedable |
| Backend | **Python / FastAPI** | Open-source |
| Widget | Componente JavaScript vanilla | Sin frameworks propietarios |
| Inferencia | API vía **OpenRouter** (acepta pago en USDT) ruteando a backend de DeepInfra | Auditable, sustituible |

### Topología de soberanía

| Componente | Dónde corre | Nivel de soberanía |
|---|---|---|
| Corpus institucional indexado | Servidor del Ministerio (CNTI/Cenditel) | Total |
| Vector DB con embeddings | Servidor del Ministerio | Total |
| Servicio de embeddings (BGE-M3) | Servidor del Ministerio | Total |
| Backend / lógica del asistente | Servidor del Ministerio | Total |
| Widget en mincyt.gob.ve | Mismo dominio del Ministerio | Total |
| Logs y métricas de uso | Servidor del Ministerio | Total |
| Inferencia LLM (vía OpenRouter) | API a proveedor de modelos abiertos | Auditable, sustituible |
| Proxy egress hacia API de inferencia | Instancia mínima fuera de Venezuela | Transparente, controlado |

### Por qué Llama 4 Scout

La elección del modelo no es genérica. Llama 4 Scout fue seleccionado tras verificar precios y disponibilidad al 7 de mayo de 2026 en seis proveedores (DeepInfra, OpenRouter, Together AI, Groq, Fireworks, Hugging Face). En DeepInfra el costo es **USD 0.08 por millón de tokens de entrada y USD 0.30 por millón de tokens de salida** — equivalente a **USD 0.00008 y USD 0.00030 por cada 1.000 tokens**, respectivamente — con context window de 10 millones de tokens, la más amplia de la industria, particularmente útil para RAG porque permite incluir contexto institucional extenso sin chunking agresivo. El modelo soporta español oficialmente, es multimodal nativo de texto e imagen, y supera en benchmarks públicos a alternativas comparables.

### Por qué OpenRouter como capa de pago

Los proveedores de inferencia LLM serios son entidades estadounidenses bajo políticas OFAC. OpenRouter resuelve la fricción de pago desde Venezuela aceptando criptomonedas (USDT) explícitamente, y rutea al backend de DeepInfra al mismo precio base. La cuenta se contrata directamente entre el Ministerio y OpenRouter, con saldo cargado en USDT por el Ministerio, sin intermediación del Proveedor.

### Proxy egress para acceso a la API

El backend corriendo en Venezuela puede tener geo-IP block hacia las APIs de inferencia. Para resolverlo de forma profesional, el sistema rutea las llamadas a la API a través de un **proxy egress mínimo** en Hetzner Brasil o Panamá (instancia de USD 5 a USD 7 mensuales), que actúa solo como puente saliente y **no almacena ningún dato**. Es transparente, está documentado y controlado, y resuelve el único punto de fricción geopolítica del proyecto.

---

## 3. Adherencia al Código de Ética de IA — los nueve principios

El Código de Ética para el Desarrollo y Aplicación Responsable de la Inteligencia Artificial elaborado por la DGDAIA del Ministerio establece nueve principios fundamentales. Cada uno se mapea a evidencia técnica concreta y verificable en el asistente:

**1. Inteligencia Artificial Humanista.** El asistente respeta la autonomía del ciudadano sin imponerle perfiles, opera como herramienta que amplía las capacidades humanas y deriva al canal humano del Ministerio cuando una consulta excede su alcance o requiere atención sensible. Evidencia: system prompt del asistente, reglas de derivación, política antialucinación.

**2. Equidad, Igualdad y No Discriminación.** Subconjunto del Conjunto de Casos de Prueba que valida queries de subgrupos diversos (mujeres, jóvenes, comunidades originarias, personas con discapacidad, lenguaje coloquial), registro adaptativo del asistente que respeta diversidad de perfiles, ausencia deliberada de mecanismos de segmentación. Evidencia: reporte de equidad sobre subconjuntos del Conjunto de Casos de Prueba.

**3. Responsabilidad Ambiental.** Modelo cuantizado (Llama 4 Scout en FP8) que reduce consumo energético, operación sin GPU del backend, caché semántico que evita inferencias innecesarias. Evidencia: ficha de footprint estimado del asistente.

**4. Seguridad.** Hardening del endpoint, controles contra prompt injection validados por subconjunto adversarial del Conjunto de Casos de Prueba, cifrado de datos en tránsito y reposo, anonimización de logs, plan documentado de gestión de incidentes que cubre los tres niveles que el Código establece (datos, modelo, infraestructura).

**5. Privacidad.** Minimización de datos por diseño, ausencia de almacenamiento de información personal identificable, mecanismo procedimental documentado para los derechos de acceso, rectificación, cancelación y oposición, aviso de privacidad visible al usuario antes de iniciar interacción.

**6. Transparencia.** El asistente cita la fuente institucional de cada respuesta sustantiva con enlace al documento oficial del Ministerio o al programa correspondiente; los logs de retrieval son auditables y permiten reconstruir por qué el asistente respondió lo que respondió ante cualquier consulta específica; existe canal de contraloría social materializado en un botón de "reportar respuesta incorrecta" disponible al ciudadano final.

**7. Rendición de Cuentas.** SLA de corrección por severidad, trazabilidad documentada de cada respuesta, supervisión humana siempre activa, cláusula explícita de que el asistente no sustituye decisiones formales del Ministerio.

**8. Ciencia Abierta.** El asistente se construye íntegramente sobre código abierto y software libre — Llama 4 Scout es open-source, Qdrant es open-source, FastAPI es open-source, BGE-M3 es open-source, todo el código del asistente se entrega al Ministerio bajo licencia que permite su revisión, modificación y mejora. **La elección del stack no fue preferencia: fue cumplimiento literal de este principio**, que el Código describe textualmente como: *"el código abierto y el software libre son pilares esenciales para garantizar la transparencia, la accesibilidad y la colaboración en el desarrollo de la inteligencia artificial"*.

**9. Excelencia.** Articulación con el ecosistema institucional venezolano (CENDIT, Cenditel, universidades nacionales como UCV, USB, ULA), transferencia de conocimiento al equipo del Ministerio mediante la capacitación incluida y la documentación técnica abierta, compromiso con benchmarks medibles y reproducibles.

### Disposición a auditoría externa

El Reporte de Adherencia al Código que se entrega al cierre del proyecto es un autoinforme estructurado con evidencia documental trazable principio por principio. **El Proveedor declara expresamente su disposición a someterse a auditoría externa por parte del tercero independiente que el Ministerio designe**, bajo la propia normativa del Código como marco evaluativo. Candidatos naturales: CENDIT (que elaboró la propuesta original del Código en 2024), Cenditel, una universidad nacional, o un auditor privado especializado. El Proveedor facilita todo el material técnico, la evidencia documental y el código fuente necesarios para esa auditoría sin costo de coordinación adicional para el Ministerio.

---

## 4. Cronograma — 10 semanas

| Semanas | Etapa | Qué pasa | Entregable |
|---|---|---|---|
| 1-2 | **Discovery institucional** | Sesiones con el Ministerio, mapeo del ecosistema, definición de tono institucional, recolección y validación del corpus, validación técnica de proveedor de inferencia, configuración de pago vía OpenRouter+USDT | Documento de alcance firmado, corpus consolidado, decisiones técnicas cerradas |
| 3-4 | **Construcción de la base de conocimiento** | Procesamiento del corpus completo (sitio, PDFs, transcripciones de podcasts, documentación del ecosistema aliado), indexación semántica con BGE-M3, primera versión del pipeline RAG funcionando | Demo interna funcionando contra el corpus real |
| 5-7 | **Asistente conversacional y experiencia** | Calibración del tono institucional, ejecución del Conjunto de Casos de Prueba (700 casos en 8 categorías), implementación del citado de fuentes, desarrollo del widget embebible | Asistente con tono validado por el Ministerio + widget listo |
| 8-9 | **Integración, QA y certificación** | Deploy en infraestructura del Ministerio, integración al sitio, ejecución final de las métricas RAGAS sobre el Conjunto de Casos de Prueba, validación adversarial, validación de adherencia al Código de Ética principio por principio | Asistente en staging + acta de certificación + Reporte de Adherencia |
| 10 | **Lanzamiento y handover** | Puesta en producción, documentación técnica completa, capacitación al equipo del Ministerio, desmonte del sistema temporal de QA | Asistente en vivo + equipo capacitado + documentación entregada |

**Posterior al lanzamiento:** 30 días de soporte y ajustes menores incluidos.

---

## 5. Garantías y SLA

### Garantía técnica de recursos de infraestructura

El Proveedor garantiza por escrito que la especificación de servidor declarada en esta propuesta — **4 a 8 vCPU, 16 a 32 GB de RAM, 100 GB SSD, sin GPU** — es técnicamente suficiente para operar la solución bajo las siguientes **Condiciones de Capacidad Garantizada**:

1. Corpus indexado de hasta 50.000 páginas equivalentes (hasta 500.000 fragmentos vectorizados).
2. Embeddings de dimensión menor o igual a 1.024.
3. Carga concurrente de hasta 500 sesiones en ventana de 15 minutos.
4. Inferencia LLM mediante API externa (no local en el servidor garantizado).
5. Configuración de Qdrant con almacenamiento mapeado en disco y quantización habilitada cuando aplique.

Si dentro de los 30 días posteriores a la puesta en producción se demuestra técnicamente — mediante métricas observables: utilización sostenida de CPU superior al 80% por más de 15 minutos, RAM superior al 90%, o latencia p95 sobre el SLA acordado — que la especificación es insuficiente **dentro de las Condiciones**, el Proveedor realiza el ajuste necesario a su costo (optimización o upgrade hasta el techo del rango: 8 vCPU / 32 GB RAM / 100 GB SSD), **sin cargo adicional alguno para el Ministerio**.

Quedan expresamente excluidos los escenarios que excedan las Condiciones de Capacidad Garantizada: corpus por encima de 50.000 páginas, embeddings de dimensión superior a 1.024, requerimientos de inferencia local con GPU, funcionalidades nuevas no contempladas en el alcance original, picos sostenidos mayores a 500 sesiones concurrentes. Estos casos se cotizan como evolución bajo acuerdo separado.

### Compromiso de calidad de respuestas

El Proveedor no garantiza un porcentaje único y absoluto de "precisión" sobre el universo total de consultas posibles, dado que ningún sistema de IA generativa puede ofrecerlo con honestidad técnica. En su lugar se compromete a alcanzar y sostener, sobre el Conjunto de Casos de Prueba acordado conjuntamente con el Ministerio antes del inicio de la fase de aceptación, los siguientes umbrales mínimos medidos con metodología RAGAS:

- **Faithfulness** (fidelidad al contexto recuperado): ≥ 0.85
- **Context Recall** (recuperación documental): ≥ 0.85
- **Answer Relevance** (pertinencia de respuesta): ≥ 0.85
- **Tasa de alucinaciones graves**: **0%** sobre el subconjunto crítico (programas, becas, convocatorias, requisitos formales, trámites)

Política de "preferir el silencio honesto antes que inventar": ante baja confianza, el asistente deriva al canal humano del Ministerio en lugar de generar respuesta especulativa.

### SLA de corrección por severidad (durante los 30 días post go-live)

| Severidad | Definición | Tiempo de corrección |
|---|---|---|
| **Crítica** | Información incorrecta sobre trámite vigente, convocatoria abierta, requisitos formales o que pueda inducir a error material al ciudadano | 24 horas hábiles |
| **Alta** | Información desactualizada o parcialmente errónea sobre programas activos | 72 horas hábiles |
| **Media** | Errores de redacción, tono o claridad sin afectar la corrección sustantiva | 5 días hábiles |
| **Baja** | Mejoras de estilo o pulido | Próxima ventana de mantenimiento |

Toda corrección queda documentada con trazabilidad de causa raíz y prueba de regresión sobre el Conjunto de Casos de Prueba.

### SLA de incidentes operativos (durante los 30 días post go-live)

- **Incidentes críticos** (servicio caído, sin respuesta a queries): respuesta en ≤ 4 horas hábiles, resolución en ≤ 24 horas hábiles.
- **Incidentes mayores** (degradación funcional, errores sistemáticos): respuesta en ≤ 1 día hábil, plan de mitigación en ≤ 72 horas.
- **Consultas operativas y dudas**: respuesta en ≤ 2 días hábiles.
- **Disponibilidad objetivo**: 99% medida sobre la ventana de 30 días.

---

## 6. Protocolo de QA y certificación

### Conjunto de Casos de Prueba (CCP)

700 casos distribuidos en ocho categorías:

| Categoría | Casos |
|---|---:|
| Programas y políticas activas del Mincyt | 150 |
| Becas y convocatorias vigentes | 120 |
| Trámites y requisitos formales | 100 |
| Ecosistema aliado (27 entidades) | 80 |
| Casos límite y ambigüedades | 70 |
| Manejo correcto de "no sé / fuera de alcance" | 70 |
| Registro adaptado a perfil de usuario | 60 |
| Pruebas adversariales (prompt injection, sesgo, lenguaje ofensivo) | 50 |
| **Total** | **700** |

El diseño y construcción del Conjunto, el harness de evaluación con métricas RAGAS, la ejecución de las corridas y la generación del dashboard de validación corren íntegramente por cuenta del Proveedor. **El peso operativo de la validación lo carga el Proveedor, no el Ministerio.**

### Mesa de Certificación Institucional del Mincyt

El Ministerio designa **tres referentes** con autoridad para validar la salida a producción, centrados en alcance de auditoría y no en horas de trabajo:

- **Referente de contenidos institucionales** — audita exactitud sustantiva de las respuestas sobre programas, becas, convocatorias y trámites; valida que ningún contenido contradice la posición oficial del Ministerio.
- **Referente técnico** designado por el Despacho del Viceministerio para el Desarrollo de las TIC o la Oficina de Tecnologías de Información — audita arquitectura, métricas, logs de retrieval y cumplimiento de la especificación técnica.
- **Referente de la DGDAIA** o equivalente — audita la adherencia operativa del asistente al Código de Ética principio por principio.

### Criterios de certificación previa a producción

La aprobación formal para el go-live requiere el cumplimiento simultáneo de cuatro criterios:

1. **Faithfulness ≥ 0.85** sobre el Conjunto.
2. **Cero alucinaciones graves** sobre las categorías de programas, becas y trámites.
3. **≥ 95% respuestas correctas** en la categoría de "no sé / fuera de alcance".
4. **Acta formal de certificación firmada** por la Mesa.

Sin los cuatro no hay go-live. La remediación necesaria queda **sin costo adicional** para el Ministerio.

### Sistema de QA temporal — el Ministerio no hereda una herramienta más

El sistema de evaluación que produce las métricas (Conjunto de Casos de Prueba, harness de RAGAS, scripts de corrida, dashboard de validación) opera como **instrumento de certificación temporal**: se construye, se usa para certificar el go-live, se entrega como evidencia firmada al Ministerio (en formato de reporte y dataset), y **se desmonta al cierre del proyecto**. El Ministerio no hereda una infraestructura permanente de evaluación que tenga que mantener, debuggear o actualizar. Si en el futuro decide implementar evaluación continua del asistente como práctica recurrente, esto queda como evolución cotizable bajo acuerdo separado.

---

## 7. Mantenimiento operativo y actualización del corpus

Qdrant y el stack del asistente son operacionalmente livianos. La solución cotizada le quita al Ministerio una carga operativa que en otro contexto demandaría personal especializado dedicado.

### Tareas automáticas (sin intervención humana)

- Backups diarios mediante snapshots con retención de 14 días
- Monitoreo continuo de CPU, RAM, disco y latencia con alertas a contactos del Ministerio
- Optimización interna del índice vectorial (rebuild HNSW y compactación de segmentos, ejecutado nativamente por Qdrant)
- Rotación de logs y renovación automática de certificados TLS
- Aplicación de parches de seguridad del sistema operativo (unattended-upgrades)

### Tareas operables por el Ministerio tras la capacitación de 4 horas

- Ingesta de contenido nuevo (programas, becas, convocatorias, documentos institucionales) mediante script de línea de comando documentado
- Upgrade de versión menor de Qdrant (reemplazo de imagen Docker con reinicio supervisado, paso a paso en runbook)
- Restauración desde snapshot ante incidente menor
- Verificación de estado del sistema y revisión de métricas

### Tareas que requieren criterio experto (cotizable como retainer opcional)

- Upgrades de versión mayor de Qdrant (con frecuencia anual o superior)
- Tuning fino de parámetros HNSW si las métricas degradan
- Re-indexaciones totales por cambio de modelo de embedder

### Modelos de actualización del corpus

Tres opciones según necesidad del Ministerio:

1. **Script CLI (incluido en el alcance cotizado).** Carpeta de archivos + ejecución de un comando documentado + capacitación cubierta en las 4 horas. Mínimo viable, transparente, auditable, completamente operable por el equipo del Ministerio post-handover.
2. **Panel administrativo web (cotizable como evolución).** Interfaz con autenticación que permite gestionar el corpus desde UI gráfica accesible para personal no-técnico. Estimado en 30-50 horas adicionales.
3. **Sincronización automática del CMS al pipeline RAG (cotizable como evolución).** Webhook del CMS del Ministerio dispara la re-ingesta automática cada vez que se publica contenido nuevo en mincyt.gob.ve. Estimado en 60-100 horas adicionales según el CMS de origen.

La recomendación para el alcance inicial es la Opción 1: minimiza desarrollo, maximiza control y queda completamente operable por el equipo del Ministerio tras la capacitación. Las opciones 2 y 3 quedan disponibles como evolución cuando el Ministerio lo decida.

---

## 8. Qué se requiere del Ministerio

El éxito del proyecto depende de que el Ministerio provea acceso e información que el asistente necesita para servir al ciudadano. Cada solicitud se traduce en mejor servicio público.

### A. Acceso a información — el corazón del asistente

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

**Acceso al ecosistema aliado:**

Para que el asistente cumpla su promesa de ser puerta única al ecosistema CTI, necesita conocer la oferta de las 27 entidades aliadas. Tres niveles de acceso, en orden de preferencia:

1. **API o feed estructurado** de cada entidad
2. **Autorización de extracción estructurada** de los sitios web de las aliadas
3. **Documentación institucional resumida** de cada aliada provista por el Ministerio

Lo realista: una mezcla de los tres según la madurez digital de cada entidad. Cenditel y CNTI pueden coordinar buena parte de esta articulación.

**Acceso a sistemas dinámicos:**

- Recitven (oncti.gob.ve) — endpoint de lectura para que el asistente conozca estado de convocatorias
- SAFID (Fidetel) — referencia para consultas sobre aporte trimestral
- Sistema de becas, si tiene catálogo digital

### B. Definición de identidad institucional

**Tono y voz:**

- Documentación de identidad institucional (misión, visión, valores)
- Ejemplos de comunicación oficial reciente (notas de prensa, mensajes oficiales, intervenciones públicas de la ministra)
- Lineamientos sobre temas que requieren respuesta cuidadosa o derivación obligatoria a canal humano

**Marcos normativos:**

- Adherencia al Código de Ética de IA (provisto por el Ministerio como documento base)
- Lineamientos de comunicación institucional vigentes
- Marco de protección de datos aplicable

### C. Punto único de contacto y Mesa de Certificación

**Una persona del Ministerio** con autoridad de decisión sobre tono, alcance y aprobaciones. No un comité — una persona designada formalmente. **Mesa de Certificación de tres referentes** según se detalla en la sección 6.

### D. Conexiones técnicas

- **Acceso para integrar el widget** en mincyt.gob.ve.
- **Servidor para el backend, vector DB y servicio de embeddings** (primera opción): infraestructura del Ministerio (CNTI / Cenditel / instancia interna), 4-8 vCPU, 16-32 GB RAM, 100 GB SSD, sin GPU.
- **Hetzner Cloud como segunda opción** explícita si la infraestructura del Ministerio no está lista al go-live.
- **Cuenta del Ministerio con OpenRouter** con saldo en USDT, configurada en semana 1.
- **Subdominio del Ministerio** para servir el widget (asistente.mincyt.gob.ve o similar).

### E. Disponibilidad institucional

- **2 sesiones semanales de 90 minutos** durante semanas 1-2 (discovery)
- **1 sesión semanal de 60 minutos** durante semanas 3-9 (revisión de avance)
- Disponibilidad de la Mesa de Certificación durante semanas 8-9
- Aprobación formal en hitos: alcance (semana 2), base de conocimiento funcional (semana 4), tono institucional validado (semana 7), staging aprobado (semana 9)

### F. Equipo para sostenibilidad post-lanzamiento

El Ministerio designa **una persona técnica o semi-técnica** que recibe la capacitación de 4 horas en semana 10 y se hace responsable de:

- Mantener el corpus actualizado (nuevas convocatorias, programas, noticias, publicaciones)
- Monitorear conversaciones y reportar problemas
- Administrar la cuenta de OpenRouter
- Coordinar evoluciones del asistente

**Idealmente, articulación con Cenditel** para sostenibilidad nacional del proyecto a largo plazo.

---

## 9. Inversión

**USD 14,500 — desarrollo completo, 10 semanas**

Incluye:

- Discovery institucional e ingesta del corpus completo (Ministerio + ecosistema aliado)
- Construcción de la base de conocimiento sobre stack 100% software libre
- Desarrollo del asistente conversacional con calibración de tono institucional y registros múltiples
- Conjunto de Casos de Prueba de 700 casos + harness de evaluación RAGAS (ejecución íntegra a cargo del Proveedor)
- Widget embebible en mincyt.gob.ve
- Integración y deploy en infraestructura del Ministerio
- Garantía técnica de recursos por escrito
- SLA de calidad y SLA de incidentes durante 30 días post go-live
- Reporte de Adherencia al Código de Ética con disposición a auditoría externa
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

### Stack y proveedores día 0+1

Tabla consolidada de cada componente operativo del asistente, con su proveedor, dónde corre y su costo mensual estimado en escenario base:

| Componente | Proveedor / Tecnología | Dónde corre | USD/mes |
|---|---|---|---|
| Inferencia LLM (Llama 4 Scout) | OpenRouter (saldo USDT) → backend DeepInfra | API externa | 12-45 |
| Backend FastAPI | Self-hosted (Python/FastAPI, open-source) | Servidor del Ministerio (1ª opción) / Hetzner CCX23 (2ª opción) | 0 / 27 |
| Base de datos vectorial | Qdrant self-hosted (open-source) | Mismo servidor del backend | 0 |
| Servicio de embeddings | BGE-M3 self-hosted (open-source) | Mismo servidor del backend | 0 |
| Almacenamiento del corpus | Sistema de archivos del servidor o MinIO local | Servidor del Ministerio | 0 |
| Monitoreo y observabilidad | Grafana + Prometheus + Loki self-hosted | Servidor del Ministerio | 0 |
| Backups | Replicación a almacenamiento institucional | Mincyt / Cenditel | 0 |
| Email transaccional (alertas) | SMTP institucional del Ministerio | Mincyt | 0 |
| Dominio y certificado SSL | Subdominio del Ministerio (asistente.mincyt.gob.ve) | Mincyt | 0 |
| Proxy egress (Venezuela → API LLM) | Instancia mínima en Hetzner Brasil o Panamá | Externo | 5-7 |
| **Total mensual mes 1** (con infraestructura del Ministerio) | | | **~17-19** |
| **Total mensual mes 12 al pico de adopción** | | | **~50-52** |

La única dependencia de proveedor externo recurrente es la **inferencia LLM vía OpenRouter**, contratada directamente por el Ministerio con saldo en USDT. El **proxy egress** es una instancia auxiliar mínima que solo actúa como puente saliente y no almacena ningún dato. Todo el resto del stack corre en infraestructura aportada por el Ministerio o de su ecosistema institucional (CNTI/Cenditel), reforzando soberanía digital y eliminando dependencias en planes comerciales que pudieran cambiar condiciones.

### Costos operativos posteriores

Una vez en producción, el asistente consume tokens de inferencia cada vez que un usuario interactúa. El Ministerio paga directamente al proveedor de inferencia (OpenRouter, vía saldo USDT). Sin intermediación del Proveedor, sin lock-in, sin facturación cruzada.

**Proyección a 12 meses con curva de adopción progresiva** (escenario base, deliberadamente holgada):

- **Mes 1:** ~USD 12 (8% de los visitantes consulta el asistente al inicio)
- **Mes 4:** ~USD 20 (la herramienta se establece, conversión 14%)
- **Mes 7:** ~USD 28 (uso consolidado, conversión 20%)
- **Mes 12:** ~USD 45 (asistente como puerta principal del sitio, conversión 25%)
- **Acumulado anual estimado:** USD 320-400

**Escenario alto-realista** (si el asistente se vuelve canal natural primario):

- **Pico mes 12:** ~USD 65 mensuales
- **Acumulado anual estimado:** USD 480-540

Esta proyección está calculada sobre tráfico real verificado de mincyt.gob.ve (78.000 visitas mensuales, según SimilarWeb abril 2026), conversión visita-a-consulta progresiva del 8% al 25% durante los 12 meses, 9.000 tokens IN + 1.250 tokens OUT por conversación promedio (2.5 turnos), Llama 4 Scout en DeepInfra a USD 0.08 IN / USD 0.30 OUT por millón de tokens. **Cada iteración (un turno usuario→asistente) cuesta aproximadamente USD 0.000438; cada conversación completa de 2.5 turnos cuesta aproximadamente USD 0.0011.**

### Arquitectura de control de gasto

El asistente nunca se cae por motivos económicos. La arquitectura opera en cuatro capas progresivas y el corte físico solo existe como última línea de defensa contra ataque o anomalía, no como mecanismo de control normal:

1. **Caché semántico** — reduce 30-40% del consumo real al servir respuestas a preguntas frecuentes desde memoria, sin invocar al modelo.
2. **Rate limiting inteligente** — 10 consultas por minuto y 50 diarias por usuario individual, CAPTCHA invisible ante patrones anómalos.
3. **Auto-recarga programada con tope mensual configurable** — el Ministerio define un tope (sugerido USD 100 inicial, ampliable), el sistema ejecuta auto-recarga cuando el saldo baja del umbral mínimo, hasta agotar el cupo mensual. Alertas tempranas a 60%, 80% y 95% del techo.
4. **Modo de degradación controlada** — si el consumo se acerca al tope, el sistema sirve solo respuestas cacheadas y muestra al usuario un mensaje cordial ("estamos atendiendo alta demanda, tu consulta puede demorar unos minutos"), manteniendo el servicio operativo.

**Dashboard ejecutivo en tiempo real** disponible al Ministerio, con consumo acumulado, proyección de cierre de mes y alertas tempranas.

### Costos operativos del stack completo

Bajo el escenario de infraestructura aportada por el Ministerio (recomendación primaria): **USD 12-45 mensuales según mes y nivel de adopción**, casi todo en inferencia más USD 5-7 mensuales del proxy egress.

Bajo el escenario alternativo Hetzner Cloud: agregar USD 27 mensuales por el VPS.

---

## 10. Lo que NO incluye (cotizable como evolución posterior)

- Capacidades de voz (entrada por dictado, salida por audio)
- Panel de administración con editor visual de respuestas
- Sincronización automática del CMS al pipeline RAG (60-100 horas adicionales según el CMS)
- Sistema de evaluación continua post go-live (auditoría recurrente con RAGAS)
- Auditoría externa independiente del Reporte de Adherencia al Código de Ética
- Soporte técnico extendido como retainer mensual
- Integración con sistemas transaccionales internos
- Escalamiento a otros ministerios u órganos del ecosistema CTI
- Migración a infraestructura de cómputo soberana (LLM corriendo en servidores del Estado venezolano)
- Integración con redes sociales para asistencia conversacional en otros canales

---

## 11. Supuestos y riesgos

**Supuestos:**

- El Ministerio provee el corpus en formatos procesables o autoriza su recolección.
- La infraestructura del Ministerio cumple los requerimientos descritos en la sección 8.D, o se contrata Hetzner Cloud como alternativa.
- Existe punto único de contacto y Mesa de Certificación con disponibilidad real durante el proyecto.
- OpenRouter mantiene la modalidad de pago en USDT vigente al momento de la firma.

**Riesgos:**

- Si el corpus está disperso entre las 27 entidades aliadas y la recolección requiere coordinación inter-institucional, las semanas 1-2 pueden extenderse — el extra se cotiza como addendum.
- Demoras del cliente en validaciones desplazan el cronograma proporcionalmente.
- Si OpenRouter o el modelo elegido cambian condiciones comerciales sustancialmente, se evalúan alternativas (impacto posible en costo operativo, no en desarrollo).
- Cambios de scope mayor (capacidades de voz, sistemas transaccionales, expansión a otros entes) requieren addendum.

---

## Cierre

El precio del desarrollo es modesto comparado con el activo institucional que queda. Los costos operativos están proyectados con holgura y blindados contra sorpresas mediante una arquitectura de control de gasto en cuatro capas. El handover deja al Ministerio con autonomía completa. La arquitectura permite evolución sin reescritura. La adherencia al Código de Ética es normativa de producción desde el día cero, no documento de cierre.

Esta propuesta tiene validez de 30 días desde su emisión. Quedamos atentos para coordinar firma y arranque.

**Shift**
