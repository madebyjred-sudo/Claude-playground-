import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 5 · passive memory (~7.5s · audio 05-passive-memory.mp3)
 *
 * "Y sí. Te guarda datos. Pero eso es memoria pasiva. No es la
 *  consistencia de un proyecto, de principio a fin."
 *
 * Left panel: what AIs do (remember basic facts about you).
 * Right panel: what they DON'T (project consistency across
 * sessions). Right panel gets struck through to mark the gap.
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

  // "Y sí" intro line lands first
  const introOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Left column appears (memoria pasiva — what they DO have)
  const leftOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Right column appears (consistencia — what they DON'T)
  const rightOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // X strike across the right column
  const strikeProgress = interpolate(frame, [150, 190], [0, 1], {
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
        gap: 28,
        opacity: fadeIn * fadeOut,
      }}
    >
      <Audio src={staticFile('audio/scenes/05-passive-memory.mp3')} />

      {/* push content below caption zone */}
      <div style={{height: 80}} />

      {/* "Y sí." opener */}
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 56,
          color: palette.ink,
          opacity: introOpacity,
          marginBottom: 4,
        }}
      >
        y sí…
      </div>

      <div style={{display: 'flex', gap: 24, width: '100%', justifyContent: 'center'}}>
        {/* LEFT · what passive memory does */}
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
            <div>"sé tu nombre."</div>
            <div>"sé a qué te dedicás."</div>
            <div>"sé de qué hablamos ayer."</div>
          </div>
        </div>

        {/* RIGHT · what's missing */}
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

      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 40,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 820,
          opacity: interpolate(frame, [185, 220], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          }),
          marginTop: 12,
        }}
      >
        no es lo mismo.
      </div>

      <Caption text="Y sí. Te guarda datos. Pero eso es memoria pasiva. No es la consistencia de un proyecto." />
    </AbsoluteFill>
  );
};
