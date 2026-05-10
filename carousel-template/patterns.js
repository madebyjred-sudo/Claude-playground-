// Generadores de patrones decorativos. Cada función devuelve un string SVG.
// Se usan como "marca de agua" detrás/al lado del titular.

(function () {
  // RNG seeded para que los patrones sean estables entre renders
  function seedRandom(seed) {
    let s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  // PATRÓN 1 — Barras verticales pixeladas (audio waveform / equalizer)
  function bars(seed = 7) {
    const rand = seedRandom(seed);
    const W = 480, H = 800;
    const cols = 9;
    const colW = 16;
    const gap = 36;
    const pixSize = 14;
    const pixGap = 6;
    const startX = 0;

    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMid meet">`;
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (colW + gap);
      // Cada columna tiene una "altura" propia (cantidad de pixels)
      const totalPix = Math.floor(rand() * 28) + 14;
      // Algunas columnas con "huecos" (gaps internos)
      const gapsAt = new Set();
      const gapCount = Math.floor(rand() * 4);
      for (let g = 0; g < gapCount; g++) {
        gapsAt.add(Math.floor(rand() * totalPix));
      }
      const colCenter = H / 2;
      const stackHeight = totalPix * (pixSize + pixGap);
      const startY = colCenter - stackHeight / 2;
      for (let p = 0; p < totalPix; p++) {
        if (gapsAt.has(p)) continue;
        const y = startY + p * (pixSize + pixGap);
        svg += `<rect x="${x}" y="${y}" width="${colW}" height="${pixSize}" />`;
      }
    }
    svg += `</svg>`;
    return svg;
  }

  // PATRÓN 2 — Bloques rectangulares pixelados (composición tipográfica)
  function blocks(seed = 11) {
    const rand = seedRandom(seed);
    const W = 360, H = 380;
    const pix = 12;
    const cols = Math.floor(W / (pix + 2));
    const rows = Math.floor(H / (pix + 2));

    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMid meet">`;
    // Construyo "letras" pixeladas: 3 bloques sólidos rectangulares con huecos
    const blocksDef = [
      { x: 0, y: 0, w: 8, h: 10 },
      { x: 10, y: 2, w: 6, h: 14 },
      { x: 18, y: 0, w: 4, h: 12 },
    ];
    for (const b of blocksDef) {
      for (let r = 0; r < b.h; r++) {
        for (let c = 0; c < b.w; c++) {
          if (rand() < 0.18) continue; // huecos aleatorios
          const x = (b.x + c) * (pix + 2);
          const y = (b.y + r) * (pix + 2);
          svg += `<rect x="${x}" y="${y}" width="${pix}" height="${pix}" />`;
        }
      }
    }
    svg += `</svg>`;
    return svg;
  }

  // PATRÓN 3 — Grilla de rombos / diamantes
  function diamonds() {
    const W = 400, H = 360;
    const size = 70;
    const cols = Math.ceil(W / size) + 1;
    const rows = Math.ceil(H / size) + 1;
    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMid meet">`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * size;
        const cy = r * size + (c % 2 ? size / 2 : 0);
        const half = size * 0.45;
        svg += `<path class="stroke" d="M ${cx} ${cy - half} L ${cx + half} ${cy} L ${cx} ${cy + half} L ${cx - half} ${cy} Z"/>`;
      }
    }
    svg += `</svg>`;
    return svg;
  }

  // PATRÓN 4 — Wireframe de documento (rectángulo con líneas horizontales)
  function wireframe() {
    const W = 480, H = 360;
    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMid meet">`;
    // Marco
    svg += `<rect class="stroke" x="2" y="2" width="${W - 4}" height="${H - 4}"/>`;
    // Líneas internas (texto simulado)
    const lineCount = 8;
    const lineGap = (H - 80) / lineCount;
    for (let i = 0; i < lineCount; i++) {
      const y = 40 + i * lineGap;
      const wLine = (W - 80) * (0.4 + (i % 3) * 0.2);
      svg += `<rect x="40" y="${y}" width="${wLine}" height="3" rx="1"/>`;
    }
    svg += `</svg>`;
    return svg;
  }

  // PATRÓN 5 — Flecha minimalista hacia un wireframe
  function arrow() {
    const W = 320, H = 280;
    let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMid meet">`;
    // Flecha vertical descendente
    svg += `<path class="stroke" d="M 60 0 L 60 130 M 50 120 L 60 130 L 70 120"/>`;
    // Wireframe pequeño abajo a la derecha
    svg += `<rect class="stroke" x="40" y="150" width="${W - 60}" height="${H - 160}"/>`;
    const lineCount = 4;
    const lineGap = (H - 200) / lineCount;
    for (let i = 0; i < lineCount; i++) {
      const y = 175 + i * lineGap;
      const w = (W - 100) * (0.5 + (i % 2) * 0.25);
      svg += `<rect x="60" y="${y}" width="${w}" height="3" rx="1"/>`;
    }
    svg += `</svg>`;
    return svg;
  }

  window.PATTERNS = { bars, blocks, diamonds, wireframe, arrow, none: () => "" };
})();
