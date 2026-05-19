import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP · the cortex piece (16s · 480 frames @ 30fps · 1080×1080)
 *
 * Single self-contained video — the only one we ship.
 *
 *   0-30    title (blackletter) types in
 *   10-70   brain ASCII hacking reveal (faster than before)
 *   80-200  five fields appear with stagger, each with its function
 *   210-380 closing message at the bottom · the value statement
 *   380-470 hold
 *   470-480 fade
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

const HACK_POOL = '01╱╲↑↓→←|/\\-+=#$%@&*<>'.split('');
const NON_WS_INDICES: number[] = [];
for (let i = 0; i < BRAIN.length; i++) {
  if (BRAIN[i] !== ' ' && BRAIN[i] !== '\n') NON_WS_INDICES.push(i);
}
const TOTAL_HACK_FRAMES = 60; // faster — was 110
const LOCK_FRAMES = new Map<number, number>();
for (let k = 0; k < NON_WS_INDICES.length; k++) {
  const idx = NON_WS_INDICES[k];
  const pseudoRand = ((k * 9301 + 49297) % 233280) / 233280;
  LOCK_FRAMES.set(idx, 10 + Math.floor(pseudoRand * TOTAL_HACK_FRAMES));
}

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
      out += glitchFor(i, Math.floor(frame / 2));
    }
  }
  return out;
}

type Field = {
  label: string;
  purpose: string;
  framePeak: number;
  position: React.CSSProperties;
  align: 'left' | 'right' | 'center';
};

const FIELDS: Field[] = [
  {
    label: 'CONCEPTOS',
    purpose: 'para no perder lo que pensaste.',
    framePeak: 80,
    align: 'center',
    position: {top: 210, left: '50%', transform: 'translateX(-50%)'},
  },
  {
    label: 'HECHOS',
    purpose: 'para no repetir lo que ya sabés.',
    framePeak: 102,
    align: 'right',
    position: {top: 360, right: 40},
  },
  {
    label: 'RELACIONES',
    purpose: 'para ver cómo encajan tus ideas.',
    framePeak: 124,
    align: 'right',
    position: {top: 530, right: 40},
  },
  {
    label: 'PREGUNTAS',
    purpose: 'para no olvidar lo que falta resolver.',
    framePeak: 146,
    align: 'left',
    position: {top: 360, left: 40},
  },
  {
    label: 'NOTAS PROPIAS',
    purpose: 'para separar tu lectura del hecho.',
    framePeak: 168,
    align: 'left',
    position: {top: 530, left: 40},
  },
];

const FieldLabel: React.FC<{field: Field; frame: number}> = ({field, frame}) => {
  const appear = interpolate(frame, [field.framePeak, field.framePeak + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  let dx = 0;
  let dy = 0;
  if (field.align === 'left') dx = -22;
  if (field.align === 'right') dx = 22;
  if (field.align === 'center') dy = -18;
  const tx = (1 - appear) * dx;
  const ty = (1 - appear) * dy;
  const baseTransform =
    typeof field.position.transform === 'string' ? field.position.transform : '';
  const finalTransform = `${baseTransform} translate(${tx}px, ${ty}px)`.trim();

  return (
    <div
      style={{
        position: 'absolute',
        ...field.position,
        transform: finalTransform,
        opacity: appear,
        textAlign: field.align,
        maxWidth: 280,
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.20em',
          color: palette.accent,
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {field.label}
      </div>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 14,
          fontWeight: 500,
          fontStyle: 'italic',
          color: palette.text,
          opacity: 0.75,
          lineHeight: 1.3,
        }}
      >
        {field.purpose}
      </div>
    </div>
  );
};

const CLOSING_LINES = [
  {text: 'Es un archivo. Lo abrís en cualquier IA.', start: 220},
  {text: 'Trabajás en serie o en paralelo, sin perder el hilo.', start: 252},
  {text: 'Decís /update y tu proyecto persiste.', start: 284, highlight: '/update'},
  {text: 'Las decisiones no se borran. Se acumulan.', start: 316},
];

const ClosingLine: React.FC<{
  text: string;
  start: number;
  highlight?: string;
  frame: number;
}> = ({text, start, highlight, frame}) => {
  const opacity = interpolate(frame, [start, start + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [start, start + 18], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Render with optional highlighted token
  const parts = highlight ? text.split(highlight) : [text];

  return (
    <div
      style={{
        fontFamily: fontFamily.sans,
        fontSize: 21,
        fontWeight: 600,
        color: palette.ink,
        opacity,
        transform: `translateY(${y}px)`,
        textAlign: 'center',
        letterSpacing: '0.005em',
        lineHeight: 1.45,
      }}
    >
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && highlight && (
            <span
              style={{
                fontFamily: fontFamily.mono,
                color: palette.accent,
                fontWeight: 700,
                padding: '0 4px',
              }}
            >
              {highlight}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Loop2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  // Title typewriter in blackletter
  const TITLE = 'tu memoria en un archivo.';
  const titleChars = Math.max(0, Math.min(TITLE.length, Math.floor((frame - 4) * 1.4)));

  const brainContent = renderBrain(frame);
  const brainFadeIn = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const fadeOut = interpolate(frame, [465, 480], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <style>{FONT_CSS}</style>
      <PaperBackground />

      {/* TITLE · blackletter · top */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 80,
          right: 80,
          textAlign: 'center',
          fontFamily: fontFamily.blackletter,
          fontSize: 72,
          color: palette.ink,
          letterSpacing: '0',
          lineHeight: 1.0,
        }}
      >
        {TITLE.slice(0, titleChars)}
        {titleChars < TITLE.length && (
          <span style={{opacity: frame % 22 < 11 ? 1 : 0, color: palette.accent}}>▌</span>
        )}
      </div>

      {/* BRAIN · center · hacking reveal */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: brainFadeIn,
        }}
      >
        <pre
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 9,
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

      {/* FIVE FIELDS · orbit the brain with their "para qué" */}
      {FIELDS.map((field) => (
        <FieldLabel key={field.label} field={field} frame={frame} />
      ))}

      {/* CLOSING MESSAGE · bottom · the value statement */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 80,
          right: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'center',
        }}
      >
        {CLOSING_LINES.map((line) => (
          <ClosingLine
            key={line.text}
            text={line.text}
            start={line.start}
            highlight={line.highlight}
            frame={frame}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
