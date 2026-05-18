import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 7 · cinco capas (10.7s · audio 07-layers.mp3)
 *
 * ASCII brain centered. Each of the five layers lives in its own
 * position around the brain, with a "para qué" subtitle below the
 * label. Labels appear staggered to the voice naming each — pulsing
 * on activation, settling into place.
 *
 * Audio cadence (rough, voice says each layer ~2s apart):
 *   Sinapsis     ~0.0s → frame 0
 *   Hipocampo    ~2.0s → frame 60
 *   Conexiones   ~4.0s → frame 120
 *   Abiertas     ~6.0s → frame 180
 *   Notas        ~8.0s → frame 240
 */

const BRAIN = `       _.._.._.._
     ,'  )( )(  ',
    /  ((  ()  ))  \\
   |  (  ()()()  )  |
   |   \\\\  __  //   |
    \\   '-\\__/-'   /
     '._  ||  _,'
        '-||-'
          ||
         ====`;

type Layer = {
  label: string;
  meaning: string;
  framePeak: number;
  top: string;
  left?: string;
  right?: string;
  align: 'left' | 'right' | 'center';
};

const LAYERS: Layer[] = [
  {label: 'SINAPSIS',      meaning: 'para los conceptos',     framePeak: 0,   top: '14%', left:  '50%', align: 'center'},
  {label: 'HIPOCAMPO',     meaning: 'para los hechos',        framePeak: 60,  top: '48%', right: '6%',  align: 'right'},
  {label: 'CONEXIONES',    meaning: 'para las relaciones',    framePeak: 120, top: '70%', right: '12%', align: 'right'},
  {label: 'ABIERTAS',      meaning: 'para las preguntas',     framePeak: 180, top: '48%', left:  '6%',  align: 'left'},
  {label: 'NOTAS PROPIAS', meaning: 'para lo que pensás vos', framePeak: 240, top: '70%', left:  '12%', align: 'left'},
];

const Label: React.FC<{layer: Layer; frame: number}> = ({layer, frame}) => {
  const appear = interpolate(
    frame,
    [layer.framePeak, layer.framePeak + 18],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
  );

  let dx = 0;
  let dy = 0;
  if (layer.align === 'left') dx = -28;
  if (layer.align === 'right') dx = 28;
  if (layer.align === 'center') dy = -28;
  const tx = (1 - appear) * dx;
  const ty = (1 - appear) * dy;

  const isActive = frame >= layer.framePeak && frame < layer.framePeak + 50;
  const pulse = isActive ? 1 + Math.sin((frame - layer.framePeak) * 0.35) * 0.06 : 1;
  const accentBoost = isActive
    ? 1
    : interpolate(frame, [layer.framePeak + 30, layer.framePeak + 70], [1, 0.78], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  const baseTransform =
    layer.align === 'center'
      ? `translate(-50%, ${ty}px) scale(${pulse})`
      : `translate(${tx}px, ${ty}px) scale(${pulse})`;

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    top: layer.top,
    textAlign: layer.align,
    opacity: appear,
    transform: baseTransform,
    transformOrigin:
      layer.align === 'left' ? 'left center' : layer.align === 'right' ? 'right center' : 'center',
  };
  if (layer.left) posStyle.left = layer.left;
  if (layer.right) posStyle.right = layer.right;

  return (
    <div style={posStyle}>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '0.20em',
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
          fontSize: 17,
          fontWeight: 500,
          color: palette.text,
          fontStyle: 'italic',
          marginTop: 6,
          opacity: 0.78,
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

  // Brain breathes — continuous gentle pulse
  const brainPulse = 1 + Math.sin(frame * 0.08) * 0.02;
  const brainFadeIn = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeIn * fadeOut}}>
      <Audio src={staticFile('audio/scenes/07-layers.mp3')} />

      {/* ASCII brain centered */}
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
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.0,
            color: palette.ink,
            margin: 0,
            textAlign: 'left',
            whiteSpace: 'pre',
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
