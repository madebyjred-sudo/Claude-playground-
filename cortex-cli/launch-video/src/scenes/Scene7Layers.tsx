import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 7 · cinco capas (10.7s · audio 07-layers.mp3)
 *
 * Audio cadence (measured from the actual clip, voice says each
 * layer ~2.0-2.2s apart):
 *   Sinapsis        ~0.0s → frame 0
 *   Hipocampo       ~2.2s → frame 66
 *   Conexiones      ~4.5s → frame 135
 *   Abiertas        ~6.7s → frame 201
 *   Notas propias   ~8.7s → frame 261
 *
 * Layers now appear in the order the voice names them, with each
 * label timed precisely to its spoken moment. Below each name +
 * "para qué" line is a tighter benefit one-liner so the viewer
 * understands NOT just what the layer is for but what they GET
 * by having it.
 */

const BRAIN = `                                       ↑↑↑↑
                              ↑↑↑↑↑↑↑↑    ↑↑    ↑↑  ↑↑↑↑
                        ↑↑ ↑↑   ↑↑ ↑↑   ↑↑   ↑↑↑↑   ↑    ↑↑
                    ↑↑↑↑↑      ↑  ↑↑  ↑    ↑         ↑      ↑↑↑
                  ↑  ↑↑       ↑     ↑↑  ↑↑↑    ↑↑↑   ↑↑    ↑   ↑
              ↑↑↑↑ ↑↑      ↑↑      ↑      ↑    ↑↑    ↑     ↑    ↑↑
            ↑↑  ↑↑     ↑↑↑↑↑   ↑   ↑                 ↑↑       ↑   ↑
          ↑↑↑  ↑    ↑      ↑    ↑↑  ↑↑    ↑   ↑↑    ↑ ↑       ↑ ↑  ↑↑
         ↑↑↑  ↑   ↑  ↑↑  ↑↑↑    ↑      ↑      ↑   ↑ ↑ ↑     ↑↑       ↑
       ↑ ↑↑↑     ↑    ↑  ↑↑↑↑   ↑    ↑   ↑↑   ↑      ↑↑    ↑ ↑   ↑↑↑ ↑
      ↑ ↑ ↑↑↑↑↑ ↑     ↑  ↑ ↑↑   ↑     ↑  ↑    ↑     ↑   ↑  ↑        ↑↑ ↑
     ↑   ↑ ↑    ↑     ↑  ↑ ↑↑   ↑   ↑↑↑    ↑↑↑↑↑↑  ↑     ↑↑       ↑     ↑
    ↑↑ ↑↑↑  ↑  ↑      ↑   ↑↑  ↑ ↑↑  ↑↑↑↑↑↑         ↑          ↑↑   ↑↑↑  ↑↑
    ↑ ↑  ↑     ↑  ↑  ↑↑↑    ↑   ↑↑↑          ↑     ↑   ↑↑ ↑↑ ↑    ↑  ↑ ↑  ↑
    ↑↑↑   ↑            ↑↑↑     ↑↑           ↑↑  ↑  ↑  ↑↑     ↑  ↑   ↑ ↑ ↑ ↑
    ↑↑ ↑    ↑↑           ↑↑↑↑↑↑↑     ↑     ↑ ↑     ↑↑↑    ↑  ↑↑↑↑   ↑↑ ↑  ↑
    ↑↑   ↑↑↑   ↑↑↑   ↑↑ ↑      ↑    ↑↑↑↑ ↑↑  ↑            ↑     ↑        ↑ ↑
    ↑↑↑↑       ↑  ↑↑   ↑     ↑    ↑↑      ↑↑   ↑    ↑↑    ↑  ↑  ↑    ↑ ↑  ↑↑
      ↑↑ ↑         ↑↑ ↑    ↑  ↑↑↑↑           ↑↑↑↑↑     ↑↑↑      ↑    ↑     ↑
       ↑  ↑     ↑↑↑↑↑↑    ↑↑↑                    ↑         ↑  ↑↑ ↑↑   ↑↑   ↑
         ↑    ↑   ↑ ↑      ↑           ↑      ↑↑↑  ↑↑↑    ↑↑↑   ↑       ↑  ↑
            ↑↑↑↑   ↑↑    ↑   ↑↑  ↑ ↑  ↑      ↑       ↑↑↑ ↑↑↑↑↑↑↑  ↑↑↑↑↑↑
                   ↑↑↑ ↑ ↑        ↑     ↑↑↑     ↑↑↑↑↑↑↑↑ ↑   ↑↑     ↑↑↑
                   ↑             ↑         ↑↑↑↑↑↑↑ ↑↑↑↑↑ ↑↑  ↑↑↑↑↑↑↑↑↑ ↑
                    ↑ ↑      ↑  ↑     ↑↑↑↑    ↑↑↑ ↑↑↑↑↑↑ ↑↑↑↑↑    ↑↑↑↑↑↑
                     ↑             ↑↑↑↑ ↑↑     ↑↑↑↑↑↑↑↑↑↑↑↑ ↑↑↑       ↑↑
                      ↑↑↑↑↑↑    ↑↑       ↑↑↑ ↑↑↑ ↑ ↑ ↑ ↑↑↑↑ ↑↑↑     ↑↑↑
                             ↑               ↑   ↑ ↑ ↑ ↑↑ ↑  ↑↑↑  ↑↑↑↑
                                              ↑↑   ↑↑↑ ↑  ↑↑ ↑↑  ↑↑↑
                                                ↑↑   ↑↑↑↑↑↑↑↑↑↑↑↑
                                                  ↑    ↑↑↑↑↑↑↑
                                                   ↑   ↑
                                                   ↑↑  ↑
                                                    ↑   ↑
                                                     ↑  ↑
                                                     ↑↑↑`;

