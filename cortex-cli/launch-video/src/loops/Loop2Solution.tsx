import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 2 · la solución (8s · 240 frames @ 30fps · 1080×1080 square)
 *
 * Silent loop. CORTEX.md materializes, filename types in, the five
 * layers populate one by one, the file holds with a subtle breath
 * pulse, then fades out for seamless looping.
 *
 *   0-30    file fades + scales in
 *   30-70   filename typewriter
 *   70-180  five layers staggered (~22f each)
 *   180-220 hold with subtle pulse
 *   220-240 fade out
 *
 * Used in LinkedIn carousel post · slot 2 · the solution.
 */

const FILENAME = 'CORTEX-mi-proyecto.md';
const LAYERS = ['SINAPSIS', 'HIPOCAMPO', 'CONEXIONES', 'ABIERTAS', 'NOTAS PROPIAS'];

export const Loop2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const sheetOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const sheetScale = interpolate(frame, [0, 30], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const filenameStart = 30;
  const typedChars = Math.max(
    0,
    Math.min(FILENAME.length, Math.floor((frame - filenameStart) * 1.4)),
  );

  // Subtle breath pulse on the whole sheet (continuous)
  const pulse = 1 + Math.sin(frame * 0.06) * 0.008;

  // Fade out for seamless loop
  const fadeOut = interpolate(frame, [220, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <style>{FONT_CSS}</style>
      <PaperBackground />

      <div
        style={{
          width: 720,
          minHeight: 540,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '32px 40px',
          boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
          opacity: sheetOpacity * fadeOut,
          transform: `scale(${sheetScale * pulse})`,
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
            marginBottom: 24,
          }}
        >
          # {FILENAME.slice(0, typedChars)}
          {typedChars < FILENAME.length && (
            <span
              style={{
                opacity: frame % 20 < 10 ? 1 : 0,
                color: palette.accent,
              }}
            >
              ▌
            </span>
          )}
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {LAYERS.map((layer, i) => {
            const layerStart = 70 + i * 22;
            const layerOpacity = interpolate(
              frame,
              [layerStart, layerStart + 14],
              [0, 1],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
            );
            const layerX = interpolate(frame, [layerStart, layerStart + 14], [-20, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });
            return (
              <div
                key={layer}
                style={{
                  fontFamily: fontFamily.sans,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: palette.accent,
                  textTransform: 'uppercase',
                  opacity: layerOpacity,
                  transform: `translateX(${layerX}px)`,
                }}
              >
                ## {layer}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
