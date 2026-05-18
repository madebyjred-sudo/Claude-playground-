import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 6 · pivot (9.3s · audio 06-pivot.mp3)
 *
 * "Lo que necesitás no es una IA mejor. Es un cuaderno propio.
 *  Un archivo de texto, con cinco capas."
 *
 * Headline reveals → file materializes → layer labels start to show.
 */
export const Scene6Pivot: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [265, 279], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Headline reveals
  const headlineProgress = interpolate(frame, [4, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headlineInsetRight = (1 - headlineProgress) * 100;

  // Sheet materializes
  const sheetOpacity = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const sheetScale = interpolate(frame, [70, 110], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Filename typewriter
  const filename = 'CORTEX-mincyt.md';
  const typeStart = 115;
  const typedChars = Math.max(
    0,
    Math.min(filename.length, Math.floor((frame - typeStart) * 1.4)),
  );

  // Layer labels appear
  const layersOpacity = interpolate(frame, [170, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '180px 90px 80px',
        flexDirection: 'column',
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/06-pivot.mp3')} />

      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 88,
          lineHeight: 1.08,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 880,
          clipPath: `inset(0 ${headlineInsetRight}% 0 0)`,
          marginBottom: 56,
        }}
      >
        un cuaderno propio.
      </div>

      <div
        style={{
          width: 640,
          minHeight: 380,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '28px 36px',
          textAlign: 'left',
          opacity: sheetOpacity,
          transform: `scale(${sheetScale})`,
          boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 20,
            fontWeight: 600,
            color: palette.ink,
            borderBottom: `1px solid ${palette.ink}33`,
            paddingBottom: 14,
            marginBottom: 18,
          }}
        >
          # {filename.slice(0, typedChars)}
          <span
            style={{
              opacity: frame % 22 < 11 ? 1 : 0,
              color: palette.accent,
            }}
          >
            ▌
          </span>
        </div>
        <div
          style={{
            opacity: layersOpacity,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            'SINAPSIS',
            'HIPOCAMPO',
            'CONEXIONES',
            'ABIERTAS',
            'NOTAS PROPIAS',
          ].map((label) => (
            <div
              key={label}
              style={{
                fontFamily: fontFamily.sans,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: palette.accent,
                textTransform: 'uppercase',
              }}
            >
              ## {label}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