type Layer = {
  label: string;
  meaning: string;
  benefit: string;
  framePeak: number;
  position: React.CSSProperties;
  align: 'left' | 'right' | 'center';
};

// Order matches what the voice actually says in the audio clip.
const LAYERS: Layer[] = [
  {
    label: 'SINAPSIS',
    meaning: 'para los conceptos',
    benefit: 'encontrás tu pensamiento sin perderlo.',
    framePeak: 0,
    align: 'center',
    position: {top: 120, left: '50%', transform: 'translateX(-50%)'},
  },
  {
    label: 'HIPOCAMPO',
    meaning: 'para los hechos',
    benefit: 'no repetís lo que ya sabés.',
    framePeak: 66,
    align: 'right',
    position: {top: 300, right: 60},
  },
  {
    label: 'CONEXIONES',
    meaning: 'para las relaciones',
    benefit: 'ves cómo encajan tus ideas.',
    framePeak: 135,
    align: 'left',
    position: {top: 300, left: 60},
  },
  {
    label: 'ABIERTAS',
    meaning: 'para las preguntas',
    benefit: 'no perdés lo que falta resolver.',
    framePeak: 201,
    align: 'right',
    position: {bottom: 260, right: 80},
  },
  {
    label: 'NOTAS PROPIAS',
    meaning: 'para lo que pensás vos',
    benefit: 'tu interpretación, separada del hecho.',
    framePeak: 261,
    align: 'left',
    position: {bottom: 260, left: 80},
  },
];

const Label: React.FC<{layer: Layer; frame: number}> = ({layer, frame}) => {
  const appear = interpolate(frame, [layer.framePeak, layer.framePeak + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const isActive = frame >= layer.framePeak && frame < layer.framePeak + 55;
  const pulse = isActive ? 1 + Math.sin((frame - layer.framePeak) * 0.32) * 0.05 : 1;
  const accentBoost = isActive
    ? 1
    : interpolate(frame, [layer.framePeak + 30, layer.framePeak + 75], [1, 0.78], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  let dx = 0;
  let dy = 0;
  if (layer.align === 'left') dx = -28;
  if (layer.align === 'right') dx = 28;
  if (layer.align === 'center') dy = -28;
  const tx = (1 - appear) * dx;
  const ty = (1 - appear) * dy;

  const baseTransform =
    typeof layer.position.transform === 'string' ? layer.position.transform : '';
  const finalTransform = `${baseTransform} translate(${tx}px, ${ty}px) scale(${pulse})`.trim();

  // Benefit subtitle appears slightly after the label
  const benefitOpacity = interpolate(
    frame,
    [layer.framePeak + 14, layer.framePeak + 30],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
  );

  return (
    <div
      style={{
        position: 'absolute',
        ...layer.position,
        transform: finalTransform,
        textAlign: layer.align,
        opacity: appear,
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: palette.accent,
          opacity: accentBoost,
          textTransform: 'uppercase',
          lineHeight: 1.1,
        }}
      >
        {layer.label}
      </div>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 15,
          fontWeight: 500,
          color: palette.text,
          fontStyle: 'italic',
          marginTop: 6,
          opacity: 0.72,
        }}
      >
        · {layer.meaning}
      </div>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 14,
          fontWeight: 600,
          color: palette.ink,
          marginTop: 8,
          opacity: benefitOpacity * 0.88,
          maxWidth: 240,
          lineHeight: 1.35,
          letterSpacing: '0.01em',
        }}
      >
        {layer.benefit}
      </div>
    </div>
  );
};

export const Scene7Layers: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [305, 321], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  const brainPulse = 1 + Math.sin(frame * 0.07) * 0.015;
  const brainFadeIn = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeIn * fadeOut}}>
      <Audio src={staticFile('audio/scenes/07-layers.mp3')} />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${brainPulse})`,
          transformOrigin: 'center',
          opacity: brainFadeIn,
        }}
      >
        <pre
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 10,
            fontWeight: 500,
            lineHeight: 1.0,
            color: palette.ink,
            margin: 0,
            textAlign: 'left',
            whiteSpace: 'pre',
            letterSpacing: '-0.02em',
          }}
        >
          {BRAIN}
        </pre>
      </div>

      {LAYERS.map((layer) => (
        <Label key={layer.label} layer={layer} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};
