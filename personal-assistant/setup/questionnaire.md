# Cuestionario inicial

> Responde estas preguntas en una sesión con Claude Code. El agente toma tus respuestas y puebla los archivos en `_config/`. Después de esto el asistente ya tiene contexto suficiente para correr los stages.
>
> No tienes que responderlo todo de una. Responde lo que sepas; los defaults llenan el resto.

---

## 1. Horarios y energía

1.1. ¿A qué hora despiertas y duermes en un día típico?
1.2. ¿Cuáles son tus 2–4 horas de deep work (sin interrupciones, máxima concentración)?
1.3. ¿Qué ventana del día prefieres para reuniones? ¿Qué días?
1.4. ¿Qué bloques son innegociables (almuerzo, ejercicio, familia)?
1.5. ¿A qué hora del día tienes más energía creativa? ¿Y la peor energía?

## 2. Prioridades y reglas

2.1. Lista tus 3 prioridades vitales en orden (ej: salud, pareja, trabajo).
2.2. Reglas duras (no negociables, nunca se rompen): ___
2.3. Reglas suaves (defaults, ajustables si hace falta): ___

## 3. Productividad

3.1. ¿Cuántos TODOs P1 (hoy) toleras antes de empezar a decir que no?
3.2. ¿Cómo decides cuando dos TODOs P1 compiten por el mismo tiempo? (impacto vs urgencia, etc.)
3.3. ¿Hay categorías de TODO que SIEMPRE postergan a otras? (ej: salud antes que trabajo)

## 4. Personas

4.1. Lista las personas que aparecen con frecuencia en tu día (familia cercana, socios, clientes recurrentes, equipo). Para cada una:
     - Nombre
     - Relación
     - Cómo prefieres contactarlas (whatsapp/mail/llamada)
     - Una frase de contexto

## 5. Voz

5.1. ¿Quieres que te trate de "tú" o de "usted"? (default: tú)
5.2. ¿Prefieres respuestas más breves o más explicadas? (default: breves)
5.3. ¿Algo que el asistente NUNCA debería hacer al hablarte? (ej: usar emojis, decir "claro!", etc.)

## 6. Vocabulario propio

6.1. Lista 5–15 términos/proyectos/lugares que uses seguido y que merecen estar en el glosario para que el agente los entienda sin que tengas que explicar cada vez.

## 7. Setup técnico (opcional, para más adelante)

7.1. ¿Tienes calendario que el asistente pueda leer? (Google Calendar, iCal, etc.) — para integración futura
7.2. ¿Email que el asistente debería poder leer/triagear? — para integración futura
7.3. ¿Notas existentes en algún lugar (Obsidian, Notion, Apple Notes)? — para importar a `shared/notes/`

---

Cuando termines, dile a Claude: *"toma estas respuestas y actualiza `_config/`"*. El agente edita `preferences.md`, `people.md`, `voice.md`, `glossary.md` con lo que diste y deja lo que no respondiste como `_por definir_`.
