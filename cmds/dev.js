"use strict";

const port = process.argv[2] || 3000;
const env = process.argv[3] || "local";

process.env.YBBT_ENV = env;

require("../tool/dev")({
  port,
  env
});
