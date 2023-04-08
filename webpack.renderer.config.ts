import { DefinePlugin, Configuration } from "webpack";
import path from "path";
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { __DEV__ } from "./env";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import alias from "./alias";

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
          {
            loader: "style-resources-loader",
            options: {
              patterns: [path.resolve("src/styles/index.less")],
              injector: "append",
            },
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
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ]),
  },
  plugins: plugins.concat([
    new MiniCssExtractPlugin({
      filename: __DEV__ ? "[name].css" : "[name]-[contenthash:8].css",
    }),
    new DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
    }),
  ]),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: alias,
  },
};

if (__DEV__) {
  rendererConfig.plugins?.push(
    new ReactRefreshWebpackPlugin({
      forceEnable: true,
      overlay: false,
    })
  );
}
