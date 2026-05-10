"""Renderiza el template a PDF + PNGs usando Python Playwright."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).parent
TEMPLATE = ROOT / "template.html"
OUTDIR = ROOT / "output"
PAGE_W = 1080
PAGE_H = 1350


async def main():
    OUTDIR.mkdir(exist_ok=True)
    url = TEMPLATE.resolve().as_uri()

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": PAGE_W, "height": PAGE_H},
            device_scale_factor=2,
        )
        page = await context.new_page()
        print(f"→ Cargando {url}")
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_function(
            "document.documentElement.dataset.ready === 'true'"
        )
        await page.evaluate("document.fonts.ready")
        await page.wait_for_timeout(800)

        total = await page.evaluate("document.querySelectorAll('.page').length")
        print(f"→ {total} páginas detectadas")

        # PDF combinado
        pdf_path = OUTDIR / "carousel.pdf"
        await page.pdf(
            path=str(pdf_path),
            width=f"{PAGE_W}px",
            height=f"{PAGE_H}px",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        print(f"✓ PDF: {pdf_path}")

        # PNGs por página
        for i in range(total):
            num = str(i + 1).zfill(2)
            out = OUTDIR / f"page-{num}.png"
            handle = await page.locator(".page").nth(i).element_handle()
            if handle:
                await handle.screenshot(path=str(out), type="png")
                print(f"✓ PNG: {out}")

        await browser.close()
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
