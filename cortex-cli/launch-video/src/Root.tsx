import {Composition} from 'remotion';
import {CortexLaunch, TOTAL_DURATION_FRAMES} from './CortexLaunch';
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
    </>
  );
};
