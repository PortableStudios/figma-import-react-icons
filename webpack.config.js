const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const reactIconsPackageJson = path.resolve(
  __dirname,
  './node_modules/react-icons/package.json'
);

// Based on https://github.com/figma/plugin-samples/tree/master/webpack
module.exports = (env, argv) => {
  return {
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
      ui: './src/ui.ts',
      code: './src/code.ts',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          loader: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.DefinePlugin({
        // Fix missing symbol error when running in developer VM
        global: {},
        // At compile time read the version from the `react-icons` package.json
        // Then inject the value so we can display it in the UI
        REACT_ICONS_VERSION: webpack.DefinePlugin.runtimeValue(() => {
          const file = fs.readFileSync(reactIconsPackageJson);
          const json = JSON.parse(file);
          return JSON.stringify(json.version);
        }, [reactIconsPackageJson]),
      }),
      // Generate "ui.html" and inline the "ui.ts" file
      new HtmlWebpackPlugin({
        template: './src/ui.html',
        filename: 'ui.html',
        inlineSource: '.(js)$',
        chunks: ['ui'],
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
      // Add bundle analyzer plugin if ANALYZE environment variable is true
      ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
    ],
    stats: argv.watch ? 'errors-only' : 'normal',
  };
};
