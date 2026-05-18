import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 0 · viral hook (~11.5s · audio 00-hook.mp3)
 *
 * Trojan-horse hook: starts with a LinkedIn-canonical insider-truth
 * structure that the audience is conditioned to stop scrolling for.
 *
 *   Line 1 (consensus):    "Todos saben que la IA necesita contexto."
 *   Line 2 (disruption):   "Pero nadie habla de lo cansón que es
 *                           prepararlo cada vez."
 *   Line 3 (targeting):    "Y más si manejás varios frentes a la vez."
 *
 * Visual hierarchy mirrors the rhetorical hierarchy: consensus reads
 * muted, disruption gets weight + accent underline on "cansón",
 * targeting reads as an italic aside.
 */
export const Scene0Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(frame, [325, 348], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Line 1 · "Todos saben que la IA necesita contexto."
  const line1Progress = interpolate(frame, [4, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const line1InsetRight = (1 - line1Progress) * 100;

  // Line 2 · "Pero nadie habla de lo cansón que es prepararlo cada vez."
  // Starts around frame 80 (~2.7s, after "necesita contexto")
  const line2Progress = interpolate(frame, [80, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const line2InsetRight = (1 - line2Progress) * 100;

  // Terracota underline on "cansón" — draws after line 2 lands
  const underlineProgress = interpolate(frame, [150, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Line 3 · "Y más si manejás varios frentes a la vez."
  // Starts around frame 220 (~7.3s, after the breath before "Y más")
  const line3Opacity = interpolate(frame, [220, 258], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const line3Y = interpolate(frame, [220, 258], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 110px',
        flexDirection: 'column',
        gap: 40,
        opacity: fadeOut,
        textAlign: 'center',
      }}
    >
      <Audio src={staticFile('audio/scenes/00-hook.mp3')} />

      {/* Line 1 · consensus · muted, smaller, sans */}
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 34,
          fontWeight: 500,
          color: palette.ink,
          opacity: 0.6,
          lineHeight: 1.3,
          maxWidth: 820,
          clipPath: `inset(0 ${line1InsetRight}% 0 0)`,
          letterSpacing: '-0.01em',
        }}
      >
        todos saben que la IA necesita contexto.
      </div>

      {/* Line 2 · disruption · blackletter, full weight, with underline on "cansón" */}
      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 76,
          lineHeight: 1.08,
          color: palette.ink,
          maxWidth: 880,
          clipPath: `inset(0 ${line2InsetRight}% 0 0)`,
          position: 'relative',
        }}
      >
        pero nadie habla de lo{' '}
        <span style={{position: 'relative', display: 'inline-block'}}>
          cansón
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -6,
              height: 6,
              background: palette.accent,
              transformOrigin: 'left',
              transform: `scaleX(${underlineProgress})`,
            }}
          />
        </span>{' '}
        que es prepararlo cada vez.
      </div>

      {/* Line 3 · targeting · italic, smaller, slightly muted */}
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 30,
          fontWeight: 500,
          fontStyle: 'italic',
          color: palette.ink,
          opacity: line3Opacity * 0.82,
          transform: `translateY(${line3Y}px)`,
          lineHeight: 1.3,
          maxWidth: 760,
          letterSpacing: '-0.005em',
        }}
      >
        y más si manejás varios frentes a la vez.
      </div>

      <Caption text="Todos saben que la IA necesita contexto. Pero nadie habla de lo cansón que es prepararlo cada vez. Y más si manejás varios frentes a la vez." />
    </AbsoluteFill>
  );
};
