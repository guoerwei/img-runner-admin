"use strict";

const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "../"),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
    },
  },
  entry: {
    index: [path.resolve(__dirname, "../src/index.tsx")],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
