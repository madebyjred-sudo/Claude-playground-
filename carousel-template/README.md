# Carrousel Template — Old London + Söhne

Sistema de diseño replicable para carrouseles editoriales tipo manifesto.
Mezcla blackletter (Old London) con grotesque moderna (Söhne / Figtree),
fondo crema, tinta navy, acento terracota y patrones decorativos pixel-art
como marca de agua.

## Estructura

```
carousel-template/
├── template.html      Estructura del documento (no editar para cambiar contenido)
├── style.css          Sistema de diseño (colores, tipografías, layout, patrones)
├── data.js            EDITA AQUÍ el contenido del carrousel
├── patterns.js        Generadores SVG de los 5 patrones decorativos
├── build.js           Renderiza con Playwright a PDF + PNGs
├── package.json       Deps (solo playwright)
├── fonts/             Coloca acá los archivos de fuentes (ver más abajo)
└── output/            Archivos generados (PDF + PNGs por página)
```

## Setup (una sola vez)

1. **Instalar dependencias:**
   ```bash
   cd carousel-template
   npm install
   npx playwright install chromium
   ```

2. **Colocar las fuentes** en `./fonts/`:

   - `old-london.ttf` — Old London (blackletter). Descarga: dafont.com / Steffmann.
   - `sohne-buch.otf` (Regular, peso 400) — opcional, si tenés licencia de Klim Type Foundry.
   - `sohne-kraftig.otf` (Bold, peso 600) — opcional.

   Si no tenés Söhne, el CSS cae automáticamente a **Figtree** (Google Fonts, gratis).
   Tampoco necesitas hacer nada — Figtree se carga vía `@import` en `style.css`.

## Editar el contenido

Abrí `data.js` y modificá el objeto `window.CAROUSEL`:

```js
window.CAROUSEL = {
  brand: "JR",                    // iniciales en header izquierdo
  date: "05·05·2026",             // header derecho. Usar bullet · (no - ni /)
  author: "Juan Manuel Rojas",    // nombre completo en página de cierre
  pages: [
    { type: "cover", headline: "...", aphorism: "...", pattern: "bars" },
    { type: "insight", label: "THE INSIGHT 01", headline: "...", body: "...",
      aphorism: "...", pattern: "blocks" },
    // ... más insights
    { type: "closer", headline: "¿...?", pattern: "bars" }
  ]
};
```

**Tipos de página:** `cover` | `insight` | `closer`
**Patrones disponibles:** `bars` | `blocks` | `diamonds` | `wireframe` | `arrow` | `none`

Para énfasis en bold dentro del body, usá `<strong>...</strong>`.

## Vista previa en navegador

```bash
npm run preview
```

Abre el template en `localhost:8080`. Recargá tras cambios en `data.js`.

> Si no querés instalar `http-server`, abrí `template.html` directamente en el navegador.
> En Chrome puede dar problemas de CORS con `file://`; en ese caso usá `npm run preview`.

## Generar PDF + PNGs

```bash
npm run build
```

Esto crea:
- `output/carousel.pdf` — PDF combinado, una página = una slide
- `output/page-01.png` ... `output/page-NN.png` — PNGs individuales 2160×2700 (2x DPR), listos para subir a LinkedIn como carrousel de imágenes

Variantes:
```bash
npm run build:pdf   # solo PDF
npm run build:png   # solo PNGs
```

## Sistema de diseño — referencia

### Paleta
- `--bg` `#E8DCBE` — fondo crema cálido
- `--ink` `#1B2C4F` — tinta navy (titulares y aforismos)
- `--accent` `#A0432B` — terracota (labels "THE INSIGHT 0X")
- `--watermark` `#C9C29A` — kaki desaturado (patrones decorativos)
- `--text` `#1A1A1A` — texto descriptivo

### Tipografías
- **Old London** (blackletter) — titulares + aforismos
- **Söhne / Figtree** (grotesque) — body, labels, header, footer

### Reglas para no romper el sistema
1. Una sola gótica + una sola sans. Nunca tres familias.
2. Tres colores en superficie máximo (fondo, tinta, acento). El kaki es watermark.
3. Los patrones nunca compiten con el titular: van detrás o al costado.
4. Cada slide = un insight. Headline + body corto + aforismo de cierre.
5. Header (`brand` + `date`) y footer (`NN / TT`) constantes en todas las páginas.
6. Cover y closer no llevan label ni paginación.

## Cambiar dimensiones

Por defecto son **1080 × 1350** (4:5, el formato moderno de carrousel LinkedIn).
Para cambiar a cuadrado 1080×1080, edita en `style.css`:

```css
:root {
  --page-w: 1080px;
  --page-h: 1080px;
}
```

Y en `build.js`:
```js
const PAGE_W = 1080;
const PAGE_H = 1080;
```

## Troubleshooting

- **Las fuentes no cargan** — verificar que los archivos existan en `./fonts/` con
  exactamente esos nombres. Si Söhne no está, debe usar Figtree automáticamente.
- **Los patrones se ven como cuadrados negros** — no se cargó `patterns.js` (revisar
  consola del navegador).
- **El PDF sale en blanco** — Playwright puede haber renderizado antes que las fuentes.
  El script ya espera `document.fonts.ready`, pero si persiste, agregá un
  `await page.waitForTimeout(2000);` antes del `page.pdf()`.
