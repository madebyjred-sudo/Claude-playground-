import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 2 · TU MEMORIA EN UN ARCHIVO (12s · 360 frames @ 30fps · 1080×1080)
 *
 * Hacking-style ASCII brain reveal. Every non-whitespace cell in the
 * brain pattern starts as a random glitch character and locks into
 * its target character on a staggered schedule (~120 frames). Once
 * the brain settles, five capa labels orbit it in plain Spanish
 * (conceptos / hechos / relaciones / preguntas / notas propias).
 */

const BRAIN = `                                       ↑↑↑↑
                              ↑↑↑↑↑↑↑↑    ↑↑    ↑↑  ↑↑↑↑
                        ↑↑ ↑↑   ↑↑ ↑↑   ↑↑   ↑↑↑↑   ↑    ↑↑
                    ↑↑↑↑↑      ↑  ↑↑  ↑    ↑         ↑      ↑↑↑
                  ↑  ↑↑       ↑     ↑↑  ↑↑↑    ↑↑↑   ↑↑    ↑   ↑
              ↑↑↑↑ ↑↑      ↑↑      ↑      ↑    ↑↑    ↑     ↑    ↑↑
            ↑↑  ↑↑     ↑↑↑↑↑   ↑   ↑                 ↑↑       ↑   ↑
          ↑↑↑  ↑    ↑      ↑    ↑↑  ↑↑    ↑   ↑↑    ↑ ↑       ↑ ↑  ↑↑
         ↑↑↑  ↑   ↑  ↑↑  ↑↑↑    ↑      ↑      ↑   ↑ ↑ ↑     ↑↑       ↑
       ↑ ↑↑↑     ↑    ↑  ↑↑↑↑   ↑    ↑   ↑↑   ↑      ↑↑    ↑ ↑   ↑↑↑ ↑
      ↑ ↑ ↑↑↑↑↑ ↑     ↑  ↑ ↑↑   ↑     ↑  ↑    ↑     ↑   ↑  ↑        ↑↑ ↑
     ↑   ↑ ↑    ↑     ↑  ↑ ↑↑   ↑   ↑↑↑    ↑↑↑↑↑↑  ↑     ↑↑       ↑     ↑
    ↑↑ ↑↑↑  ↑  ↑      ↑   ↑↑  ↑ ↑↑  ↑↑↑↑↑↑         ↑          ↑↑   ↑↑↑  ↑↑
    ↑ ↑  ↑     ↑  ↑  ↑↑↑    ↑   ↑↑↑          ↑     ↑   ↑↑ ↑↑ ↑    ↑  ↑ ↑  ↑
    ↑↑↑   ↑            ↑↑↑     ↑↑           ↑↑  ↑  ↑  ↑↑     ↑  ↑   ↑ ↑ ↑ ↑
    ↑↑ ↑    ↑↑           ↑↑↑↑↑↑↑     ↑     ↑ ↑     ↑↑↑    ↑  ↑↑↑↑   ↑↑ ↑  ↑
    ↑↑   ↑↑↑   ↑↑↑   ↑↑ ↑      ↑    ↑↑↑↑ ↑↑  ↑            ↑     ↑        ↑ ↑
    ↑↑↑↑       ↑  ↑↑   ↑     ↑    ↑↑      ↑↑   ↑    ↑↑    ↑  ↑  ↑    ↑ ↑  ↑↑
      ↑↑ ↑         ↑↑ ↑    ↑  ↑↑↑↑           ↑↑↑↑↑     ↑↑↑      ↑    ↑     ↑
       ↑  ↑     ↑↑↑↑↑↑    ↑↑↑                    ↑         ↑  ↑↑ ↑↑   ↑↑   ↑
         ↑    ↑   ↑ ↑      ↑           ↑      ↑↑↑  ↑↑↑    ↑↑↑   ↑       ↑  ↑
            ↑↑↑↑   ↑↑    ↑   ↑↑  ↑ ↑  ↑      ↑       ↑↑↑ ↑↑↑↑↑↑↑  ↑↑↑↑↑↑
                   ↑↑↑ ↑ ↑        ↑     ↑↑↑     ↑↑↑↑↑↑↑↑ ↑   ↑↑     ↑↑↑
                   ↑             ↑         ↑↑↑↑↑↑↑ ↑↑↑↑↑ ↑↑  ↑↑↑↑↑↑↑↑↑ ↑
                    ↑ ↑      ↑  ↑     ↑↑↑↑    ↑↑↑ ↑↑↑↑↑↑ ↑↑↑↑↑    ↑↑↑↑↑↑
                     ↑             ↑↑↑↑ ↑↑     ↑↑↑↑↑↑↑↑↑↑↑↑ ↑↑↑       ↑↑
                      ↑↑↑↑↑↑    ↑↑       ↑↑↑ ↑↑↑ ↑ ↑ ↑ ↑↑↑↑ ↑↑↑     ↑↑↑
                             ↑               ↑   ↑ ↑ ↑ ↑↑ ↑  ↑↑↑  ↑↑↑↑
                                              ↑↑   ↑↑↑ ↑  ↑↑ ↑↑  ↑↑↑
                                                ↑↑   ↑↑↑↑↑↑↑↑↑↑↑↑
                                                  ↑    ↑↑↑↑↑↑↑
                                                   ↑   ↑
                                                   ↑↑  ↑
                                                    ↑   ↑
                                                     ↑  ↑
                                                     ↑↑↑`;

