import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/** The CORTEX ASCII wordmark, line by line. */
const WORDMARK_LINES = [
  '     ___/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\/\\/\\/\\____/\\/\\/\\/\\/\\/\\__/\\/\\/\\/\\/\\/\\__/\\/\\____/\\/\\_',
  '    _/\\/\\__________/\\/\\____/\\/\\__/\\/\\____/\\/\\______/\\/\\______/\\______________/\\/\\/\\/\\___',
  '   _/\\/\\__________/\\/\\____/\\/\\__/\\/\\/\\/\\/\\________/\\/\\______/\\/\\/\\/\\/\\________/\\/\\_____',
  '  _/\\/\\__________/\\/\\____/\\/\\__/\\/\\__/\\/\\________/\\/\\______/\\/\\____________/\\/\\/\\/\\___',
  ' ___/\\/\\/\\/\\/\\____/\\/\\/\\/\\____/\\/\\____/\\/\\______/\\/\\______/\\/\\/\\/\\/\\/\\__/\\/\\____/\\/\\_',
  '____________________________________________________________________________________',
];

/**
 * SCENE 1 · wordmark (0–3s · 90 frames)
 *
 * Each line of the ASCII wordmark reveals left-to-right via clip-path,
 * staggered ~270ms between lines, each line ~400ms.
 */
export const Scene1Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const PER_LINE_START = 6; // frames between line starts (~200ms)
  const PER_LINE_DURATION = 14; // frames per line reveal (~470ms)

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.2,
          letterSpacing: '0em',
          color: palette.ink,
          whiteSpace: 'pre',
          textAlign: 'left',
        }}
      >
        {WORDMARK_LINES.map((line, i) => {
          const start = i * PER_LINE_START;
          const end = start + PER_LINE_DURATION;
          const progress = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          // clip-path inset: start with right = 100% (hidden), reveal toward 0
          const insetRight = (1 - progress) * 100;
          return (
            <div
              key={i}
              style={{
                clipPath: `inset(0 ${insetRight}% 0 0)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* tagline appears after the wordmark finishes drawing */}
      <div
        style={{
          marginTop: 120,
          fontFamily: fontFamily.sans,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: palette.accent,
          opacity: interpolate(frame, [50, 65], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        la memoria que tu IA no tiene
      </div>
    </AbsoluteFill>
  );
};
