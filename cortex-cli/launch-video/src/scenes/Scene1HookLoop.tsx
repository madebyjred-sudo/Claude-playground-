import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 1 · hook · loop (6.0s · audio 01-hook-loop.mp3)
 *
 * Universal "explaining a project" content — generic enough that any
 * professional viewing the video can substitute their own context.
 */

const LINES = [
  'Hola. Te explico el contexto.',
  'El proyecto es para un cliente.',
  'El objetivo principal es…',
  'El plazo lo tenemos en dos semanas.',
  'Los stakeholders son varios.',
  'Las restricciones que tenemos son…',
];

export const Scene1HookLoop: React.FC = () => {
  const frame = useCurrentFrame();

  const linesVisible = Math.floor(
    interpolate(frame, [10, 140], [0, LINES.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }),
  );

  const currentLineIdx = Math.min(linesVisible, LINES.length - 1);
  const lineStartFrame = 10 + currentLineIdx * (130 / LINES.length);
  const currentLineProgress = interpolate(
    frame,
    [lineStartFrame, lineStartFrame + 22],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
  );

  const fadeOut = interpolate(frame, [165, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
        opacity: fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/01-hook-loop.mp3')} />
      <div
        style={{
          width: 780,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '28px 36px',
          boxShadow: '0 8px 20px rgba(27, 44, 79, 0.15)',
          minHeight: 360,
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: palette.accent,
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          lunes 9:47
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 18,
            fontWeight: 400,
            color: palette.ink,
            lineHeight: 1.6,
          }}
        >
          <span style={{color: palette.accent}}>&gt; </span>
          {LINES.slice(0, currentLineIdx).map((line, i) => (
            <span key={i} style={{display: 'block'}}>
              {line}
            </span>
          ))}
          {currentLineIdx < LINES.length && (
            <span style={{display: 'block'}}>
              {LINES[currentLineIdx].slice(
                0,
                Math.floor(LINES[currentLineIdx].length * currentLineProgress),
              )}
              <span
                style={{
                  opacity: frame % 24 < 12 ? 1 : 0,
                  color: palette.accent,
                }}
              >
                ▌
              </span>
            </span>
          )}
        </div>
      </div>

      <Caption text="Pasaste una hora explicándole tu proyecto a tu IA. Te escuchó. Te ayudó." />
    </AbsoluteFill>
  );
};
