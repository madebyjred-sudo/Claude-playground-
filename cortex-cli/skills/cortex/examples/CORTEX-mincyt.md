# CORTEX: mincyt-asistente-ia

> Creado: 2026-05-17
> Última actualización: 2026-05-17
> Idioma: es
> Fuentes:
> - propuesta-mincyt.md (propuesta técnica y económica)
> - respuestas-mincyt.md (Q&A con el cliente)

---

## SINAPSIS · conceptos núcleo

- **Mincyt**: Ministerio del Poder Popular para Ciencia y Tecnología (Venezuela), cliente del proyecto
- **Asistente conversacional**: chatbot RAG embebido en sitio institucional, responde sobre documentos oficiales del ministerio
- **Stack libre**: requisito del cliente — todo el sistema debe correr sobre software de código abierto y proveedores afines a su política
- **OpenRouter**: gateway de LLMs que permite usar modelos open-source (Llama, DeepSeek, Qwen) sin lock-in a un proveedor cerrado
- **Cenditel**: centro tecnológico estatal venezolano, candidato a hostear la infraestructura
- **Base de conocimiento**: corpus de documentos del Mincyt (códigos de ética, normativas, reglamentos) sobre el que el asistente responde
- **Widget embebible**: pieza JS que el cliente puede inyectar en su sitio sin tocar arquitectura
- **Pago en USDT**: el cliente paga en cripto, lo cual condiciona la elección de proveedores

---

## HIPOCAMPO · memoria de hechos

### · alcance del proyecto

El proyecto incluye: discovery con cliente, procesamiento del corpus de documentos, pipeline RAG (chunking + embeddings + vector store), asistente conversacional, widget embebible, integración al sitio del Mincyt, QA, documentación, capacitación al equipo del cliente, y 30 días de soporte post-lanzamiento.

### · economía del proyecto

Cotizado al cliente en USD 14.500. Compensación a Juan Rojas (ejecución técnica fullstack, fuera de su rol de diseño) en USD 3.000 (100 horas × USD 30/h). Margen neto para Shift de USD 11.500 (79%). Pagos contra hitos alineados con cobros del cliente.

### · stack técnico decidido

Backend: Python + FastAPI. Vector store: ChromaDB local. Embeddings: BGE-M3 multilingüe (corre en CPU). LLM: vía OpenRouter, modelo configurable (Llama 4 Scout por default, Claude Haiku como opción). Frontend del widget: HTML+CSS+JS vanilla, sin framework.

### · cronograma

8 semanas calendario, repartidas: 2 semanas discovery + procesamiento de corpus, 3 semanas construcción del backend RAG, 2 semanas widget e integración, 1 semana QA + handover. Más 30 días de soporte post-lanzamiento.

### · restricciones del cliente

Todo el stack debe ser open-source. Sin servicios de US sancionables (descarta OpenAI directo). Hosting preferentemente en Cenditel. Pago en USDT cada 2 semanas por hito.

---

## CONEXIONES · cómo se relacionan

- **Stack libre** + **pago en USDT** se refuerzan: ambas restricciones empujan al uso de **OpenRouter** (que acepta crypto y modelos open-source) en vez de API directa de OpenAI o Anthropic.
- **Widget embebible** + **integración al sitio** son la misma pieza desde dos perspectivas: para el cliente es "lo pongo en mi web", para nosotros es "respetamos la arquitectura existente sin migración".
- **Base de conocimiento** y **asistente** son dos componentes con ciclos de vida distintos: la base se actualiza cuando el cliente cambia normativas; el asistente solo cuando cambia el modelo o el flujo de respuesta.
- La **compensación a Juan** es nominalmente "100 horas extra fullstack", pero estructuralmente es lo que cierra el conflicto entre su rol de diseño contratado y la ejecución técnica que el proyecto requiere.

---

## ABIERTAS · preguntas no resueltas

- ¿Cenditel realmente tiene capacidad para hostear el stack, o vamos a terminar en infraestructura cripto-friendly de terceros?
- ¿El cliente va a aceptar que el asistente diga "no sé" cuando el corpus no cubre la pregunta, o va a presionar por respuestas que el modelo sin contexto generaría?
- ¿Cómo manejamos actualizaciones del corpus en producción — re-indexing manual o pipeline automático?
- ¿La capacitación al equipo del cliente requiere docu técnica seria o basta con runbooks operativos?

---

## NOTAS PROPIAS · interpretaciones (no hechos)

> (vacío — se va a poblar cuando arranque el proyecto y aparezcan
> interpretaciones que no son hechos verificables todavía)
