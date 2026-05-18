import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 3 · restart (2.9s · audio 03-restart.mp3)
 *
 * Three stacked chat inputs, each starting to type the same prompt
 * "te explico el contexto…". Visualizes the loop: same context,
 * over and over.
 */
const REPEAT_LINE = '> te explico el contexto del proyecto…';

const Stub: React.FC<{stamp: string; opacity: number; delay: number}> = ({
  stamp,
  opacity,
  delay,
}) => {
  const frame = useCurrentFrame();
  const typedChars = Math.max(
    0,
    Math.min(
      REPEAT_LINE.length,
      Math.floor((frame - delay) * 1.6),
    ),
  );
  return (
    <div
      style={{
        width: 640,
        background: '#F5EBD0',
        border: `2px solid ${palette.ink}`,
        padding: '14px 24px',
        boxShadow: '0 4px 12px rgba(27, 44, 79, 0.10)',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.22em',
          color: palette.accent,
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {stamp}
      </div>
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 16,
          color: palette.ink,
        }}
      >
        {REPEAT_LINE.slice(0, typedChars)}
      </div>
    </div>
  );
};

export const Scene3Restart: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [75, 87], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Each stub fades in with stagger
  const op1 = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const op2 = interpolate(frame, [22, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const op3 = interpolate(frame, [44, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
        gap: 20,
        flexDirection: 'column',
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/03-restart.mp3')} />
      <Stub stamp="miércoles 10:14" opacity={op1} delay={4} />
      <Stub stamp="viernes 8:55" opacity={op2} delay={26} />
      <Stub stamp="lunes 11:08" opacity={op3} delay={48} />

      <Caption text="Volvés a empezar. Y otra vez. Y otra." />
    </AbsoluteFill>
  );
};
