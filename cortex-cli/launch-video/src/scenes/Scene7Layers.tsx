import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 7 · five layers (10.7s · audio 07-layers.mp3)
 *
 * The 5 capas appear one by one, each timed to when the voice names
 * it. Layer name appears in accent terracota, the "para qué" function
 * appears in body text.
 *
 * Audio cadence (measured from clip):
 *   Sinapsis     ~0.0s — 1.6s
 *   Hipocampo    ~2.0s — 3.6s
 *   Conexiones   ~4.0s — 5.6s
 *   Abiertas     ~6.0s — 7.4s
 *   Notas        ~8.0s — 10.2s
 *
 * Frames assume 30fps. Each layer reveals at the start of its
 * spoken phrase, holds through its function description.
 */

const LAYERS = [
  {label: 'SINAPSIS', meaning: 'para los conceptos.', frameStart: 0},
  {label: 'HIPOCAMPO', meaning: 'para los hechos.', frameStart: 60},
  {label: 'CONEXIONES', meaning: 'para las relaciones.', frameStart: 120},
  {label: 'ABIERTAS', meaning: 'para las preguntas.', frameStart: 180},
  {label: 'NOTAS PROPIAS', meaning: 'para lo que pensás vos.', frameStart: 240},
];

export const Scene7Layers: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [305, 321], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
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
      <Audio src={staticFile('audio/scenes/07-layers.mp3')} />

      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: palette.accent,
          textTransform: 'uppercase',
          marginBottom: 28,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          }),
        }}
      >
        las cinco capas
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          width: 820,
        }}
      >
        {LAYERS.map((layer) => {
          const labelOpacity = interpolate(
            frame,
            [layer.frameStart, layer.frameStart + 14],
            [0, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
          );
          const labelX = interpolate(
            frame,
            [layer.frameStart, layer.frameStart + 14],
            [-30, 0],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
          );
          const meaningOpacity = interpolate(
            frame,
            [layer.frameStart + 14, layer.frameStart + 34],
            [0, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
          );
          // The just-named layer pulses subtly
          const isActive = frame >= layer.frameStart && frame < layer.frameStart + 50;
          const pulse = isActive
            ? 1 + Math.sin((frame - layer.frameStart) * 0.35) * 0.04
            : 1;
          return (
            <div
              key={layer.label}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 18,
                opacity: labelOpacity,
                transform: `translateX(${labelX}px) scale(${pulse})`,
                transformOrigin: 'left',
                borderBottom: `1px solid ${palette.ink}33`,
                paddingBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: fontFamily.sans,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: '0.20em',
                  color: palette.accent,
                  textTransform: 'uppercase',
                  minWidth: 280,
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
                  opacity: meaningOpacity,
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
