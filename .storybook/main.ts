import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/story.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: { autodocs: false },
  webpackFinal: async config => {
    if (config.resolve)
      config.resolve.alias = {
        ...config.resolve.alias,
        // Components
        '~/layouts': path.resolve(__dirname, '../src/components/layouts'),
        '~/utilities': path.resolve(__dirname, '../src/components/utilities'),
        // Project
        '~/contexts': path.resolve(__dirname, '../src/contexts'),
        '~/helpers': path.resolve(__dirname, '../src/helpers'),
        '~/hooks': path.resolve(__dirname, '../src/hooks'),
        '~/providers': path.resolve(__dirname, '../src/providers'),
        '~/types': path.resolve(__dirname, '../src/types'),
        '~/tools': path.resolve(__dirname, '../src/tools'),
      };

    if (config.module?.rules)
      config.module.rules.push({
        test: /\.s(a|c)ss$/,
        include: path.resolve(__dirname, '../'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.scss$/i,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          'sass-loader',
        ],
      });

    return config;
  },
};
export default config;
