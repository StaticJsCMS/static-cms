const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { flatMap } = require('lodash');

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const pkg = require('./package.json');

const devServerPort = parseInt(process.env.SIMPLE_CMS_DEV_SERVER_PORT || `${8080}`);

function moduleNameToPath(libName) {
  return path.resolve(__dirname, 'node_modules', libName);
}

function rules() {
  return {
    js: () => ({
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          rootMode: 'upward',
        },
      },
    }),
    css: () => [
      {
        test: /\.css$/,
        include: ['ol', 'react-datetime', 'codemirror'].map(moduleNameToPath),
        use: ['to-string-loader', 'css-loader'],
      },
    ],
    svg: () => ({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true, // true outputs JSX tags
          },
        },
      ],
    }),
  };
}

function plugins() {
  return {
    ignoreEsprima: () => new webpack.IgnorePlugin(/^esprima$/, /js-yaml/),
    ignoreMomentOptionalDeps: () => new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  };
}

function stats() {
  if (isProduction) {
    return {
      builtAt: false,
      chunks: false,
      colors: true,
      entrypoints: false,
      errorDetails: false,
      hash: false,
      modules: false,
      timings: false,
      version: false,
      warnings: false,
    };
  }
  return {
    all: false,
  };
}

module.exports = {
  context: process.cwd(),
  mode: isProduction ? 'production' : 'development',
  entry: './src',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: `simple-cms-core.js`,
    library: 'SimpleCmsCore',
    libraryTarget: 'umd',
    libraryExport: 'SimpleCmsCore',
    umdNamedDefine: true,
    globalObject: 'window',
  },
  module: {
    rules: flatMap(Object.values(rules()), rule => rule()),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      moment$: 'moment/moment.js',
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: isTest ? '' : 'source-map',
  target: 'web',
  stats: stats(),
  plugins: [
    ...Object.values(plugins()).map(plugin => plugin()),
    new webpack.DefinePlugin({
      SIMPLE_CMS_CORE_VERSION: JSON.stringify(`${pkg.version}${isProduction ? '' : '-dev'}`),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Simple CMS is now running at http://localhost:${devServerPort}`],
      },
    }),
  ],
  devServer: {
    contentBase: './dev-test',
    watchContentBase: true,
    publicPath: './dist',
    quiet: true,
    host: '0.0.0.0',
    port: devServerPort,
  },
};
