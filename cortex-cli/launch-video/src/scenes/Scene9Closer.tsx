import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

const WORDMARK_LINES = [
  '     ___/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\/\\/\\/\\____/\\/\\/\\/\\/\\/\\__/\\/\\/\\/\\/\\/\\__/\\/\\____/\\/\\_',
  '    _/\\/\\__________/\\/\\____/\\/\\__/\\/\\____/\\/\\______/\\/\\______/\\______________/\\/\\/\\/\\___',
  '   _/\\/\\__________/\\/\\____/\\/\\__/\\/\\/\\/\\/\\________/\\/\\______/\\/\\/\\/\\/\\________/\\/\\_____',
  '  _/\\/\\__________/\\/\\____/\\/\\__/\\/\\__/\\/\\________/\\/\\______/\\/\\____________/\\/\\/\\/\\___',
  ' ___/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\____/\\/\\______/\\/\\______/\\/\\/\\/\\/\\/\\__/\\/\\____/\\/\\_',
  '____________________________________________________________________________________',
];

/**
 * SCENE 9 · closer (8.2s · audio 09-closer.mp3)
 *
 * The reveal moment. The CORTEX ASCII wordmark draws in line by
 * line (the animation the user loved from the first iteration).
 * Tagline + URL + bars pattern. Holds at the end.
 */
export const Scene9Closer: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  // No fade out for the closer — let it hold to the very end
  const fadeOut = 1;

  // The wordmark draws line by line
  const PER_LINE_START = 8;
  const PER_LINE_DURATION = 18;

  // Tagline appears after wordmark is mostly drawn
  const taglineProgress = interpolate(frame, [80, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const taglineInsetRight = (1 - taglineProgress) * 100;

  // URL appears after tagline
  const urlOpacity = interpolate(frame, [140, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Bars pattern decoration
  const barsProgress = interpolate(frame, [170, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '160px 90px',
        flexDirection: 'column',
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/09-closer.mp3')} />

      {/* Wordmark drawing in line by line */}
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.2,
          color: palette.ink,
          whiteSpace: 'pre',
          textAlign: 'left',
          marginBottom: 56,
        }}
      >
        {WORDMARK_LINES.map((line, i) => {
          const start = i * PER_LINE_START;
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

      {/* Tagline */}
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 56,
          lineHeight: 1.15,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 880,
          clipPath: `inset(0 ${taglineInsetRight}% 0 0)`,
          marginBottom: 36,
        }}
      >
        donde vive el conocimiento que sobrevive.
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 20,
          fontWeight: 500,
          color: palette.accent,
          letterSpacing: '0.02em',
          opacity: urlOpacity,
          marginBottom: 40,
        }}
      >
        github.com/madebyjred-sudo/CORTEX-CLI
      </div>

      {/* Bars pattern */}
      <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const localProgress = Math.max(0, Math.min(1, barsProgress * 9 - i));
          return (
            <div
              key={i}
              style={{
                width: 32,
                height: 4,
                background: palette.ink,
                opacity: localProgress,
                transform: `scaleX(${localProgress})`,
                transformOrigin: 'left',
              }}
            />
          );
        })}
      </div>

    </AbsoluteFill>
  );
};
