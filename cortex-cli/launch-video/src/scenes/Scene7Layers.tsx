import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 7 · cinco capas (10.7s · audio 07-layers.mp3)
 *
 * Organic ASCII brain (drawn with ↑ characters) centered on the
 * canvas. Five layer labels orbit around it in their own positions.
 * Each label appears + pulses when the voice names it; the brain
 * itself breathes continuously.
 */

// Custom ASCII brain provided by Juan — organic, made of upward-arrow
// strokes that read as neural fibers / sulci. Trimmed leading and
// trailing empty rows from the source for tighter framing.
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
  framePeak: number;
  position: React.CSSProperties;
  align: 'left' | 'right' | 'center';
};

const LAYERS: Layer[] = [
  {
    label: 'SINAPSIS',
    meaning: 'para los conceptos',
    framePeak: 0,
    align: 'center',
    position: {top: 120, left: '50%', transform: 'translateX(-50%)'},
  },
  {
    label: 'ABIERTAS',
    meaning: 'para las preguntas',
    framePeak: 60,
    align: 'left',
    position: {top: 300, left: 60},
  },
  {
    label: 'HIPOCAMPO',
    meaning: 'para los hechos',
    framePeak: 120,
    align: 'right',
    position: {top: 300, right: 60},
  },
  {
    label: 'CONEXIONES',
    meaning: 'para las relaciones',
    framePeak: 180,
    align: 'left',
    position: {bottom: 280, left: 80},
  },
  {
    label: 'NOTAS PROPIAS',
    meaning: 'para lo que pensás vos',
    framePeak: 240,
    align: 'right',
    position: {bottom: 280, right: 80},
  },
];

const Label: React.FC<{layer: Layer; frame: number}> = ({layer, frame}) => {
  const appear = interpolate(
    frame,
    [layer.framePeak, layer.framePeak + 22],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
  );

  const isActive = frame >= layer.framePeak && frame < layer.framePeak + 55;
  const pulse = isActive ? 1 + Math.sin((frame - layer.framePeak) * 0.32) * 0.05 : 1;
  const accentBoost = isActive
    ? 1
    : interpolate(frame, [layer.framePeak + 30, layer.framePeak + 75], [1, 0.7], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  // Slide direction depends on side
  let dx = 0;
  let dy = 0;
  if (layer.align === 'left') dx = -28;
  if (layer.align === 'right') dx = 28;
  if (layer.align === 'center') dy = -28;
  const tx = (1 - appear) * dx;
  const ty = (1 - appear) * dy;

  // Combine the base position with the slide-in transform
  const baseTransform =
    typeof layer.position.transform === 'string' ? layer.position.transform : '';
  const finalTransform = `${baseTransform} translate(${tx}px, ${ty}px) scale(${pulse})`.trim();

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
          fontSize: 16,
          fontWeight: 500,
          color: palette.text,
          fontStyle: 'italic',
          marginTop: 8,
          opacity: 0.72,
          letterSpacing: '0.01em',
        }}
      >
        · {layer.meaning}
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

      {/* ASCII brain centered with subtle breath */}
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

      {/* Five layer labels positioned around the brain */}
      {LAYERS.map((layer) => (
        <Label key={layer.label} layer={layer} frame={frame} />
      ))}

      <Caption text="Sinapsis · Hipocampo · Conexiones · Abiertas · Notas propias." />
    </AbsoluteFill>
  );
};
