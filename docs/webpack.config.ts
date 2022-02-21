import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

import pkg from '../package.json';
import plugin from '../src/plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  mode: 'development',
  entry: { [`scripts/app-${pkg.version}`]: path.resolve(dirname, './src/index.tsx') },
  output: {
    path: path.resolve(dirname, './public/js'),
    publicPath: '',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  stats: {
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    env: true,
    chunkOrigins: false,
    depth: false,
    entrypoints: true,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: true,
    moduleTrace: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: true,
    source: false,
    timings: true,
    usedExports: false,
    version: true,
    warnings: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env'],
                  ...plugin({
                    // ...options
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    liveReload: true,
    port: 9000,
    historyApiFallback: true,
  },
  plugins: [
    new ESLintPlugin({ extensions: ['ts', 'tsx'] }),
    new HtmlWebpackPlugin({ inject: 'body', template: path.resolve(dirname, './src/static/index.ejs') }),
    // TODO: for devMode only
    // new BundleAnalyzerPlugin(),
  ],
};

export default config;
