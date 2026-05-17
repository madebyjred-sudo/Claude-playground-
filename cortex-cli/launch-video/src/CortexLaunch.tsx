import {AbsoluteFill} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {PaperBackground} from './components/PaperBackground';
import {Header} from './components/Header';
import {Scene0Hook} from './scenes/Scene0Hook';
import {Scene1Wordmark} from './scenes/Scene1Wordmark';
import {Scene2Problem} from './scenes/Scene2Problem';
import {Scene3Pivot} from './scenes/Scene3Pivot';
import {Scene4Layers} from './scenes/Scene4Layers';
import {Scene5Movements} from './scenes/Scene5Movements';
import {Scene6Handoff} from './scenes/Scene6Handoff';
import {Scene7Closer} from './scenes/Scene7Closer';
import {fps} from './theme';
import {buildFontFaceCSS} from './fonts';

// Scene durations in seconds. Total = 50s, more breathing room than v1.
const D = {
  scene0: 7, // NEW · hook
  scene1: 5,
  scene2: 6,
  scene3: 6,
  scene4: 8,
  scene5: 9,
  scene6: 6,
  scene7: 3,
} as const;

const TRANSITION_FRAMES = 12; // ~400ms crossfade between scenes

const f = (s: number) => Math.round(s * fps);

const FONT_CSS = buildFontFaceCSS();

/**
 * Master composition. Paper + header are persistent across all scenes.
 * Scenes live inside a TransitionSeries with a 12-frame crossfade
 * between each — softens the manifesto-cuts into something more
 * cinematic for LinkedIn while keeping the editorial tone.
 *
 * @font-face declarations injected via inline <style> so the browser
 * loads them through standard CSS, no delayRender needed.
 */
export const CortexLaunch: React.FC = () => {
  return (
    <AbsoluteFill>
      <style>{FONT_CSS}</style>

      <PaperBackground />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={f(D.scene0)}>
          <Scene0Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene1)}>
          <Scene1Wordmark />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene2)}>
          <Scene2Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene3)}>
          <Scene3Pivot />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene4)}>
          <Scene4Layers />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene5)}>
          <Scene5Movements />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene6)}>
          <Scene6Handoff />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={f(D.scene7)}>
          <Scene7Closer />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Header />
    </AbsoluteFill>
  );
};

/**
 * Total composition duration. Sum of all scenes plus the 7 transition
 * windows in between. TransitionSeries handles the overlap math, but
 * we need to know the total for the <Composition durationInFrames>.
 *
 * 50s of scenes + 7 transitions × 0 frames extra (transitions overlap
 * scene tails, they don't add length). So total stays at sum of scenes.
 *
 * Actually @remotion/transitions transitions consume frames from both
 * adjacent scenes during the overlap window — TOTAL duration is the
 * sum of all sequence durations minus (transitions × transition_frames).
 *
 * Sum: 7+5+6+6+8+9+6+3 = 50s. 7 transitions × 12 frames = 84 frames
 * absorbed into overlaps. Final length: 50s - 84/30s = ~47.2s.
 */
export const TOTAL_DURATION_FRAMES = Math.round(
  (D.scene0 + D.scene1 + D.scene2 + D.scene3 + D.scene4 + D.scene5 + D.scene6 + D.scene7) * fps -
    7 * TRANSITION_FRAMES,
);
