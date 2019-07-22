"use strict";

const path = require("path");
const fs = require("fs");

const pkgInfo = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json")).toString(),
);

const publicPath = {
  daily: `/static/`,
  production: `/static/`,
};

const getPublicPath = env => publicPath[env];

// 格式化时间
const getCurrentTime = () => {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\.[\d]{3}Z/, "");
};

module.exports = {
  getPublicPath,
  getCurrentTime,
};
