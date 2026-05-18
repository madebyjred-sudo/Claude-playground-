import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * SCENE 4 · objection (2.0s · audio 04-objection.mp3)
 *
 * Visual punchline: the imagined viewer's objection in quote-style
 * blackletter. Short and snappy — sets up the differentiation that
 * comes in the next scene.
 */
export const Scene4Objection: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [50, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

  // Headline reveal
  const progress = interpolate(frame, [4, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const insetRight = (1 - progress) * 100;

  // Quotation marks pulse subtly
  const quoteOpacity = interpolate(frame, [0, 16], [0, 0.45], {
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
        opacity: fadeIn * fadeOut,
        position: 'relative',
      }}
    >
      <Audio src={staticFile('audio/scenes/04-objection.mp3')} />

      {/* Big decorative opening quote */}
      <div
        style={{
          position: 'absolute',
          top: '24%',
          left: '12%',
          fontFamily: fontFamily.blackletter,
          fontSize: 240,
          color: palette.accent,
          opacity: quoteOpacity,
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
          clipPath: `inset(0 ${insetRight}% 0 0)`,
        }}
      >
        pero mi IA me recuerda.
      </div>

      {/* Big decorative closing quote */}
      <div
        style={{
          position: 'absolute',
          bottom: '24%',
          right: '12%',
          fontFamily: fontFamily.blackletter,
          fontSize: 240,
          color: palette.accent,
          opacity: quoteOpacity,
          lineHeight: 1,
        }}
      >
        »
      </div>
    </AbsoluteFill>
  );
};
