import {Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Per-scene wrapper that gives each Series.Sequence its own camera-
 * move flavor. Five variants so the transition between scenes varies
 * — not the same animation every time:
 *
 *   pan-right   · enters from translate3d(+80, 0, -120) rotateY(8)
 *   pan-left    · enters from translate3d(-80, 0, -120) rotateY(-8)
 *   zoom-in     · enters from scale 0.82 with translateZ(-200)
 *   zoom-out    · enters from scale 1.18 with translateZ(+200)
 *   tilt-down   · enters from translateY(-60) rotateX(8)
 *
 * Exit always mirrors the entry direction (a panned-right scene
 * exits left, etc.) so the feeling is a continuous camera motion.
 *
 * Each variant ramps a 4-8px blur during transitions, which sells
 * the "in motion" feel.
 */

export type CameraVariant =
  | 'pan-right'
  | 'pan-left'
  | 'zoom-in'
  | 'zoom-out'
  | 'tilt-down';

const VARIANTS: Record<
  CameraVariant,
  {
    enter: {tx: number; ty: number; tz: number; rx: number; ry: number; scale: number};
    exit: {tx: number; ty: number; tz: number; rx: number; ry: number; scale: number};
  }
> = {
  'pan-right': {
    enter: {tx: 80, ty: 0, tz: -120, rx: 0, ry: 8, scale: 1},
    exit: {tx: -80, ty: 0, tz: -120, rx: 0, ry: -8, scale: 1},
  },
  'pan-left': {
    enter: {tx: -80, ty: 0, tz: -120, rx: 0, ry: -8, scale: 1},
    exit: {tx: 80, ty: 0, tz: -120, rx: 0, ry: 8, scale: 1},
  },
  'zoom-in': {
    enter: {tx: 0, ty: 0, tz: -260, rx: 0, ry: 0, scale: 0.82},
    exit: {tx: 0, ty: 0, tz: 200, rx: 0, ry: 0, scale: 1.12},
  },
  'zoom-out': {
    enter: {tx: 0, ty: 0, tz: 220, rx: 0, ry: 0, scale: 1.18},
    exit: {tx: 0, ty: 0, tz: -240, rx: 0, ry: 0, scale: 0.84},
  },
  'tilt-down': {
    enter: {tx: 0, ty: -60, tz: -160, rx: 8, ry: 0, scale: 1},
    exit: {tx: 0, ty: 60, tz: -160, rx: -8, ry: 0, scale: 1},
  },
};

export const SceneFrame: React.FC<{
  durationFrames: number;
  variant?: CameraVariant;
  children: React.ReactNode;
  transitionFrames?: number;
  maxBlur?: number;
  perspective?: number;
}> = ({
  durationFrames,
  variant = 'pan-right',
  children,
  transitionFrames = 16,
  maxBlur = 6,
  perspective = 2000,
}) => {
  const frame = useCurrentFrame();
  const v = VARIANTS[variant];

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

  // Lerp between (enter pose) → (identity) → (exit pose)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const tx = lerp(v.enter.tx, 0, enterProgress) + lerp(0, v.exit.tx, exitProgress);
  const ty = lerp(v.enter.ty, 0, enterProgress) + lerp(0, v.exit.ty, exitProgress);
  const tz = lerp(v.enter.tz, 0, enterProgress) + lerp(0, v.exit.tz, exitProgress);
  const rx = lerp(v.enter.rx, 0, enterProgress) + lerp(0, v.exit.rx, exitProgress);
  const ry = lerp(v.enter.ry, 0, enterProgress) + lerp(0, v.exit.ry, exitProgress);
  const scale = lerp(v.enter.scale, 1, enterProgress) * lerp(1, v.exit.scale, exitProgress);

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
          transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
          filter: `blur(${blur}px)`,
          willChange: 'transform, filter',
        }}
      >
        {children}
      </div>
    </div>
  );
};
