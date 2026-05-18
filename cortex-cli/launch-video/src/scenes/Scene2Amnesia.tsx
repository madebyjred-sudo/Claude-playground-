import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 2 · amnesia (3.2s · audio 02-amnesia.mp3)
 *
 * Hard cut from previous scene. Empty chat input with cursor blinking.
 * Date stamp shows "mañana" — visual punchline that pairs with the
 * voice line "Mañana... no se acuerda de nada."
 */
export const Scene2Amnesia: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in fast, fade out for transition
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [82, 96], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Headline reveals via clip-path drawn-in
  const headlineProgress = interpolate(frame, [16, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headlineInsetRight = (1 - headlineProgress) * 100;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
        flexDirection: 'column',
        gap: 48,
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/02-amnesia.mp3')} />

      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 120,
          lineHeight: 1.05,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 900,
          clipPath: `inset(0 ${headlineInsetRight}% 0 0)`,
        }}
      >
        mañana…
      </div>

      <div
        style={{
          width: 780,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '28px 36px',
          boxShadow: '0 8px 20px rgba(27, 44, 79, 0.15)',
          minHeight: 120,
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: palette.accent,
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          martes 9:32
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 18,
            fontWeight: 400,
            color: palette.ink,
            lineHeight: 1.6,
            minHeight: 32,
          }}
        >
          <span style={{color: palette.accent}}>&gt; </span>
          <span
            style={{
              opacity: frame % 24 < 12 ? 1 : 0,
              color: palette.accent,
            }}
          >
            ▌
          </span>
        </div>
      </div>

    </AbsoluteFill>
  );
};
