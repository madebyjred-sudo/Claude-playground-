import {useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

/**
 * Closed caption with typewriter reveal — letters appear one by one
 * at ~1.5 chars/frame. Positioned in the header zone (top: 156px)
 * so it never overlaps the main visual area of any scene.
 *
 * Scenes whose main visual already shows the same words on screen
 * should NOT mount this component (it would be duplicating).
 */
export const Caption: React.FC<{
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
}> = ({text, startFrame = 4, charsPerFrame = 1.5}) => {
  const frame = useCurrentFrame();
  const typedChars = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - startFrame) * charsPerFrame)),
  );
  const visible = text.slice(0, typedChars);
  const isComplete = typedChars >= text.length;

  return (
    <div
      style={{
        position: 'absolute',
        top: 156,
        left: 90,
        right: 90,
        textAlign: 'center',
        fontFamily: fontFamily.sans,
        fontSize: 19,
        fontWeight: 600,
        color: palette.ink,
        letterSpacing: '0.005em',
        lineHeight: 1.4,
        maxWidth: 900,
        margin: '0 auto',
        pointerEvents: 'none',
      }}
    >
      {visible}
      {!isComplete && (
        <span
          style={{
            opacity: frame % 16 < 8 ? 1 : 0,
            color: palette.accent,
            marginLeft: 2,
          }}
        >
          ▌
        </span>
      )}
    </div>
  );
};
