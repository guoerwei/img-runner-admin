"use strict";

const env = process.argv[2] || "production";

process.env.YBBT_ENV = env;

require("../tool/build")({
  env
})
  .then(() => {
    console.log("ok");
  })
  .catch(e => {
    console.error(e);
  });
