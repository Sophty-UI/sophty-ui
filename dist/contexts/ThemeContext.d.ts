/// <reference types="react" />
declare const ThemeContext: import("react").Context<{
    breakpoints: {
        up(breakpoint: string | number): string;
        down(breakpoint: string | number): string;
        between(a: string | number, b: string | number): string;
    };
}>;
export default ThemeContext;
