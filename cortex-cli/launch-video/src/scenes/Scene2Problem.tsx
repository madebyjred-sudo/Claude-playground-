import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 2 · problem (3–6s · 90 frames local)
 *
 * Headline declares the problem. Body explains it. Below them, six
 * dots (representing a chat) fade away one by one.
 */
export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const headlineOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [0, 14], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bodyOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Six dots dissolving sequentially after the body appears
  const dotsStart = 50;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '120px 90px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 104,
          lineHeight: 1.05,
          color: palette.ink,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          maxWidth: 880,
        }}
      >
        tu IA te olvida cada vez.
      </div>

      <div
        style={{
          marginTop: 56,
          fontFamily: fontFamily.sans,
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 1.55,
          color: palette.text,
          opacity: bodyOpacity,
          maxWidth: 580,
        }}
      >
        la conversación se acaba. y con ella, lo que construyeron juntos.
      </div>

      {/* dots dissolving */}
      <div style={{display: 'flex', gap: 16, marginTop: 64}}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const dotStart = dotsStart + i * 3;
          const dotEnd = dotStart + 10;
          const opacity = interpolate(frame, [dotStart, dotEnd], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(frame, [dotStart, dotEnd], [0, 30], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: palette.ink,
                opacity: opacity * (bodyOpacity > 0.5 ? 1 : 0),
                transform: `translateY(${y}px)`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
