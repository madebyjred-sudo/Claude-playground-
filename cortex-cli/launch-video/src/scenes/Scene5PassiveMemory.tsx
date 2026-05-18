import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 5 · passive memory (7.8s · audio 05-passive-memory.mp3)
 *
 * Differentiation: what current AI "memory" is vs what a project
 * needs. Two columns — left shows the kind of passive recall AIs do
 * (knows your name, your role), right shows the missing piece:
 * project consistency across sessions.
 */
export const Scene5PassiveMemory: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [220, 234], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Left column appears first (memoria pasiva)
  const leftOpacity = interpolate(frame, [12, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Right column appears later when narration says "no es la consistencia"
  const rightOpacity = interpolate(frame, [110, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Strike-through line across right column (X mark) — appears at end
  const strikeProgress = interpolate(frame, [160, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        flexDirection: 'column',
        gap: 32,
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/05-passive-memory.mp3')} />

      <div style={{display: 'flex', gap: 24, width: '100%', justifyContent: 'center'}}>
        {/* LEFT · memoria pasiva (what current AIs do) */}
        <div
          style={{
            width: 440,
            background: '#F5EBD0',
            border: `2px solid ${palette.ink}`,
            padding: '22px 26px',
            opacity: leftOpacity,
          }}
        >
          <div
            style={{
              fontFamily: fontFamily.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: palette.accent,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            memoria pasiva
          </div>
          <div
            style={{
              fontFamily: fontFamily.mono,
              fontSize: 14,
              color: palette.ink,
              lineHeight: 1.6,
            }}
          >
            <div>"Hola Juan."</div>
            <div>"Sé que sos consultor."</div>
            <div>"Sé que vivís en Colombia."</div>
          </div>
        </div>

        {/* RIGHT · consistencia de proyecto (what's missing) */}
        <div
          style={{
            width: 440,
            background: '#F5EBD0',
            border: `2px solid ${palette.ink}`,
            padding: '22px 26px',
            opacity: rightOpacity,
            position: 'relative',
          }}
        >
          <div
            style={{
              fontFamily: fontFamily.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: palette.accent,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            consistencia de proyecto
          </div>
          <div
            style={{
              fontFamily: fontFamily.mono,
              fontSize: 14,
              color: palette.ink,
              lineHeight: 1.6,
              opacity: 0.5,
            }}
          >
            <div>sesión 1 → sesión 2 → sesión 3</div>
            <div>contexto que viaja</div>
            <div>de principio a fin</div>
          </div>
          {/* X strike-through */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '4%',
              width: '92%',
              height: 3,
              background: palette.accent,
              transform: `scaleX(${strikeProgress}) rotate(-6deg)`,
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>

      {/* Closing line */}
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 44,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 820,
          opacity: interpolate(frame, [185, 220], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          }),
          marginTop: 24,
        }}
      >
        no es lo mismo.
      </div>
    </AbsoluteFill>
  );
};
