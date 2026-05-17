import {Composition} from 'remotion';
import {CortexLaunch} from './CortexLaunch';
import {formats, fps} from './theme';

// Total: 30s @ 30fps = 900 frames
const DURATION_FRAMES = 30 * fps;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="cortex-launch"
        component={CortexLaunch}
        durationInFrames={DURATION_FRAMES}
        fps={fps}
        width={formats.portrait.width}
        height={formats.portrait.height}
      />
      <Composition
        id="cortex-launch-square"
        component={CortexLaunch}
        durationInFrames={DURATION_FRAMES}
        fps={fps}
        width={formats.square.width}
        height={formats.square.height}
      />
    </>
  );
};
