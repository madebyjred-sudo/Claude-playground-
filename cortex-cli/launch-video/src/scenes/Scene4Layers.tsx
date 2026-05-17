import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

const LAYERS: {label: string; meaning: string}[] = [
  {label: 'SINAPSIS', meaning: 'conceptos núcleo'},
  {label: 'HIPOCAMPO', meaning: 'memoria de hechos'},
  {label: 'CONEXIONES', meaning: 'cómo se relacionan'},
  {label: 'ABIERTAS', meaning: 'preguntas no resueltas'},
  {label: 'NOTAS PROPIAS', meaning: 'interpretaciones'},
];

/**
 * SCENE 4 · cinco capas (9–15s · 180 frames local)
 *
 * The paper unfolds vertically. Each layer label slides in from the
 * left, terracota accent, staggered. Hold for ~2s at the end.
 */
export const Scene4Layers: React.FC = () => {
  const frame = useCurrentFrame();
  const STAGGER = 22;
  const SLIDE_DURATION = 26;

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '160px 90px',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: palette.accent,
          textTransform: 'uppercase',
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          }),
          marginBottom: 32,
        }}
      >
        las cinco capas
      </div>

      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 64,
          lineHeight: 1.05,
          color: palette.ink,
          textAlign: 'center',
          marginBottom: 80,
          opacity: interpolate(frame, [8, 28], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          }),
        }}
      >
        tu cortex tiene cerebro.
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: 760,
        }}
      >
        {LAYERS.map((layer, i) => {
          const start = 38 + i * STAGGER;
          const end = start + SLIDE_DURATION;
          const opacity = interpolate(frame, [start, end], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          const x = interpolate(frame, [start, end], [-50, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={layer.label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                opacity,
                transform: `translateX(${x}px)`,
                borderBottom: `1px solid ${palette.ink}33`,
                paddingBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: fontFamily.sans,
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: palette.accent,
                  textTransform: 'uppercase',
                  minWidth: 240,
                }}
              >
                {layer.label}
              </span>
              <span
                style={{
                  fontFamily: fontFamily.sans,
                  fontSize: 24,
                  fontWeight: 400,
                  color: palette.text,
                  fontStyle: 'italic',
                }}
              >
                · {layer.meaning}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
