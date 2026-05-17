import {AbsoluteFill, Sequence} from 'remotion';
import {PaperBackground} from './components/PaperBackground';
import {Header} from './components/Header';
import {Scene1Wordmark} from './scenes/Scene1Wordmark';
import {Scene2Problem} from './scenes/Scene2Problem';
import {Scene3Pivot} from './scenes/Scene3Pivot';
import {Scene4Layers} from './scenes/Scene4Layers';
import {Scene5Movements} from './scenes/Scene5Movements';
import {Scene6Handoff} from './scenes/Scene6Handoff';
import {Scene7Closer} from './scenes/Scene7Closer';
import {fps} from './theme';
import {buildFontFaceCSS} from './fonts';

// Scene durations in seconds (must sum to 30s)
const D = {
  scene1: 3,
  scene2: 3,
  scene3: 3,
  scene4: 6,
  scene5: 6,
  scene6: 5,
  scene7: 4,
} as const;

const f = (s: number) => Math.round(s * fps);

const FONT_CSS = buildFontFaceCSS();

/**
 * Master composition. Paper + header are persistent across all scenes.
 * Each Scene component lives inside its own Sequence — when its window
 * isn't active, it's unmounted (so animations reset cleanly per scene).
 *
 * Font faces are injected via inline <style> tag — the browser loads
 * them as standard webfonts (font-display: block means no FOUT).
 */
export const CortexLaunch: React.FC = () => {
  let offset = 0;
  const at = (seconds: number) => {
    const v = offset;
    offset += f(seconds);
    return v;
  };

  return (
    <AbsoluteFill>
      <style>{FONT_CSS}</style>

      <PaperBackground />

      <Sequence from={at(D.scene1)} durationInFrames={f(D.scene1)}>
        <Scene1Wordmark />
      </Sequence>
      <Sequence from={at(D.scene2)} durationInFrames={f(D.scene2)}>
        <Scene2Problem />
      </Sequence>
      <Sequence from={at(D.scene3)} durationInFrames={f(D.scene3)}>
        <Scene3Pivot />
      </Sequence>
      <Sequence from={at(D.scene4)} durationInFrames={f(D.scene4)}>
        <Scene4Layers />
      </Sequence>
      <Sequence from={at(D.scene5)} durationInFrames={f(D.scene5)}>
        <Scene5Movements />
      </Sequence>
      <Sequence from={at(D.scene6)} durationInFrames={f(D.scene6)}>
        <Scene6Handoff />
      </Sequence>
      <Sequence from={at(D.scene7)} durationInFrames={f(D.scene7)}>
        <Scene7Closer />
      </Sequence>

      <Header />
    </AbsoluteFill>
  );
};
