"use strict";

const webpack = require("webpack");

module.exports = options => {
  const buildConfig = require("./webpack.build.config")(options);
  const compiler = webpack(buildConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        const info = stats.toJson();
        if (stats.hasErrors()) {
          reject(new Error(info.errors.join("\n")));
        } else {
          if (stats.hasWarnings()) {
            resolve(info.warnings.join("\n"));
          } else {
            resolve();
          }
        }
      }
    });
  });
};
