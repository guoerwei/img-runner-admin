"use strict";

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

module.exports = ({ port = 3000, env = "local" }) => {
  const devConfig = require("./webpack.dev.config")({ port, env });
  const compiler = webpack(devConfig);
  const app = new WebpackDevServer(compiler, {
    stats: {
      colors: true,
    },
    clientLogLevel: "warning",
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1",
        changeOrigin: true,
        pathRewrite: {},
      },
    },
  });
  app.listen(port, () => {});
};
