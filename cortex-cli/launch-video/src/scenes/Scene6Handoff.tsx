import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 6 · handoff (21–26s · 150 frames local)
 *
 * The /handoff command types in. A new "v2" of the cortex emerges
 * on top of v1 with a slight offset. The "Última actualización"
 * field pulses terracota.
 */
export const Scene6Handoff: React.FC = () => {
  const frame = useCurrentFrame();

  const command = '> /handoff';
  const typeStart = 6;
  const typePerChar = 2;
  const typedChars = Math.max(
    0,
    Math.min(command.length, Math.floor((frame - typeStart) / typePerChar)),
  );

  const v1Opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // v2 emerges offset after the command is typed
  const v2Start = 56;
  const v2Opacity = interpolate(frame, [v2Start, v2Start + 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const v2Offset = interpolate(frame, [v2Start, v2Start + 26], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const headlineProgress = interpolate(frame, [104, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headlineInsetRight = (1 - headlineProgress) * 100;

  // Pulse for the "Última actualización" highlight
  const pulse = 0.5 + 0.5 * Math.sin((frame - v2Start) * 0.3);

  const Sheet: React.FC<{
    title: string;
    updatedColor: string;
    style?: React.CSSProperties;
  }> = ({title, updatedColor, style}) => (
    <div
      style={{
        width: 480,
        background: '#F5EBD0',
        border: `2px solid ${palette.ink}`,
        padding: '20px 28px',
        boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 18,
          fontWeight: 500,
          color: palette.ink,
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 13,
          color: palette.text,
          opacity: 0.7,
        }}
      >
        &gt; Última actualización:{' '}
        <span style={{color: updatedColor, fontWeight: 600}}>
          2026-05-17
        </span>
      </div>
      <div
        style={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {['SINAPSIS', 'HIPOCAMPO', 'CONEXIONES', 'ABIERTAS', 'NOTAS PROPIAS'].map(
          (label) => (
            <div
              key={label}
              style={{
                fontFamily: fontFamily.sans,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: palette.accent,
              }}
            >
              {label}
            </div>
          ),
        )}
      </div>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '120px 90px',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 28,
          fontWeight: 500,
          color: palette.ink,
          marginBottom: 56,
        }}
      >
        {command.slice(0, typedChars)}
        <span
          style={{
            opacity: frame % 20 < 10 ? 1 : 0,
            color: palette.accent,
          }}
        >
          ▌
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          width: 520,
          height: 320,
        }}
      >
        {/* v1 underneath */}
        <Sheet
          title="CORTEX-borges-aleph.md"
          updatedColor={palette.text}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: v1Opacity * 0.6,
          }}
        />
        {/* v2 emerging on top with offset */}
        <Sheet
          title="CORTEX-borges-aleph.md"
          updatedColor={`rgba(160, 67, 43, ${pulse})`}
          style={{
            position: 'absolute',
            top: 16,
            left: 24,
            opacity: v2Opacity,
            transform: `translateY(${v2Offset}px)`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 60,
          fontFamily: fontFamily.blackletter,
          fontSize: 56,
          lineHeight: 1.1,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 760,
          clipPath: `inset(0 ${headlineInsetRight}% 0 0)`,
        }}
      >
        tu memoria sobrevive a la conversación.
      </div>
    </AbsoluteFill>
  );
};
