import {AbsoluteFill, Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 1 · loop (~7.5s · audio 01-hook-loop.mp3)
 *
 * Two beats:
 *
 *   Beat A (0–1.5s): four chat tiles flash in across the canvas —
 *   visual payoff for the hook's "varios frentes a la vez". Each
 *   tile shows a different work-front context being typed in.
 *
 *   Beat B (1.5s+): three tiles fade out while one tile scales up
 *   to center stage. Audio (clip 01) starts here. The narration
 *   "Pasaste una hora explicándole tu proyecto…" now lands on the
 *   single chat we're following, while the multi-front context is
 *   still freshly visible in the viewer's short-term memory.
 */

const TILES = [
  {
    stamp: '09:12 · cliente',
    text: 'te paso el contexto del proyecto…',
    position: {top: '18%', left: '6%'},
  },
  {
    stamp: '11:08 · propuesta',
    text: 'necesito armar la propuesta para el board…',
    position: {top: '18%', right: '6%'},
  },
  {
    stamp: '14:22 · pitch',
    text: 'estoy preparando un pitch nuevo para…',
    position: {bottom: '38%', left: '6%'},
  },
  {
    stamp: '16:45 · brief',
    text: 'te explico el brief del rebrand…',
    position: {bottom: '38%', right: '6%'},
  },
];

// The chat that takes center stage during Beat B.
const FOCUSED_LINES = [
  'Hola. Te explico el contexto.',
  'El proyecto es para un cliente.',
  'El objetivo principal es…',
  'El plazo lo tenemos en dos semanas.',
  'Los stakeholders son varios.',
  'Las restricciones que tenemos son…',
];

const MultiChatTile: React.FC<{
  stamp: string;
  text: string;
  position: React.CSSProperties;
  appearStart: number;
  fadeStart: number;
  frame: number;
}> = ({stamp, text, position, appearStart, fadeStart, frame}) => {
  const appear = interpolate(frame, [appearStart, appearStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fade = interpolate(frame, [fadeStart, fadeStart + 14], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const scaleOut = interpolate(frame, [fadeStart, fadeStart + 14], [1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Type partial of the text — visible activity per tile
  const typedChars = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - appearStart - 4) * 1.6)),
  );

  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        width: 360,
        background: '#F5EBD0',
        border: `2px solid ${palette.ink}`,
        padding: '14px 18px',
        boxShadow: '0 4px 12px rgba(27, 44, 79, 0.10)',
        opacity: appear * fade,
        transform: `scale(${scaleOut})`,
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
          fontSize: 13,
          color: palette.ink,
          lineHeight: 1.4,
          minHeight: 18,
        }}
      >
        <span style={{color: palette.accent}}>&gt; </span>
        {text.slice(0, typedChars)}
        <span style={{opacity: frame % 22 < 11 ? 1 : 0, color: palette.accent}}>▌</span>
      </div>
    </div>
  );
};

const FocusedChat: React.FC<{frame: number; localFrame: number}> = ({frame, localFrame}) => {
  // Scales up from 0.7 → 1.0 across the focus transition
  const grow = interpolate(localFrame, [0, 20], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const appear = interpolate(localFrame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Within the focused chat, type 6 lines progressively over ~5 seconds
  const linesVisible = Math.floor(
    interpolate(localFrame, [20, 160], [0, FOCUSED_LINES.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }),
  );
  const currentLineIdx = Math.min(linesVisible, FOCUSED_LINES.length - 1);
  const lineStartFrame = 20 + currentLineIdx * (140 / FOCUSED_LINES.length);
  const currentLineProgress = interpolate(
    localFrame,
    [lineStartFrame, lineStartFrame + 22],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)},
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${grow})`,
        width: 780,
        background: '#F5EBD0',
        border: `2px solid ${palette.ink}`,
        padding: '28px 36px',
        boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
        minHeight: 360,
        opacity: appear,
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
          color: palette.ink,
          lineHeight: 1.6,
        }}
      >
        <span style={{color: palette.accent}}>&gt; </span>
        {FOCUSED_LINES.slice(0, currentLineIdx).map((line, i) => (
          <span key={i} style={{display: 'block'}}>
            {line}
          </span>
        ))}
        {currentLineIdx < FOCUSED_LINES.length && (
          <span style={{display: 'block'}}>
            {FOCUSED_LINES[currentLineIdx].slice(
              0,
              Math.floor(FOCUSED_LINES[currentLineIdx].length * currentLineProgress),
            )}
            <span style={{opacity: frame % 24 < 12 ? 1 : 0, color: palette.accent}}>▌</span>
          </span>
        )}
      </div>
    </div>
  );
};

export const Scene1HookLoop: React.FC = () => {
  const frame = useCurrentFrame();

  // Multi-chat → focus transition pivots at frame 45 (1.5s into scene)
  const TRANSITION_FRAME = 45;

  const fadeOut = interpolate(frame, [210, 225], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      {/* Audio starts when the focus transition lands */}
      <Sequence from={TRANSITION_FRAME}>
        <Audio src={staticFile('audio/scenes/01-hook-loop.mp3')} />
      </Sequence>

      {/* Beat A · four tiles flash in (multi-front). Fade out by frame 45. */}
      {TILES.map((tile, i) => (
        <MultiChatTile
          key={i}
          stamp={tile.stamp}
          text={tile.text}
          position={tile.position}
          appearStart={i * 4}
          fadeStart={TRANSITION_FRAME}
          frame={frame}
        />
      ))}

      {/* Beat B · focused single chat, scales in as the others fade */}
      {frame >= TRANSITION_FRAME - 4 && (
        <FocusedChat frame={frame} localFrame={frame - TRANSITION_FRAME} />
      )}

      <Caption text="Pasaste una hora explicándole tu proyecto a tu IA. Te escuchó. Te ayudó." />
    </AbsoluteFill>
  );
};
