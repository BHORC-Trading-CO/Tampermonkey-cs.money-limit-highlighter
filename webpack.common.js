const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@root": path.resolve(__dirname),
      "@src": path.resolve(__dirname, "src"),
    },
  },
  plugins: [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })],
  output: {
    // filename: "[name].js",
    filename: (pathData) => {
      if (pathData.chunk.name.includes("iframe")) {
        return "pages/[name]/[name].js";
      } else {
        return "js/[name].js";
      }
    },
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "fonts/[name][ext]",
    clean: true,
  }, // chrome will look for files under dist/* folder
  performance: {
    hints: production ? "warning" : false,
    maxAssetSize: 2000000,
    maxEntrypointSize: 2000000,
  },
  mode: production ? "production" : "development",
  devtool: production ? "cheap-source-map" : "source-map",
};
