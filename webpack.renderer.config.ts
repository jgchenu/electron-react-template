import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { __DEV__ } from "./env";

const styleLoaderOrMiniCssLoader = __DEV__
  ? "style-loader"
  : MiniCssExtractPlugin.loader;

export const rendererConfig: Configuration = {
  module: {
    rules: rules.concat([
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: __DEV__,
              importLoaders: 2,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:8]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: styleLoaderOrMiniCssLoader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
        include: /node_modules/,
      },
    ]),
  },
  plugins: plugins.concat([
    new MiniCssExtractPlugin({
      filename: __DEV__ ? "[name].css" : "[name]-[contenthash:8].css",
    }),
  ]),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  devServer: {
    hot: true,
    allowedHosts: "all",
  },
};