// Glitch character pool — chars that "look like the matrix" but read
// as compatible with the eventual ↑ target.
const HACK_POOL = '01╱╲↑↓→←|/\\-+=#$%@&*<>'.split('');

// Pre-compute lock-in frame per character. Stable across renders.
const NON_WS_INDICES: number[] = [];
for (let i = 0; i < BRAIN.length; i++) {
  if (BRAIN[i] !== ' ' && BRAIN[i] !== '\n') NON_WS_INDICES.push(i);
}
const TOTAL_HACK_FRAMES = 110;
const LOCK_FRAMES = new Map<number, number>();
for (let k = 0; k < NON_WS_INDICES.length; k++) {
  const idx = NON_WS_INDICES[k];
  // Spread lock-ins across [10, 10+TOTAL_HACK_FRAMES] with a pseudo-random
  // shuffle so visual progression feels organic, not left-to-right.
  const pseudoRand = ((k * 9301 + 49297) % 233280) / 233280;
  LOCK_FRAMES.set(idx, 10 + Math.floor(pseudoRand * TOTAL_HACK_FRAMES));
}

// Each char that's still glitching changes ~every 2 frames.
function glitchFor(charIndex: number, frame: number): string {
  const noise = (charIndex * 31 + frame * 7) % HACK_POOL.length;
  return HACK_POOL[noise];
}

function renderBrain(frame: number): string {
  let out = '';
  for (let i = 0; i < BRAIN.length; i++) {
    const ch = BRAIN[i];
    if (ch === ' ' || ch === '\n') {
      out += ch;
      continue;
    }
    const lockAt = LOCK_FRAMES.get(i) ?? 0;
    if (frame >= lockAt) {
      out += ch;
    } else {
      // While glitching, change every 2 frames
      out += glitchFor(i, Math.floor(frame / 2));
    }
  }
  return out;
}

const HEADLINE = 'TU MEMORIA EN UN ARCHIVO.';

type Layer = {
  label: string;
  framePeak: number;
  position: React.CSSProperties;
  align: 'left' | 'right' | 'center';
};

const LAYERS: Layer[] = [
  {label: 'CONCEPTOS',     framePeak: 150, align: 'center', position: {top: 220, left: '50%', transform: 'translateX(-50%)'}},
  {label: 'HECHOS',        framePeak: 175, align: 'right',  position: {top: 420, right: 60}},
  {label: 'RELACIONES',    framePeak: 200, align: 'right',  position: {bottom: 230, right: 80}},
  {label: 'PREGUNTAS',     framePeak: 225, align: 'left',   position: {top: 420, left: 60}},
  {label: 'NOTAS PROPIAS', framePeak: 250, align: 'left',   position: {bottom: 230, left: 80}},
];

const LayerLabel: React.FC<{layer: Layer; frame: number}> = ({layer, frame}) => {
  const appear = interpolate(frame, [layer.framePeak, layer.framePeak + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  let dx = 0, dy = 0;
  if (layer.align === 'left') dx = -24;
  if (layer.align === 'right') dx = 24;
  if (layer.align === 'center') dy = -20;
  const tx = (1 - appear) * dx;
  const ty = (1 - appear) * dy;

  const baseTransform = typeof layer.position.transform === 'string' ? layer.position.transform : '';
  const finalTransform = `${baseTransform} translate(${tx}px, ${ty}px)`.trim();

  return (
    <div
      style={{
        position: 'absolute',
        ...layer.position,
        transform: finalTransform,
        opacity: appear,
        textAlign: layer.align,
        fontFamily: fontFamily.sans,
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '0.20em',
        color: palette.accent,
        textTransform: 'uppercase',
        lineHeight: 1,
      }}
    >
      {layer.label}
    </div>
  );
};

export const Loop2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const headlineChars = Math.max(
    0,
    Math.min(HEADLINE.length, Math.floor((frame - 4) * 1.4)),
  );

  const brainContent = renderBrain(frame);
  const brainFadeIn = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const fadeOut = interpolate(frame, [345, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <style>{FONT_CSS}</style>
      <PaperBackground />

      {/* HEADLINE · top */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 60,
          fontWeight: 700,
          color: palette.ink,
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
        }}
      >
        {HEADLINE.slice(0, headlineChars)}
        {headlineChars < HEADLINE.length && (
          <span style={{opacity: frame % 22 < 11 ? 1 : 0, color: palette.accent}}>▌</span>
        )}
      </div>

      {/* BRAIN · center · hacking reveal */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: brainFadeIn,
        }}
      >
        <pre
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 10,
            fontWeight: 500,
            lineHeight: 1.0,
            color: palette.ink,
            margin: 0,
            textAlign: 'left',
            whiteSpace: 'pre',
            letterSpacing: '-0.02em',
          }}
        >
          {brainContent}
        </pre>
      </div>

      {/* FIVE LABELS · orbit the brain · appear after it settles */}
      {LAYERS.map((layer) => (
        <LayerLabel key={layer.label} layer={layer} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};
