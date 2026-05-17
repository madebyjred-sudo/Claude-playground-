import {AbsoluteFill} from 'remotion';
import {palette} from '../theme';

/**
 * Cream paper background with the same SVG turbulence noise the
 * JR carousel uses. Static (does not animate) — motion lives on
 * top of it.
 */
export const PaperBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{background: palette.bg}}>
      <AbsoluteFill
        style={{
          opacity: 0.35,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.6  0 0 0 0 0.55  0 0 0 0 0.4  0 0 0 0.08 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
