```
  ▒▒▒  CORTEX
  ▒▒▒  el cuaderno cognitivo · the cognitive notebook
```

> Tu córtex vive en tu Drive y crece con cada IA que usás.
> Your cortex lives in your Drive and grows with every AI you use.

**CORTEX-CLI** convierte cualquier conjunto de documentos (PDF, Word,
EPUB, texto plano, artículos de Wikipedia) en un **córtex estructurado**
que cualquier IA puede leer como su memoria primaria. Y cuando hablás
con esa IA, las sugerencias de actualización vuelven a tu córtex con
un solo comando.

Sin servidor. Sin API keys. Sin lock-in. Tu córtex en formato Markdown,
guardado en tu Drive, usable con Claude, ChatGPT, Gemini, lo que sea.

---

## Instalación · una línea

```bash
uvx cortex-cli
```

Eso es todo. [`uvx`](https://docs.astral.sh/uv/guides/tools/) descarga,
instala y ejecuta sin tocar tu sistema.

¿No tenés `uv` todavía? Instalalo en una línea:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

(En Windows: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`)

---

## Cómo se usa

### 1 · Crear un córtex

1. Tirá tus PDFs / Words / EPUBs / .txt en la carpeta `inbox/` que
   CORTEX te crea en tu Drive (la primera vez te pregunta cuál usar:
   Google Drive, iCloud, Dropbox, OneDrive, o local).
2. Corré `cortex` en tu terminal.
3. Elegí "crear un nuevo córtex", seleccioná los archivos, ponele
   nombre. CORTEX parsea, estructura y te genera dos archivos:
   - `CORTEX.md` — el córtex estructurado en cinco capas cognitivas.
   - `PROMPT.md` — las instrucciones para tu IA (cómo leer el córtex,
     cómo proponer actualizaciones, las reglas de crecimiento).

### 2 · Conversar con tu IA

Pulsá `c` en CORTEX para copiar **prompt + córtex** al portapapeles,
pegalo en Claude / ChatGPT / Gemini, empezá a preguntar.

O pulsá `o` para abrir la carpeta y arrastrar los `.md` directo a la UI
de tu IA (mejor para córtex grandes — algunas IAs parsean mejor archivos
adjuntos que texto pegado).

### 3 · Hacer crecer el córtex

Tu IA va a proponer actualizaciones al final de cada conversación útil
en bloques estructurados (`╭─ actualización ─╮ ... ╰─╯`). Copiá la
respuesta de tu IA, corré:

```bash
cortex update
```

CORTEX lee el portapapeles, detecta los bloques, los aplica al
`CORTEX.md`, versiona el anterior en `historial/`, y tu Drive sincroniza
solo. **Ningún razonamiento ocurre en CORTEX**: el LLM decide qué
actualizar, CORTEX aplica. División limpia.

---

## Las cinco capas del córtex

```
  ┌─────────────────────────────────────────────────────────┐
  │  SINAPSIS    · conceptos núcleo                         │
  │  HIPOCAMPO   · memoria de hechos verificables           │
  │  CONEXIONES  · cómo se relacionan los conceptos         │
  │  ABIERTAS    · preguntas no resueltas                   │
  │  NOTAS PROPIAS · interpretaciones (no hechos)           │
  └─────────────────────────────────────────────────────────┘
```

Cada capa cumple un rol cognitivo claro y la IA la respeta. Las dos
primeras se generan al crear el córtex. Las tres últimas crecen con
tus conversaciones.

---

## Estructura de archivos

```
  <tu Drive>/Cortex/
  ├── inbox/                              ← tirá documentos acá
  └── nombre-del-cortex/
      ├── CORTEX.md                       ← el córtex
      ├── PROMPT.md                       ← instrucciones para la IA
      ├── fuentes/                        ← copia de los originales
      └── historial/                      ← versiones anteriores
          ├── CORTEX-2026-05-10-1427.md
          └── ...
```

Como vive en tu Drive, podés:
- Acceder al córtex desde tu celular u otra computadora.
- Compartir un córtex completo enviando link de carpeta.
- Ver el historial de cómo creció.
- Llevarte tus archivos a otro servicio cuando quieras.

---

## Comandos disponibles

```bash
cortex                  # abre la TUI principal
cortex update           # va directo a aplicar updates desde el portapapeles
cortex browse           # va directo a la lista de córtex existentes
cortex --help           # ayuda
cortex --version        # versión
```

---

## Filosofía

CORTEX es **la mano que cuida un córtex**, no una IA en sí mismo.
La inteligencia que decide qué entra al córtex y cómo crece es del
LLM que vos uses. CORTEX solo:

1. Parsea documentos y los estructura en capas cognitivas.
2. Genera un PROMPT que enseña al LLM las reglas del juego.
3. Aplica las decisiones del LLM cuando vuelven como sugerencias.
4. Versiona y respalda en tu Drive.

División limpia. Cero lock-in. Cero costo recurrente. Tu córtex es tuyo.

Lee más: [`docs/filosofia-del-cortex.md`](docs/filosofia-del-cortex.md)

---

## Roadmap

- ✅ MVP: TUI ES/EN, parsers PDF/Word/EPUB/Wikipedia/texto, generación
       CORTEX.md + PROMPT.md, ciclo vivo con clipboard, Drive detection.
- [ ] v0.2: panel admin web opcional para córtex muy grandes.
- [ ] v0.3: `cortex watch` para procesar archivos de actualización
            desde una carpeta en background.
- [ ] v0.4: MCP server local para clientes compatibles
            (Claude Desktop, Cursor, Cline) — cierre de loop completo.
- [ ] v0.5: enriquecimiento opcional con LLM (sugerir SINAPSIS y
            CONEXIONES iniciales más ricos al crear el córtex).

---

## Contribuir

CORTEX es open-source bajo licencia MIT. Bug reports, ideas y pull
requests son bienvenidos en [GitHub](https://github.com/madebyjred-sudo/cortex-cli).

---

## Autor

Juan Manuel Rojas · 2026

```
                                                         
  ┌─────────────────────────────────────┐                
  │  CORTEX-{tema}.md                   │                
  │  (apple notes / drive / iCloud)     │                
  └────────────────┬────────────────────┘                
                   │                                     
                   │ pegás esto + el prompt              
                   ▼                                     
  ┌─────────────────────────────────────┐                
  │  cualquier IA (claude/gpt/gemini)   │                
  └─────────────────────────────────────┘                
                                                         
```
