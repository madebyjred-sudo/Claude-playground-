import {Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Per-scene wrapper that gives each Series.Sequence a soft 3D camera
 * feel: the incoming scene flies in from a slight right-back offset
 * with a touch of blur, settles to center, then flies out to the
 * left-back with the same blur. Combined with the per-scene fade-in/
 * fade-out animations inside each scene, this reads as a continuous
 * camera moving across a giant canvas.
 *
 * Knobs:
 *   transitionFrames  · how long the in/out flies last (12-18 ideal)
 *   maxTranslate      · how far off-center the scene starts (40-80)
 *   maxBlur           · how blurred the scene is at the extreme (4-10)
 *   perspective       · camera lens depth, larger = subtler (1500-2400)
 */
export const SceneFrame: React.FC<{
  durationFrames: number;
  children: React.ReactNode;
  transitionFrames?: number;
  maxTranslate?: number;
  maxBlur?: number;
  perspective?: number;
}> = ({
  durationFrames,
  children,
  transitionFrames = 16,
  maxTranslate = 60,
  maxBlur = 6,
  perspective = 2000,
}) => {
  const frame = useCurrentFrame();

  const enterProgress = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const exitProgress = interpolate(
    frame,
    [durationFrames - transitionFrames, durationFrames],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)},
  );

  const tx = (1 - enterProgress) * maxTranslate + exitProgress * -maxTranslate;
  const tz = (1 - enterProgress) * -140 + exitProgress * -140;
  const rotY = (1 - enterProgress) * 6 + exitProgress * -6;
  const blur = (1 - enterProgress) * maxBlur + exitProgress * maxBlur;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        perspective: `${perspective}px`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `translate3d(${tx}px, 0, ${tz}px) rotateY(${rotY}deg)`,
          filter: `blur(${blur}px)`,
          willChange: 'transform, filter',
        }}
      >
        {children}
      </div>
    </div>
  );
};
