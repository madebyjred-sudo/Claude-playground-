import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

interface BeatProps {
  number: string;
  primary: string;
  secondary?: string;
}

const Beat: React.FC<BeatProps> = ({number, primary, secondary}) => {
  const frame = useCurrentFrame();
  const numberScale = interpolate(frame, [0, 24], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const numberOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const primaryProgress = interpolate(frame, [14, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const primaryInsetRight = (1 - primaryProgress) * 100;
  const secondaryOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 90px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontFamily: fontFamily.blackletter,
            fontSize: 240,
            lineHeight: 1,
            color: palette.accent,
            opacity: numberOpacity,
            transform: `scale(${numberScale})`,
            transformOrigin: 'center',
          }}
        >
          {number}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <div
            style={{
              fontFamily: fontFamily.blackletter,
              fontSize: 64,
              lineHeight: 1.1,
              color: palette.ink,
              maxWidth: 480,
              clipPath: `inset(0 ${primaryInsetRight}% 0 0)`,
            }}
          >
            {primary}
          </div>
          {secondary ? (
            <div
              style={{
                fontFamily: fontFamily.mono,
                fontSize: 18,
                fontWeight: 500,
                color: palette.text,
                opacity: secondaryOpacity,
                wordBreak: 'break-all',
                maxWidth: 480,
              }}
            >
              {secondary}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * SCENE 5 · tres movimientos (15–21s · 180 frames local)
 *
 * Three beats of ~60 frames each, hard cuts between them.
 */
export const Scene5Movements: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Beat number="1" primary="abrís tu IA favorita." />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Beat
          number="2"
          primary="pegás un link."
          secondary="raw.githubusercontent.com/.../SKILL.md"
        />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <Beat number="3" primary="conversás." />
      </Sequence>
    </AbsoluteFill>
  );
};
