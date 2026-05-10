// build.js — Renderiza el template a PDF y a PNGs individuales con Playwright.
//
// Uso:
//   node build.js              -> genera output/carousel.pdf y output/page-XX.png
//   node build.js --pdf-only   -> solo PDF
//   node build.js --png-only   -> solo PNGs

import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.resolve(__dirname, "template.html");
const OUTDIR = path.resolve(__dirname, "output");

const PAGE_W = 1080;
const PAGE_H = 1350;

const args = new Set(process.argv.slice(2));
const pdfOnly = args.has("--pdf-only");
const pngOnly = args.has("--png-only");
const doPdf = !pngOnly;
const doPng = !pdfOnly;

await fs.mkdir(OUTDIR, { recursive: true });

const url = pathToFileURL(TEMPLATE).href;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: PAGE_W, height: PAGE_H },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

console.log(`→ Cargando ${url}`);
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.documentElement.dataset.ready === "true");
// Espera a que las fuentes estén listas
await page.evaluate(() => document.fonts.ready);

const totalPages = await page.evaluate(() => document.querySelectorAll(".page").length);
console.log(`→ ${totalPages} páginas detectadas`);

// PDF combinado
if (doPdf) {
  const pdfPath = path.join(OUTDIR, "carousel.pdf");
  await page.pdf({
    path: pdfPath,
    width: `${PAGE_W}px`,
    height: `${PAGE_H}px`,
    printBackground: true,
    pageRanges: "",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`✓ PDF: ${pdfPath}`);
}

// PNGs individuales (uno por página)
if (doPng) {
  for (let i = 0; i < totalPages; i++) {
    const num = String(i + 1).padStart(2, "0");
    const out = path.join(OUTDIR, `page-${num}.png`);
    const handle = await page.locator(".page").nth(i).elementHandle();
    if (!handle) continue;
    await handle.screenshot({ path: out, type: "png" });
    console.log(`✓ PNG: ${out}`);
  }
}

await browser.close();
console.log("Done.");
