import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 3 · el handoff (7s · 210 frames @ 30fps · 1080×1080 square)
 *
 * Silent loop. CORTEX.md sits in the center. The "Última
 * actualización" timestamp pulses terracota, signalling the live
 * update. A v2 copy emerges with a slight offset on top — the file
 * has grown. Hold, fade out, loop.
 *
 *   0-30    v1 fades in
 *   30-90   pulse on the timestamp
 *   90-150  v2 emerges with offset
 *   150-190 hold
 *   190-210 fade out
 *
 * Used in LinkedIn carousel post · slot 3 · the handoff.
 */

const FILENAME = 'CORTEX-mi-proyecto.md';
const LAYERS = ['SINAPSIS', 'HIPOCAMPO', 'CONEXIONES', 'ABIERTAS', 'NOTAS PROPIAS'];

const Sheet: React.FC<{
  opacity: number;
  highlightTimestamp: boolean;
  pulse: number;
  style?: React.CSSProperties;
}> = ({opacity, highlightTimestamp, pulse, style}) => (
  <div
    style={{
      width: 520,
      background: '#F5EBD0',
      border: `2px solid ${palette.ink}`,
      padding: '24px 30px',
      boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
      opacity,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fontFamily.mono,
        fontSize: 20,
        fontWeight: 600,
        color: palette.ink,
        marginBottom: 14,
      }}
    >
      # {FILENAME}
    </div>
    <div
      style={{
        fontFamily: fontFamily.mono,
        fontSize: 14,
        color: palette.text,
        opacity: 0.7,
        marginBottom: 18,
      }}
    >
      &gt; Última actualización:{' '}
      <span
        style={{
          color: highlightTimestamp
            ? `rgba(160, 67, 43, ${0.5 + 0.5 * pulse})`
            : palette.text,
          fontWeight: 600,
        }}
      >
        ahora
      </span>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
      {LAYERS.map((label) => (
        <div
          key={label}
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.20em',
            color: palette.accent,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  </div>
);

export const Loop3Handoff: React.FC = () => {
  const frame = useCurrentFrame();

  const v1Opacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const v2Start = 90;
  const v2Opacity = interpolate(frame, [v2Start, v2Start + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const v2Offset = interpolate(frame, [v2Start, v2Start + 30], [-24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Continuous pulse, used by the highlight on "ahora"
  const pulse = Math.sin(frame * 0.18);

  const fadeOut = interpolate(frame, [190, 210], [1, 0], {
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
          position: 'relative',
          width: 580,
          height: 360,
          opacity: fadeOut,
        }}
      >
        {/* v1 underneath */}
        <Sheet
          opacity={v1Opacity * 0.55}
          highlightTimestamp={false}
          pulse={0}
          style={{position: 'absolute', top: 0, left: 0}}
        />
        {/* v2 emerging on top with offset */}
        <Sheet
          opacity={v2Opacity}
          highlightTimestamp
          pulse={pulse}
          style={{
            position: 'absolute',
            top: 28,
            left: 36,
            transform: `translateY(${v2Offset}px)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
