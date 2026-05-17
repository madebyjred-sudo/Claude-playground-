import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
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

  // Headline reveals via clip-path (drawn-in) — feels like the
  // wordmark from scene 1 in spirit, applied to type.
  const headlineProgress = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headlineInsetRight = (1 - headlineProgress) * 100;

  const bodyOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Six dots dissolving sequentially after the body appears
  const dotsStart = 70;

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
          maxWidth: 880,
          clipPath: `inset(0 ${headlineInsetRight}% 0 0)`,
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
          const dotStart = dotsStart + i * 5;
          const dotEnd = dotStart + 16;
          const opacity = interpolate(frame, [dotStart, dotEnd], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.in(Easing.cubic),
          });
          const y = interpolate(frame, [dotStart, dotEnd], [0, 30], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.in(Easing.cubic),
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
