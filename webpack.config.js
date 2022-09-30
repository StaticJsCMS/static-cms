const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const devServerPort = parseInt(process.env.SIMPLE_CMS_DEV_SERVER_PORT || `${8080}`);

function moduleNameToPath(libName) {
  return path.resolve(__dirname, 'node_modules', libName);
}

module.exports = {
  entry: './src/index.js',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        include: ['ol', 'react-datetime', 'codemirror'].map(moduleNameToPath),
        use: ['to-string-loader', 'css-loader'],
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom'  },
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^esprima$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /moment\/locale\// }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'simple-cms-core.js',
    library: {
      name: 'SimpleCmsCore',
      type: 'umd',
    },
  },
  devServer: {
    static: {
      directory: './dev-test',
    },
    host: '0.0.0.0',
    port: devServerPort,
  },
};
