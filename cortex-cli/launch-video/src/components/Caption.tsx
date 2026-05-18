import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * Persistent closed-caption. Now anchored to the TOP-quarter of the
 * frame (not the bottom) so it doesn't compete with social-feed
 * thumbnails or LinkedIn engagement UI.
 *
 * Scenes whose main visual ALREADY shows the same words on screen
 * should not mount this component (it would be duplicating). Caller
 * decides via inclusion / non-inclusion.
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
        top: '22%',
        left: 90,
        right: 90,
        textAlign: 'center',
        fontFamily: fontFamily.sans,
        fontSize: 20,
        fontWeight: 600,
        color: palette.ink,
        opacity,
        letterSpacing: '0.005em',
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
