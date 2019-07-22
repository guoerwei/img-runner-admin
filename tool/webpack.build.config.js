"use strict";

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBundlerAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const baseConfig = require("./webpack.config");
const { getPublicPath, getCurrentTime } = require("./build-helper");

module.exports = ({ env = "production" }) => {
  return webpackMerge(baseConfig, {
    mode: "production",
    output: {
      publicPath: getPublicPath(env) || "",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "awesome-typescript-loader",
              options: {
                getCustomTransformers: () => ({}),
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(css|less)$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                MiniCSSExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: "[name]__[local]--[hash:base64:5]",
                    },
                  },
                },
                {
                  loader: "postcss-loader",
                },
                {
                  loader: "less-loader",
                  options: {
                    javascriptEnabled: true,
                  },
                },
              ],
            },
            {
              use: [
                MiniCSSExtractPlugin.loader,
                {
                  loader: "css-loader",
                },
                {
                  loader: "postcss-loader",
                },
                {
                  loader: "less-loader",
                  options: {
                    javascriptEnabled: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../src/template.html"),
        inject: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      new webpack.DefinePlugin({
        MY_ENV: JSON.stringify(env),
      }),
      new MiniCSSExtractPlugin({
        filename: "css/[name].css",
      }),
      new webpack.BannerPlugin({
        banner: `build: ${getCurrentTime()}\nhash: [hash]`,
      }),
      new WebpackBundlerAnalyzer({
        analyzerMode: "static",
        reportFilename: path.resolve(__dirname, "../report/.report.html"),
      }),
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsWebpackPlugin(),
        new UglifyjsWebpackPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            reuseExistingChunk: true,
          },
          chunks: {
            chunks: "all",
            name: "chunk",
            minChunks: 3,
            reuseExistingChunk: true,
          },
        },
      },
    },
  });
};
