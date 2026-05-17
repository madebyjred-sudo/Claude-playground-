import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 3 · pivot (6–9s · 90 frames local)
 *
 * Hard cut. Headline declares the solution. Below it, a paper sheet
 * materializes with the filename CORTEX-borges-aleph.md typed on top.
 */
export const Scene3Pivot: React.FC = () => {
  const frame = useCurrentFrame();

  const headlineOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sheetScale = interpolate(frame, [16, 32], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sheetOpacity = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const filename = 'CORTEX-borges-aleph.md';
  const typeStart = 38;
  const typePerChar = 1.4;
  const typedChars = Math.max(
    0,
    Math.min(filename.length, Math.floor((frame - typeStart) / typePerChar)),
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: '180px 90px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 128,
          lineHeight: 1.0,
          color: palette.ink,
          opacity: headlineOpacity,
          maxWidth: 900,
        }}
      >
        tu memoria es un archivo.
      </div>

      {/* paper sheet */}
      <div
        style={{
          marginTop: 80,
          width: 640,
          minHeight: 420,
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
            letterSpacing: '0',
            borderBottom: `1px solid ${palette.ink}33`,
            paddingBottom: 14,
            marginBottom: 18,
          }}
        >
          # {filename.slice(0, typedChars)}
          <span
            style={{
              opacity: frame % 20 < 10 ? 1 : 0,
              color: palette.accent,
            }}
          >
            ▌
          </span>
        </div>
        {/* preview of the cortex structure that appears after the filename */}
        <div
          style={{
            opacity: interpolate(frame, [56, 78], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {['SINAPSIS · conceptos núcleo', 'HIPOCAMPO · memoria de hechos', 'CONEXIONES · cómo se relacionan', 'ABIERTAS · preguntas no resueltas', 'NOTAS PROPIAS · interpretaciones'].map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: fontFamily.sans,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: palette.accent,
                textTransform: 'uppercase',
              }}
            >
              ## {line}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
