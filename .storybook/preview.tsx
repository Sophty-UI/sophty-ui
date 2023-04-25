import type { Preview } from '@storybook/react';

import React from 'react';

import ThemeProvider from '../src/providers/ThemeProvider';
import { Resolution } from '../src/types/resolution';

import '../src/theme/assets/preflight.css';

const viewports = Object.entries(Resolution).reduce((acc, [name, key]) => {
  const width = { xs: '320px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', sl: '1536px' }[key];

  return {
    ...acc,
    [key]: {
      name: `${name} (${key}: ${width})`,
      styles: { width, height: '100%' },
    },
  };
}, {});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    viewport: { viewports },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
