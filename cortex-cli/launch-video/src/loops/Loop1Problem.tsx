import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 1 · el problema (6s · 180 frames @ 30fps · 1080×1080 square)
 *
 * Silent loop. Three cycles of typing context into a chat input,
 * each one fading away before the next begins. End state matches
 * start state for seamless looping.
 *
 *   Cycle: 60 frames
 *     0-44   typing
 *     45-59  fade out
 *
 * Used in LinkedIn carousel post · slot 1 · the pain.
 */

const PROMPT = 'Hola. Te explico el contexto del proyecto...';

export const Loop1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const CYCLE = 60;
  const cycleFrame = frame % CYCLE;

  // Type out the prompt over the first 40 frames of each cycle
  const typedChars =
    cycleFrame < 40
      ? Math.floor((cycleFrame / 40) * PROMPT.length)
      : PROMPT.length;

  // Fade out during last 15 frames so the loop transition is invisible
  const opacity =
    cycleFrame < 45
      ? 1
      : interpolate(cycleFrame, [45, 60], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <style>{FONT_CSS}</style>
      <PaperBackground />

      <div
        style={{
          width: 760,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '28px 36px',
          boxShadow: '0 8px 20px rgba(27, 44, 79, 0.15)',
          minHeight: 200,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: palette.accent,
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          chat
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 22,
            fontWeight: 400,
            color: palette.ink,
            lineHeight: 1.6,
            minHeight: 64,
          }}
        >
          <span style={{color: palette.accent}}>&gt; </span>
          {PROMPT.slice(0, typedChars)}
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
