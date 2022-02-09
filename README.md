https://setproduct.com/orion/templates

```ts
const colors = require('tailwindcss/colors');

const color = value => (typeof value === 'object' ? value.DEFAULT : value);
const shades = (light, normal, dark) => ({ DEFAULT: color(normal), dark: color(dark), light: color(light) });
const variant = ({ DEFAULT, ...variant }, gradient) => ({ DEFAULT, ...variant, gradient: gradient || DEFAULT });

const scheme = {
  white: colors.white,
  black: colors.gray[800],
  blue: shades(colors.blue[500], colors.blue[600], colors.blue[700]),
  green: shades(colors.emerald[500], colors.emerald[600], colors.emerald[700]),
  red: shades(colors.rose[400], colors.rose[500], colors.rose[600]), // TODO:
  orange: shades(colors.orange[400], colors.orange[500], colors.orange[600]), // TODO:
  gray: shades(colors.zinc[100], colors.zinc[200], colors.gray[500]),
};

module.exports = {
  colors: {
    ...scheme,
    // A primary color is the color displayed most frequently across your app's screens and components.
    primary: variant(scheme.blue, colors.violet[700]),
    // A secondary color provides more ways to accent and distinguish your product. Having a secondary color is optional, and should be applied sparingly to accent select parts of your UI.
    secondary: variant(shades(scheme.white, scheme.white, scheme.gray.dark)),
    neutral: variant(scheme.gray),
    // The area color appears behind scrollable content.
    area: color(scheme.white),
    // Surface colors affect surfaces of components, such as cards, sheets, and menus.
    surface: color(scheme.white),
    // The status colors indicates statuses in components, such as invalid text in a text field or successfully loading.
    status: {
      success: variant(scheme.green, colors.sky[700]),
      error: variant(scheme.red, colors.fuchsia[700]),
      warning: variant(scheme.orange, colors.red[600]),
    },
    on: {
      primary: {
        DEFAULT: scheme.white, // TODO:
        accent: scheme.black, // TODO:
      },
      secondary: {
        DEFAULT: scheme.black, // TODO:
        accent: scheme.black, // TODO:
      },
      area: {
        DEFAULT: scheme.black, // TODO:
        accent: scheme.black, // TODO:
        mask: scheme.black, // TODO:
      },
      surface: {
        DEFAULT: scheme.black, // TODO:
        accent: scheme.black, // TODO:
        mask: scheme.black, // TODO:
      },
      status: {
        success: scheme.white,
        error: scheme.white,
        warning: scheme.white,
      },
    },
  },
};
```
