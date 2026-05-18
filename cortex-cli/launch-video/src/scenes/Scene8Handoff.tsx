import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 8 · handoff (8.7s · audio 08-handoff.mp3)
 *
 * "Cualquier IA lo lee. Cuando terminás, te devuelve la versión
 *  actualizada. Vos la guardás. Mañana seguís donde quedaste."
 *
 * Visual: the CORTEX.md file in the center, three AI brand marks
 * around it (Claude · ChatGPT · Gemini) — abstract glyphs in their
 * brand colors, no full logos to avoid trademark issues but still
 * recognizable. /handoff command appears, file pulses "updated".
 */

const AILogo: React.FC<{
  name: string;
  color: string;
  symbol: string;
  opacity: number;
  x: number;
  y: number;
}> = ({name, color, symbol, opacity, x, y}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 56,
          color,
          lineHeight: 1,
          fontFamily: fontFamily.sans,
        }}
      >
        {symbol}
      </div>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.20em',
          color: palette.ink,
          textTransform: 'uppercase',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const Scene8Handoff: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [245, 261], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Logos appear staggered when narration says "cualquier IA lo lee"
  const claudeOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const gptOpacity = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const geminiOpacity = interpolate(frame, [26, 46], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // File appears in center
  const fileOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // /handoff command typewriter
  const command = '> /handoff';
  const typeStart = 100;
  const typedChars = Math.max(
    0,
    Math.min(command.length, Math.floor((frame - typeStart) * 2.2)),
  );
  const commandOpacity = interpolate(frame, [typeStart, typeStart + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // File updates pulse (terracota highlight on "Última actualización")
  const updateStart = 130;
  const updatePulse =
    frame >= updateStart && frame < updateStart + 60
      ? 0.5 + 0.5 * Math.sin((frame - updateStart) * 0.35)
      : 0;

  // Closing line
  const closingOpacity = interpolate(frame, [200, 234], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/08-handoff.mp3')} />

      {/* Logos pushed lower so the caption at top has room */}
      <AILogo
        name="claude"
        color="#D97757"
        symbol="✱"
        opacity={claudeOpacity}
        x={200}
        y={380}
      />
      <AILogo
        name="chatgpt"
        color="#0F0F0F"
        symbol="❋"
        opacity={gptOpacity}
        x={480}
        y={380}
      />
      <AILogo
        name="gemini"
        color="#4285F4"
        symbol="✦"
        opacity={geminiOpacity}
        x={780}
        y={380}
      />

      {/* Command line above the file */}
      <div
        style={{
          position: 'absolute',
          top: 540,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: fontFamily.mono,
          fontSize: 24,
          fontWeight: 500,
          color: palette.ink,
          opacity: commandOpacity,
        }}
      >
        {command.slice(0, typedChars)}
        <span
          style={{
            opacity: frame % 20 < 10 ? 1 : 0,
            color: palette.accent,
          }}
        >
          ▌
        </span>
      </div>

      {/* CORTEX file in center */}
      <div
        style={{
          position: 'absolute',
          top: 620,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 560,
          background: '#F5EBD0',
          border: `2px solid ${palette.ink}`,
          padding: '22px 28px',
          boxShadow: '0 8px 24px rgba(27, 44, 79, 0.18)',
          opacity: fileOpacity,
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 18,
            fontWeight: 600,
            color: palette.ink,
            marginBottom: 14,
          }}
        >
          CORTEX-mincyt.md
        </div>
        <div
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 13,
            color: palette.text,
            opacity: 0.7,
            marginBottom: 12,
          }}
        >
          &gt; Última actualización:{' '}
          <span
            style={{
              color: `rgba(160, 67, 43, ${updatePulse})`,
              fontWeight: 600,
              transition: 'color 0.1s',
            }}
          >
            ahora
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {['SINAPSIS', 'HIPOCAMPO', 'CONEXIONES', 'ABIERTAS', 'NOTAS PROPIAS'].map(
            (label) => (
              <div
                key={label}
                style={{
                  fontFamily: fontFamily.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.20em',
                  color: palette.accent,
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Closing line at the bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: fontFamily.blackletter,
          fontSize: 52,
          lineHeight: 1.1,
          color: palette.ink,
          opacity: closingOpacity,
          padding: '0 60px',
        }}
      >
        mañana seguís donde quedaste.
      </div>

      <Caption text="Cualquier IA lo lee. Cuando terminás, te devuelve la versión actualizada." />
    </AbsoluteFill>
  );
};
