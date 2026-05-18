import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';
import {Caption} from '../components/Caption';

/**
 * SCENE 4 · objection (~3.0s · audio 04-objection.mp3)
 *
 * "Y tú me dirás... «pero mi IA me recuerda»."
 *
 * The setup phrase "Y tú me dirás" lands first (small, sans),
 * then the quoted objection lands big (blackletter, italic, with
 * decorative quote marks) — framing this as the viewer's thought,
 * not the narrator's.
 */
export const Scene4Objection: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Setup phrase appears first
  const setupOpacity = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // The quote reveals after the setup phrase
  const quoteProgress = interpolate(frame, [26, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const quoteInsetRight = (1 - quoteProgress) * 100;

  // Decorative quotation marks pulse in
  const decoQuoteOpacity = interpolate(frame, [22, 42], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
        flexDirection: 'column',
        gap: 32,
        opacity: fadeIn * fadeOut,
        position: 'relative',
      }}
    >
      <Audio src={staticFile('audio/scenes/04-objection.mp3')} />

      {/* Setup phrase — narrator's line */}
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: palette.ink,
          opacity: setupOpacity,
          fontStyle: 'italic',
        }}
      >
        y tú me dirás…
      </div>

      {/* Decorative opening quote — viewer's voice */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          left: '14%',
          fontFamily: fontFamily.blackletter,
          fontSize: 220,
          color: palette.accent,
          opacity: decoQuoteOpacity,
          lineHeight: 1,
        }}
      >
        «
      </div>

      <div
        style={{
          fontFamily: fontFamily.blackletter,
          fontSize: 88,
          lineHeight: 1.1,
          color: palette.ink,
          textAlign: 'center',
          maxWidth: 820,
          fontStyle: 'italic',
          clipPath: `inset(0 ${quoteInsetRight}% 0 0)`,
        }}
      >
        pero mi IA me recuerda.
      </div>

      {/* Decorative closing quote */}
      <div
        style={{
          position: 'absolute',
          bottom: '32%',
          right: '14%',
          fontFamily: fontFamily.blackletter,
          fontSize: 220,
          color: palette.accent,
          opacity: decoQuoteOpacity,
          lineHeight: 1,
        }}
      >
        »
      </div>

      <Caption text="Y tú me dirás: «pero mi IA me recuerda»." />
    </AbsoluteFill>
  );
};
