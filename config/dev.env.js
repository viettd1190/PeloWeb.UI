"use strict";
const merge = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://103.77.167.96:20001/api/"',
  URL_IMAGE:'"http://103.77.167.96:20001/Avatars/"',
  CONFIG : {
  apiKey: '"AIzaSyA1v_6dJPgiHaPP1xlImYqnHihF-3jknmA"',
  authDomain: '"pelodb.firebaseapp.com"',
  databaseURL: '"https://pelodb.firebaseio.com"',
  projectId: '"pelodb"',
  storageBucket: '"pelodb.appspot.com"',
  messagingSenderId: '"726134219557"',
  appId: '"1:726134219557:web:325ff9635ab1f627dc70cc"',
  measurementId: '"G-HBMJXC36ZX"'
}
});
