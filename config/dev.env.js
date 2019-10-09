"use strict";
const merge = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"dev"',
  //BASE_API: '"https://localhost:5001/"'
  //BASE_API: '"http://115.78.9.30:24555/"',
  //BASE_API: '"http://192.168.30.35:24556/api/task"',
  BASE_API: '"http://103.77.167.96:20001/api/"',
});
