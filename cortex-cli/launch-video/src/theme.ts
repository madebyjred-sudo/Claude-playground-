/**
 * JR editorial design system — palette, typography, dimensions.
 *
 * Mirrors carousel-template/style.css so the launch video reads as
 * the same brand object: cream paper, navy ink, terracota accents,
 * blackletter headline + sans body.
 */

export const palette = {
  bg: '#E8DCBE',          // paper cream
  ink: '#1B2C4F',         // primary navy
  accent: '#A0432B',      // terracota
  watermark: '#C9C29A',   // muted cream — for low-contrast decoration
  text: '#1A1A1A',        // body near-black
} as const;

export const fonts = {
  blackletter: '"Old London", "UnifrakturCook", "UnifrakturMaguntia", serif',
  sans: '"Söhne", "Figtree", system-ui, -apple-system, sans-serif',
} as const;

export const tracking = {
  meta: '0.18em',         // header meta (brand / date)
  brand: '0.25em',
  date: '0.22em',
  label: '0.22em',        // "THE INSIGHT 01"
} as const;

/**
 * Composition formats. We export the same content at two ratios.
 *
 *   portrait:  1080×1350 — matches JR carousel · LinkedIn / IG feed
 *   square:    1080×1080 — LinkedIn / IG square posts
 */
export const formats = {
  portrait: {width: 1080, height: 1350},
  square: {width: 1080, height: 1080},
} as const;

export const fps = 30;
