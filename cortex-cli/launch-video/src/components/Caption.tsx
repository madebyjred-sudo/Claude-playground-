import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * Persistent closed-caption. Full opacity, Figtree 18px, sits ~110px
 * from the bottom so it doesn't compete with the safe-zone of social
 * feeds while staying clearly readable.
 */
export const Caption: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 110,
        left: 90,
        right: 90,
        textAlign: 'center',
        fontFamily: fontFamily.sans,
        fontSize: 18,
        fontWeight: 600,
        color: palette.ink,
        opacity,
        letterSpacing: '0.01em',
        lineHeight: 1.4,
        maxWidth: 900,
        margin: '0 auto',
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  );
};
