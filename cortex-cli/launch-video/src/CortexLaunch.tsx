import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {PaperBackground} from './components/PaperBackground';
import {Header} from './components/Header';
import {SceneFrame} from './components/SceneFrame';
import {Scene0Hook} from './scenes/Scene0Hook';
import {Scene1HookLoop} from './scenes/Scene1HookLoop';
import {Scene2Amnesia} from './scenes/Scene2Amnesia';
import {Scene3Restart} from './scenes/Scene3Restart';
import {Scene4Objection} from './scenes/Scene4Objection';
import {Scene5PassiveMemory} from './scenes/Scene5PassiveMemory';
import {Scene6Pivot} from './scenes/Scene6Pivot';
import {Scene6bNameReveal} from './scenes/Scene6bNameReveal';
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
  s0: 11.6,  // viral hook
  s1: 7.5,   // multi-chat establish + focused loop
  s2: 3.2,   // amnesia
  s3: 2.9,   // restart loop
  s4: 3.0,   // objection
  s5: 7.3,   // passive memory
  s6: 9.3,   // pivot · "un cuaderno propio"
  s6b: 7.8,  // NAME REVEAL · "Le pusimos un nombre. Cortex."
  s7: 10.7,  // layers (now AFTER we've named it)
  s8: 8.7,   // handoff
  s9: 10.5,  // closer · extended hold so URL has time to read
} as const;

const f = (s: number) => Math.round(s * fps);

const FONT_CSS = buildFontFaceCSS();

export const CortexLaunch: React.FC = () => {
  return (
    <AbsoluteFill>
      <style>{FONT_CSS}</style>

      <PaperBackground />

      {/* Bass loop · Latin · subtle bed under the narration.
          Loops a ~22s sound-generation clip to cover the 59s video. */}
      <Audio
        src={staticFile('audio/music/bass.mp3')}
        volume={0.16}
        loop
      />

      <Series>
        {/* Each scene gets a distinct camera variant — no two consecutive
            transitions feel identical. The mix reads as varied camera
            language across a virtual canvas. */}
        <Series.Sequence durationInFrames={f(D.s0)}>
          <SceneFrame durationFrames={f(D.s0)} variant="zoom-in"><Scene0Hook /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s1)}>
          <SceneFrame durationFrames={f(D.s1)} variant="pan-right"><Scene1HookLoop /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s2)}>
          <SceneFrame durationFrames={f(D.s2)} variant="tilt-down"><Scene2Amnesia /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s3)}>
          <SceneFrame durationFrames={f(D.s3)} variant="pan-left"><Scene3Restart /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s4)}>
          <SceneFrame durationFrames={f(D.s4)} variant="zoom-in"><Scene4Objection /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s5)}>
          <SceneFrame durationFrames={f(D.s5)} variant="pan-right"><Scene5PassiveMemory /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s6)}>
          <SceneFrame durationFrames={f(D.s6)} variant="zoom-out"><Scene6Pivot /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s6b)}>
          <SceneFrame durationFrames={f(D.s6b)} variant="zoom-in"><Scene6bNameReveal /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s7)}>
          <SceneFrame durationFrames={f(D.s7)} variant="tilt-down"><Scene7Layers /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s8)}>
          <SceneFrame durationFrames={f(D.s8)} variant="pan-left"><Scene8Handoff /></SceneFrame>
        </Series.Sequence>
        <Series.Sequence durationInFrames={f(D.s9)}>
          <SceneFrame durationFrames={f(D.s9)} variant="zoom-out"><Scene9Closer /></SceneFrame>
        </Series.Sequence>
      </Series>

      <Header />
    </AbsoluteFill>
  );
};

export const TOTAL_DURATION_FRAMES = Math.round(
  (D.s0 + D.s1 + D.s2 + D.s3 + D.s4 + D.s5 + D.s6 + D.s6b + D.s7 + D.s8 + D.s9) * fps,
);
