import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * Persistent closed-caption at the bottom of every scene. Renders
 * what the voice is saying. Small Figtree, ink with reduced opacity
 * so it never fights the main visual.
 */
export const Caption: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [4, 14], [0, 0.65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 56,
        left: 90,
        right: 90,
        textAlign: 'center',
        fontFamily: fontFamily.sans,
        fontSize: 16,
        fontWeight: 500,
        color: palette.ink,
        opacity,
        letterSpacing: '0.01em',
        lineHeight: 1.45,
        maxWidth: 900,
        margin: '0 auto',
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  );
};
