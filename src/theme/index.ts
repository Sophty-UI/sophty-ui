import { Resolution } from '~/types/resolution';

import breakpoints from './modules/breakpoints.module.scss';
import spacings from './modules/spacings.module.scss';

const BREAKPOINT_SUBTRACT = 0.02;

const theme = {
  spacing: { ...spacings },
  breakpoint: {
    ...breakpoints,
    up(breakpoint: Resolution): string {
      return `(min-width: ${breakpoints[breakpoint] ?? ''})`;
    },
    down(breakpoint: Resolution): string {
      return `(max-width: ${parseFloat(breakpoints[breakpoint] ?? '') - BREAKPOINT_SUBTRACT}px)`;
    },
    between(a: Resolution, b: Resolution): string {
      return `${this.up(a)} and ${this.down(b)}`;
    },
  },
};

export type ITheme = typeof theme;
export default theme;
