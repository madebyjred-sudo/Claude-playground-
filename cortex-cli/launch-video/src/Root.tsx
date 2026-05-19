import {Composition} from 'remotion';
import {CortexLaunch, TOTAL_DURATION_FRAMES} from './CortexLaunch';
import {Loop1Problem} from './loops/Loop1Problem';
import {Loop2Solution} from './loops/Loop2Solution';
import {Loop3Handoff} from './loops/Loop3Handoff';
import {formats, fps} from './theme';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="cortex-launch"
        component={CortexLaunch}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={fps}
        width={formats.portrait.width}
        height={formats.portrait.height}
      />
      <Composition
        id="cortex-launch-square"
        component={CortexLaunch}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={fps}
        width={formats.square.width}
        height={formats.square.height}
      />

      {/* LinkedIn carousel · 3 silent square loops · text-first */}
      <Composition
        id="loop-1-problema"
        component={Loop1Problem}
        durationInFrames={240}
        fps={fps}
        width={formats.square.width}
        height={formats.square.height}
      />
      <Composition
        id="loop-2-solucion"
        component={Loop2Solution}
        durationInFrames={480}
        fps={fps}
        width={formats.square.width}
        height={formats.square.height}
      />
      <Composition
        id="loop-3-handoff"
        component={Loop3Handoff}
        durationInFrames={300}
        fps={fps}
        width={formats.square.width}
        height={formats.square.height}
      />
    </>
  );
};
