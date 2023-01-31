import breakpoints from '../theme/variables/_breakpoints.module.scss';
declare const theme: {
    breakpoints: {
        up(breakpoint: keyof typeof breakpoints): string;
        down(breakpoint: keyof typeof breakpoints): string;
        between(a: keyof typeof breakpoints, b: keyof typeof breakpoints): string;
    };
};
export type ITheme = typeof theme;
export default theme;
