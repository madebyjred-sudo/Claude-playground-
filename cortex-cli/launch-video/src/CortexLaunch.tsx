import {AbsoluteFill} from 'remotion';
import {palette, fonts} from './theme';

/**
 * SKELETON · placeholder composition until the storyboard is approved.
 *
 * The real video will be a sequence of scenes mounted here via
 * <Sequence> / <Series> primitives. For now we render the page tokens
 * so the user can preview the design system rendering correctly in
 * the Remotion Studio.
 */
export const CortexLaunch: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: palette.bg,
        fontFamily: fonts.sans,
        color: palette.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
        padding: 80,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          letterSpacing: '0.25em',
          fontWeight: 600,
        }}
      >
        JR · 05·17·2026
      </div>

      <div
        style={{
          fontFamily: fonts.blackletter,
          fontSize: 128,
          lineHeight: 1.0,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        cortex
      </div>

      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          letterSpacing: '0.22em',
          color: palette.accent,
          textTransform: 'uppercase',
          marginTop: 24,
        }}
      >
        storyboard pendiente — aprobá para empezar
      </div>

      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 22,
          maxWidth: 640,
          textAlign: 'center',
          lineHeight: 1.55,
          marginTop: 48,
          color: palette.text,
        }}
      >
        este es el lienzo. el sistema visual JR está vivo. cuando
        confirmes el storyboard, las escenas reemplazan este placeholder.
      </div>
    </AbsoluteFill>
  );
};
