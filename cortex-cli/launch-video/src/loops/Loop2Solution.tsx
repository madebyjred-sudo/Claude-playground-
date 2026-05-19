import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 2 · TU MEMORIA EN UN ARCHIVO (10s · 300 frames @ 30fps · 1080×1080)
 *
 * Text-first. Headline at top. Below it, a cortex.md file with five
 * layers labeled in plain Spanish (CONCEPTOS / HECHOS / RELACIONES /
 * PREGUNTAS / NOTAS) — the words a non-tech viewer can understand at
 * a glance, not the technical SINAPSIS/HIPOCAMPO labels.
 */

const HEADLINE = 'TU MEMORIA EN UN ARCHIVO.';
const SUBLINE = 'cinco capas. todo en Markdown. tuyo.';
const FILENAME = 'CORTEX-mi-proyecto.md';
const LAYERS = ['CONCEPTOS', 'HECHOS', 'RELACIONES', 'PREGUNTAS', 'NOTAS PROPIAS'];

export const Loop2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const headlineChars = Math.max(
    0,
    Math.min(HEADLINE.length, Math.floor((frame - 4) * 1.4)),
  );

  // File materializes after headline lands
  const sheetOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const sheetScale = interpolate(frame, [40, 70], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Subline appears after layers settle
  const sublineOpacity = interpolate(frame, [220, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const fadeOut = interpolate(frame, [285, 300], [1, 0], {
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
          top: 110,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 64,
          fontWeight: 700,
          color: palette.ink,
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
        }}
      >
        {HEADLINE.slice(0, headlineChars)}
        {headlineChars < HEADLINE.length && (
          <span
            style={{
              opacity: frame % 22 < 11 ? 1 : 0,
              color: palette.accent,
              marginLeft: 4,
            }}
          >
            ▌
          </span>
        )}
      </div>

      {/* FILE · center */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 90px',
        }}
      >
        <div
          style={{
            width: 720,
            background: '#F5EBD0',
            border: `2px solid ${palette.ink}`,
            padding: '28px 36px',
            boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
            opacity: sheetOpacity,
            transform: `scale(${sheetScale})`,
          }}
        >
          <div
            style={{
              fontFamily: fontFamily.mono,
              fontSize: 22,
              fontWeight: 600,
              color: palette.ink,
              borderBottom: `1px solid ${palette.ink}33`,
              paddingBottom: 16,
              marginBottom: 22,
            }}
          >
            # {FILENAME}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {LAYERS.map((layer, i) => {
              const start = 90 + i * 24;
              const opacity = interpolate(frame, [start, start + 16], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              const x = interpolate(frame, [start, start + 16], [-24, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              return (
                <div
                  key={layer}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 14,
                    opacity,
                    transform: `translateX(${x}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fontFamily.sans,
                      fontSize: 20,
                      fontWeight: 700,
                      letterSpacing: '0.20em',
                      color: palette.accent,
                      textTransform: 'uppercase',
                    }}
                  >
                    ##
                  </span>
                  <span
                    style={{
                      fontFamily: fontFamily.sans,
                      fontSize: 22,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: palette.ink,
                      textTransform: 'uppercase',
                    }}
                  >
                    {layer}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUBLINE · bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 28,
          fontWeight: 500,
          color: palette.ink,
          opacity: sublineOpacity * 0.8,
          fontStyle: 'italic',
        }}
      >
        {SUBLINE}
      </div>
    </AbsoluteFill>
  );
};
