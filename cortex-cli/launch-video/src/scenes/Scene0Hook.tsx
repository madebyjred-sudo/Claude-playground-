import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 0 · hook (0–7s · 210 frames local)
 *
 * Three beats of the same prompt being typed at different days/times.
 * Visually it's the same chat-input frame, with the date/time changing.
 * Closer headline: "otra vez desde cero." — names the pain the viewer
 * has just relived.
 */

const PROMPT = 'hola, te explico el contexto de mi proyecto…';

const ChatRow: React.FC<{stamp: string; charsPerFrame?: number}> = ({
  stamp,
  charsPerFrame = 1.6,
}) => {
  const frame = useCurrentFrame();
  const stampOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const typedChars = Math.max(
    0,
    Math.min(PROMPT.length, Math.floor((frame - 6) * charsPerFrame)),
  );
  const visibleText = PROMPT.slice(0, typedChars);
  // Frame the chat composition
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
      }}
    >
      <div
        style={{
          width: 720,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '24px 32px',
          boxShadow: '0 8px 20px rgba(27, 44, 79, 0.15)',
          opacity: stampOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: palette.accent,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          {stamp}
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 20,
            fontWeight: 400,
            color: palette.ink,
            lineHeight: 1.5,
            minHeight: 60,
          }}
        >
          <span style={{color: palette.accent}}>&gt; </span>
          {visibleText}
          <span
            style={{
              opacity: frame % 22 < 11 ? 1 : 0,
              color: palette.accent,
            }}
          >
            ▌
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene0Hook: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Beat 1: lunes */}
      <Sequence from={0} durationInFrames={45}>
        <ChatRow stamp="lunes 9:47" />
      </Sequence>
      {/* Beat 2: jueves */}
      <Sequence from={45} durationInFrames={45}>
        <ChatRow stamp="jueves 16:15" />
      </Sequence>
      {/* Beat 3: lunes again */}
      <Sequence from={90} durationInFrames={45}>
        <ChatRow stamp="lunes 10:02" />
      </Sequence>
      {/* Beat 4: the closer headline */}
      <Sequence from={135} durationInFrames={75}>
        <CloserHeadline />
      </Sequence>
    </AbsoluteFill>
  );
};

const CloserHeadline: React.FC = () => {
  const frame = useCurrentFrame();
  // Reveal via clip-path (drawn-in effect)
  const progress = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const insetRight = (1 - progress) * 100;
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 128,
          lineHeight: 1.05,
          color: palette.ink,
          textAlign: 'center',
          clipPath: `inset(0 ${insetRight}% 0 0)`,
        }}
      >
        otra vez desde cero.
      </div>
    </AbsoluteFill>
  );
};
