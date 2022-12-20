import breakpoints from '../theme/variables/_breakpoints.module.scss';

const BREAKPOINT_SUBTRACT = 0.02;

const theme = {
  breakpoints: {
    ...breakpoints,
    up(breakpoint: keyof typeof breakpoints): string {
      return `(min-width: ${breakpoints[breakpoint] ?? '0'})`;
    },
    down(breakpoint: keyof typeof breakpoints): string {
      return `(max-width: ${parseFloat(breakpoints[breakpoint] ?? '0') - BREAKPOINT_SUBTRACT}px)`;
    },
    between(a: keyof typeof breakpoints, b: keyof typeof breakpoints): string {
      return `${this.up(a)} and ${this.down(b)}`;
    },
  },
};

export type ITheme = typeof theme;
export default theme;
