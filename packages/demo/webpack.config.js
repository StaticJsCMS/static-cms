const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const devServerPort = parseInt(process.env.STATIC_CMS_DEMO_DEV_SERVER_PORT || `${3300}`);

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  mode: isProduction ? "production" : "development",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  devServer: {
    static: {
      directory: "./dev-test",
    },
    host: "0.0.0.0",
    port: devServerPort,
    hot: true,
  },
};
