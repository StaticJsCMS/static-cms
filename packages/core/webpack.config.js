const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const devServerPort = parseInt(process.env.STATIC_CMS_DEV_SERVER_PORT || `${8080}`);

function moduleNameToPath(libName) {
  return path.resolve(__dirname, '..', '..', 'node_modules', libName);
}

module.exports = {
  entry: './src/index.ts',
  mode: isProduction ? 'production' : 'development',
  devtool: 'source-map',
  externals: isProduction
    ? {
        react: 'react',
        'react-dom': 'react-dom',
      }
    : {},
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /(node_modules[\\/]@toast-ui[\\/]editor[\\/]dist)/,
          /(node_modules[\\/]nth-check[\\/]lib)/,
          /(node_modules[\\/]minimatch[\\/]dist)/,
          /(src[\\/]formats[\\/]util)/,
        ],
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behavior
        },
      },
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [!isProduction && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: [
          ...['ol', 'codemirror', '@toast-ui'].map(moduleNameToPath),
          path.resolve(__dirname, 'src'),
        ],
        use: [
          !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
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
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    !isProduction && new ReactRefreshWebpackPlugin(),
    isProduction && new MiniCssExtractPlugin(),
    new webpack.IgnorePlugin({ resourceRegExp: /^esprima$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /moment\/locale\// }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      STATIC_CMS_CORE_VERSION: JSON.stringify(`${pkg.version}${isProduction ? '' : '-dev'}`),
    }),
  ].filter(Boolean),
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: 'static-cms-core.js',
    library: {
      name: 'StaticCmsCore',
      type: 'umd',
    },
  },
  devServer: {
    static: {
      directory: './dev-test',
      watch: false,
    },
    host: '0.0.0.0',
    port: devServerPort,
    hot: true,
  },
};
