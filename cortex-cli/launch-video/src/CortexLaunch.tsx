import {AbsoluteFill, Series} from 'remotion';
import {PaperBackground} from './components/PaperBackground';
import {Header} from './components/Header';
import {Scene1HookLoop} from './scenes/Scene1HookLoop';
import {Scene2Amnesia} from './scenes/Scene2Amnesia';
import {Scene3Restart} from './scenes/Scene3Restart';
import {Scene4Objection} from './scenes/Scene4Objection';
import {Scene5PassiveMemory} from './scenes/Scene5PassiveMemory';
import {Scene6Pivot} from './scenes/Scene6Pivot';
import {Scene7Layers} from './scenes/Scene7Layers';
import {Scene8Handoff} from './scenes/Scene8Handoff';
import {Scene9Closer} from './scenes/Scene9Closer';
import {fps} from './theme';
import {buildFontFaceCSS} from './fonts';

/**
 * Scene durations in seconds — chosen to fit each audio clip plus
 * a small breathing buffer at the end of each scene. Total ~58.8s.
 *
 *   audio dur · buffer · scene dur
 *   01  5.5s    0.5s     6.0s
 *   02  2.8s    0.4s     3.2s
 *   03  2.5s    0.4s     2.9s
 *   04  1.7s    0.3s     2.0s
 *   05  7.3s    0.5s     7.8s
 *   06  8.8s    0.5s     9.3s
 *   07  10.2s   0.5s     10.7s
 *   08  8.2s    0.5s     8.7s
 *   09  6.7s    1.5s     8.2s  (longer hold for URL)
 */
const D = {
  s1: 6.0,
  s2: 3.2,
  s3: 2.9,
  s4: 3.0,   // grew to fit "Y tú me dirás…" setup
  s5: 7.3,   // shrunk slightly with new tighter phrasing
  s6: 9.3,
  s7: 10.7,
  s8: 8.7,
  s9: 8.2,
} as const;

const f = (s: number) => Math.round(s * fps);

const FONT_CSS = buildFontFaceCSS();

export const CortexLaunch: React.FC = () => {
  return (
    <AbsoluteFill>
      <style>{FONT_CSS}</style>

      <PaperBackground />

      <Series>
        <Series.Sequence durationInFrames={f(D.s1)}>
          <Scene1HookLoop />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s2)}>
          <Scene2Amnesia />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s3)}>
          <Scene3Restart />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s4)}>
          <Scene4Objection />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s5)}>
          <Scene5PassiveMemory />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s6)}>
          <Scene6Pivot />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s7)}>
          <Scene7Layers />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s8)}>
          <Scene8Handoff />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s9)}>
          <Scene9Closer />
        </Series.Sequence>
      </Series>

      <Header />
    </AbsoluteFill>
  );
};

export const TOTAL_DURATION_FRAMES = Math.round(
  (D.s1 + D.s2 + D.s3 + D.s4 + D.s5 + D.s6 + D.s7 + D.s8 + D.s9) * fps,
);
