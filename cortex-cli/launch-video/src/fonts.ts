/**
 * Font loading from local files in `public/fonts/`.
 *
 * We inject @font-face declarations as a <style> tag during render,
 * referencing files served from public/ via staticFile(). The browser
 * loads them via standard CSS mechanism — no delayRender needed.
 *
 * Google Fonts equivalent (works on user's Mac with internet):
 *   import {loadFont} from '@remotion/google-fonts/Figtree';
 *   loadFont('normal', {weights: ['400', '500', '600', '700']});
 * Local fonts (in this repo) make the render reproducible regardless
 * of network state and respect the OFL/Apache licenses of these
 * typefaces.
 */

import {staticFile} from 'remotion';

type Face = {
  family: string;
  weight: string;
  file: string;
  format: 'truetype' | 'woff2';
};

export const FONT_FACES: Face[] = [
  {family: 'Figtree', weight: '400', file: 'Figtree-400.ttf', format: 'truetype'},
  {family: 'Figtree', weight: '500', file: 'Figtree-500.ttf', format: 'truetype'},
  {family: 'Figtree', weight: '600', file: 'Figtree-600.ttf', format: 'truetype'},
  {family: 'Figtree', weight: '700', file: 'Figtree-700.ttf', format: 'truetype'},
  {family: 'JetBrains Mono', weight: '400', file: 'JetBrainsMono-400.ttf', format: 'truetype'},
  {family: 'JetBrains Mono', weight: '500', file: 'JetBrainsMono-500.ttf', format: 'truetype'},
  {family: 'UnifrakturCook', weight: '700', file: 'UnifrakturCook-700.woff2', format: 'woff2'},
];

export const buildFontFaceCSS = (): string => {
  return FONT_FACES.map(
    (face) => `
@font-face {
  font-family: '${face.family}';
  font-style: normal;
  font-weight: ${face.weight};
  font-display: block;
  src: url(${staticFile(`fonts/${face.file}`)}) format('${face.format}');
}`,
  ).join('\n');
};

export const fontFamily = {
  blackletter: '"UnifrakturCook", serif',
  sans: '"Figtree", system-ui, -apple-system, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
} as const;
