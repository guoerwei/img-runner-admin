"use strict";

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.config");

module.exports = ({ port = 3000, env = "local" }) => {
  return webpackMerge(baseConfig, {
    mode: "development",
    entry: {
      index: [
        "webpack/hot/dev-server",
        "webpack-dev-server/client?http://0.0.0.0:" + port,
      ],
    },
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    devtool: "eval-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
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
                {
                  loader: "style-loader",
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      // 3.0的写法变了
                      localIdentName: "[name]__[local]--[hash:base64:5]",
                    },
                  },
                },
                {
                  loader: "postcss-loader",
                },
                {
                  loader: "less-loader",
                },
              ],
            },
            {
              use: [
                {
                  loader: "style-loader",
                },
                {
                  loader: "css-loader",
                },
                {
                  loader: "postcss-loader",
                },
                {
                  loader: "less-loader",
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../src/template.html"),
        inject: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        MY_ENV: JSON.stringify(env),
      }),
    ],
  });
};
