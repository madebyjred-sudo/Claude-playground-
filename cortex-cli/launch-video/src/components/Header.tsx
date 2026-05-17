import {AbsoluteFill} from 'remotion';
import {palette} from '../theme';
import {fontFamily} from '../fonts';

const MARGIN_X = 90;
const MARGIN_Y = 80;

/**
 * Persistent JR header across all scenes — brand left, date right.
 * Always visible, never animates.
 */
export const Header: React.FC = () => {
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: MARGIN_Y,
          left: MARGIN_X,
          right: MARGIN_X,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: palette.ink,
          fontFamily: fontFamily.sans,
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{letterSpacing: '0.25em'}}>JR</span>
        <span style={{letterSpacing: '0.22em'}}>05·17·2026</span>
      </div>
    </AbsoluteFill>
  );
};
