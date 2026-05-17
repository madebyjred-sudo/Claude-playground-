import {Composition} from 'remotion';
import {CortexLaunch} from './CortexLaunch';
import {formats, fps} from './theme';

// Total launch video: 35s @ 30fps = 1050 frames
const DURATION_FRAMES = 35 * fps;

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
