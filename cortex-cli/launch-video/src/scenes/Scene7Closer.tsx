import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
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
 * SCENE 7 · closer (26–30s · 120 frames local)
 *
 * Wordmark returns smaller. Tagline. URL. Bars pattern draws across.
 */
export const Scene7Closer: React.FC = () => {
  const frame = useCurrentFrame();

  const wordmarkOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [16, 32], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlOpacity = interpolate(frame, [44, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bars pattern drawing left → right
  const barsProgress = interpolate(frame, [56, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '180px 90px',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 11,
          lineHeight: 1.05,
          color: palette.ink,
          whiteSpace: 'pre',
          opacity: wordmarkOpacity,
          marginBottom: 80,
        }}
      >
        {WORDMARK_LINES.join('\n')}
      </div>

      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 72,
          lineHeight: 1.1,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 880,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginBottom: 48,
        }}
      >
        un protocolo. cinco capas. cualquier IA.
      </div>

      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 20,
          fontWeight: 500,
          color: palette.accent,
          letterSpacing: '0.02em',
          opacity: urlOpacity,
        }}
      >
        github.com/madebyjred-sudo/CORTEX-CLI
      </div>

      {/* bars pattern decoration */}
      <div
        style={{
          marginTop: 64,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const localProgress = Math.max(
            0,
            Math.min(1, barsProgress * 9 - i),
          );
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
