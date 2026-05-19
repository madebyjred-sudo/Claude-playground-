import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 1 · TU IA TE OLVIDA CADA VEZ (8s · 240 frames @ 30fps · 1080×1080)
 *
 * Text-first. Big headline owns the top half of the frame from frame
 * zero so the scroller understands the message in autoplay-silent.
 * The chat visual below shows three days (lunes / martes / miércoles)
 * each re-typing the SAME context — visualizing the loop.
 */

const HEADLINE = 'TU IA TE OLVIDA CADA VEZ.';
const DAYS = ['lunes', 'martes', 'miércoles'];
const PROMPT = '> te explico el contexto del proyecto...';

export const Loop1Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // Headline typewriter (slow, deliberate)
  const headlineChars = Math.max(
    0,
    Math.min(HEADLINE.length, Math.floor((frame - 4) * 1.4)),
  );

  // Three cycles of 60 frames each for the chat
  const CYCLE = 60;
  const cycleIdx = Math.min(2, Math.floor(frame / CYCLE));
  const cycleFrame = frame % CYCLE;
  const typedChars =
    cycleFrame < 40
      ? Math.floor((cycleFrame / 40) * PROMPT.length)
      : PROMPT.length;
  const chatOpacity =
    cycleFrame < 45
      ? 1
      : interpolate(cycleFrame, [45, 60], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.cubic),
        });

  // Closing fade for seamless loop
  const fadeOut = interpolate(frame, [225, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <style>{FONT_CSS}</style>
      <PaperBackground />

      {/* HEADLINE · top third */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 64,
          fontWeight: 700,
          color: palette.ink,
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
        }}
      >
        {HEADLINE.slice(0, headlineChars)}
        {headlineChars < HEADLINE.length && (
          <span
            style={{
              opacity: frame % 22 < 11 ? 1 : 0,
              color: palette.accent,
              marginLeft: 4,
            }}
          >
            ▌
          </span>
        )}
      </div>

      {/* CHAT · middle */}
      <div
        style={{
          position: 'absolute',
          top: 380,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 90px',
        }}
      >
        <div
          style={{
            width: 760,
            background: '#F5EBD0',
            border: `2px solid ${palette.ink}`,
            padding: '24px 32px',
            boxShadow: '0 8px 20px rgba(27, 44, 79, 0.15)',
            minHeight: 180,
            opacity: chatOpacity,
          }}
        >
          <div
            style={{
              fontFamily: fontFamily.sans,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: palette.accent,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {DAYS[cycleIdx]} · chat nuevo
          </div>
          <div
            style={{
              fontFamily: fontFamily.mono,
              fontSize: 22,
              color: palette.ink,
              lineHeight: 1.5,
              minHeight: 64,
            }}
          >
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
      </div>

      {/* SUBTITLE · bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 26,
          fontWeight: 500,
          color: palette.ink,
          opacity: 0.7,
          fontStyle: 'italic',
        }}
      >
        otra semana. otro chat. el mismo contexto desde cero.
      </div>
    </AbsoluteFill>
  );
};
