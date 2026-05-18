import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 6.5 · name reveal (7.6s · audio 06b-name-reveal.mp3)
 *
 * Bridges the concept ("un cuaderno propio") and the layers
 * explanation by giving the thing its name. Three beats timed to
 * the narration:
 *
 *   0.0-1.5s  "Le pusimos un nombre."           setup line
 *   1.5-3.5s  "Cortex."                          the wordmark drops
 *   3.5-7.6s  "Lo que vive en tu Drive y crece  recap framing
 *              con cada conversación que tengas
 *              con tu IA."
 *
 * The wordmark uses the same ASCII art that closes the video,
 * giving the brand a "callback" feel at the closer.
 */

const WORDMARK_LINES = [
  '     ___/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\/\\/\\/\\____/\\/\\/\\/\\/\\/\\__/\\/\\/\\/\\/\\/\\__/\\/\\____/\\/\\_',
  '    _/\\/\\__________/\\/\\____/\\/\\__/\\/\\____/\\/\\______/\\/\\______/\\______________/\\/\\/\\/\\___',
  '   _/\\/\\__________/\\/\\____/\\/\\__/\\/\\/\\/\\/\\________/\\/\\______/\\/\\/\\/\\/\\________/\\/\\_____',
  '  _/\\/\\__________/\\/\\____/\\/\\__/\\/\\__/\\/\\________/\\/\\______/\\/\\____________/\\/\\/\\/\\___',
  ' ___/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\____/\\/\\______/\\/\\______/\\/\\/\\/\\/\\/\\__/\\/\\____/\\/\\_',
  '____________________________________________________________________________________',
];

export const Scene6bNameReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [212, 228], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // "Le pusimos un nombre." appears with subtle reveal
  const setupOpacity = interpolate(frame, [4, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const setupY = interpolate(frame, [4, 28], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // The wordmark draws in line by line — this is the brand moment
  const WORDMARK_START = 50;
  const PER_LINE_START = 5;
  const PER_LINE_DURATION = 16;

  // Recap line appears after the wordmark settles
  const recapOpacity = interpolate(frame, [126, 156], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
        flexDirection: 'column',
        gap: 36,
        opacity: fadeIn * fadeOut,
        textAlign: 'center',
      }}
    >
      <Audio src={staticFile('audio/scenes/06b-name-reveal.mp3')} />

      {/* "Le pusimos un nombre." */}
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 26,
          fontWeight: 500,
          color: palette.ink,
          opacity: setupOpacity * 0.78,
          transform: `translateY(${setupY}px)`,
          letterSpacing: '-0.005em',
          fontStyle: 'italic',
        }}
      >
        le pusimos un nombre.
      </div>

      {/* The wordmark · brand moment · draws in line by line */}
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.2,
          color: palette.ink,
          whiteSpace: 'pre',
          textAlign: 'left',
        }}
      >
        {WORDMARK_LINES.map((line, i) => {
          const start = WORDMARK_START + i * PER_LINE_START;
          const end = start + PER_LINE_DURATION;
          const progress = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          const insetRight = (1 - progress) * 100;
          return (
            <div key={i} style={{clipPath: `inset(0 ${insetRight}% 0 0)`}}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Recap framing */}
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 44,
          lineHeight: 1.2,
          color: palette.ink,
          maxWidth: 780,
          opacity: recapOpacity,
          marginTop: 12,
        }}
      >
        vive en tu Drive. crece con cada conversación.
      </div>
    </AbsoluteFill>
  );
};
