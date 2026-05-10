# Cómo actualizar tu córtex

CORTEX no decide qué cambiar — eso lo decide la IA con la que
conversás. CORTEX aplica esas decisiones cuando vuelven como
sugerencias.

## El flujo, paso a paso

1. **Conversás con tu IA** habiéndole pegado el `PROMPT.md` y el
   `CORTEX.md` al inicio.

2. **Al final de cada respuesta útil**, la IA puede agregar una
   sección `ACTUALIZACIONES SUGERIDAS AL CORTEX` con uno o más
   bloques estructurados.

3. **Copiás la respuesta entera de la IA** (incluyendo los bloques).

4. **Corrés `cortex update`** en tu terminal.

5. **CORTEX lee el portapapeles**, detecta los bloques, te muestra
   un resumen, te pregunta si aplicar.

6. **Confirmás con `Enter`**. CORTEX aplica los cambios al
   `CORTEX.md`, guarda el anterior en `historial/`, y tu Drive
   sincroniza solo.

## Si las sugerencias no aparecen

A veces la IA olvida agregar el bloque. Si querés forzar el
comportamiento, recordáselo en la conversación:

> "Recordá agregar la sección ACTUALIZACIONES SUGERIDAS AL CORTEX
> al final si detectás algo importante."

O simplemente pedíselo explícito:

> "¿Hay algo que valga la pena agregar al córtex después de esta
> conversación? Si sí, formatealo en los bloques que indica el
> PROMPT."

## Si el bloque tiene un error

CORTEX es tolerante con variaciones. Acepta:

- Tildes faltantes (`seccion` en lugar de `sección`)
- Caracteres de marco alternativos (`┌` en lugar de `╭`)
- Etiquetas en español o inglés indistintamente
- Líneas de continuación para `contenido:` largos

Si CORTEX no detecta tu bloque, probablemente le falta el campo
`cortex: <nombre>` en la primera línea, o el formato del marco está
muy distorsionado. Pegá la respuesta en un editor de texto, revisá
el bloque, y volvelo a intentar.

## Cómo se versiona

Cada vez que aplicás un update, CORTEX guarda el `CORTEX.md` anterior
en `historial/CORTEX-YYYY-MM-DD-HHMM.md`. Podés siempre volver a una
versión anterior copiando ese archivo de vuelta.

## Sobre la sincronización con Drive

Si guardaste tu córtex en Google Drive / iCloud / Dropbox / OneDrive,
los cambios se sincronizan automáticamente cuando CORTEX escribe el
archivo. No tenés que hacer nada. Tu córtex está disponible en otra
computadora o tu celular en cuestión de segundos.

## Ejemplo completo

```bash
$ cortex update
```

```
  ╔════════════════════════════════════════════════════════════╗
  ║  ACTUALIZAR CÓRTEX                                         ║
  ╚════════════════════════════════════════════════════════════╝

     ✓ detecté 3 actualizaciones en tu portapapeles

     córtex destino: el-codigo-de-etica-de-mincyt

     ·  SINAPSIS  ·  agregar     ·  "GraphRAG vs Vector RAG..."
     ·  HIPOCAMPO ·  modificar   ·  "Llama 4 · pricing actualizado..."
     ·  NOTAS PROPIAS · migrar   ·  "context window 10M tokens..."

     ¿aplicar las 3?

     [ENTER] sí · todas    [q] cancelar
```

Confirmás con `Enter`:

```
     ✓ aplicadas 3 actualizaciones
     ✓ backup en historial/CORTEX-2026-05-10-1427.md

     [o] abrir el córtex actualizado    [q] salir
```

Listo. Tu córtex creció de forma medida. La próxima conversación
arranca con el córtex mejorado.
