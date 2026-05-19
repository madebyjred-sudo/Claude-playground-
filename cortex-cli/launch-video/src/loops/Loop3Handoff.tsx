import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {PaperBackground} from '../components/PaperBackground';
import {buildFontFaceCSS} from '../fonts';

const FONT_CSS = buildFontFaceCSS();

/**
 * LOOP 3 · FUNCIONA EN CUALQUIER IA (10s · 300 frames @ 30fps · 1080×1080)
 *
 * Text-first. The file flows from a Drive folder into three AI
 * brand marks (Claude, ChatGPT, Gemini). Each landing pulses the
 * brand color. Headline owns the top of the frame; subline at the
 * bottom carries the action verb.
 */

const HEADLINE = 'FUNCIONA EN CUALQUIER IA.';
const SUBLINE = 'pegás. conversás. seguís donde quedaste.';
const FILENAME = 'CORTEX-mi-proyecto.md';

const AITile: React.FC<{
  name: string;
  color: string;
  symbol: string;
  x: number;
  pulseStart: number;
  frame: number;
}> = ({name, color, symbol, x, pulseStart, frame}) => {
  // Each AI tile pulses bright when "the file arrives" at it
  const isPulsing = frame >= pulseStart && frame < pulseStart + 40;
  const pulse = isPulsing
    ? 1 + Math.sin((frame - pulseStart) * 0.35) * 0.08
    : 1;
  const brightness = interpolate(frame, [pulseStart, pulseStart + 8], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 480,
        left: x,
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        transform: `scale(${pulse})`,
      }}
    >
      <div
        style={{
          fontSize: 84,
          color,
          lineHeight: 1,
          opacity: brightness,
          fontFamily: fontFamily.sans,
        }}
      >
        {symbol}
      </div>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.20em',
          color: palette.ink,
          opacity: brightness,
          textTransform: 'uppercase',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const Loop3Handoff: React.FC = () => {
  const frame = useCurrentFrame();

  const headlineChars = Math.max(
    0,
    Math.min(HEADLINE.length, Math.floor((frame - 4) * 1.4)),
  );

  // File appears below headline
  const fileOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Tiles appear one by one as if the file "lands" at each
  const subline = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const fadeOut = interpolate(frame, [285, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <style>{FONT_CSS}</style>
      <PaperBackground />

      {/* HEADLINE · top */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 60,
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

      {/* FILE · top-middle */}
      <div
        style={{
          position: 'absolute',
          top: 280,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: fileOpacity,
        }}
      >
        <div
          style={{
            width: 360,
            background: '#F5EBD0',
            border: `2px solid ${palette.ink}`,
            padding: '16px 22px',
            boxShadow: '0 8px 20px rgba(27, 44, 79, 0.18)',
          }}
        >
          <div
            style={{
              fontFamily: fontFamily.mono,
              fontSize: 16,
              fontWeight: 600,
              color: palette.ink,
            }}
          >
            # {FILENAME}
          </div>
        </div>
      </div>

      {/* THREE AIs · the file flows down into them */}
      <AITile name="claude" color="#D97757" symbol="✱" x={140} pulseStart={100} frame={frame} />
      <AITile name="chatgpt" color="#0F0F0F" symbol="❋" x={440} pulseStart={150} frame={frame} />
      <AITile name="gemini" color="#4285F4" symbol="✦" x={740} pulseStart={200} frame={frame} />

      {/* SUBLINE · bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 90,
          right: 90,
          textAlign: 'center',
          fontFamily: fontFamily.sans,
          fontSize: 30,
          fontWeight: 600,
          color: palette.ink,
          opacity: subline,
          letterSpacing: '0.005em',
        }}
      >
        {SUBLINE}
      </div>
    </AbsoluteFill>
  );
};
