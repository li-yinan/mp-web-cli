"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preprocess = require("./preprocess");

Object.keys(_preprocess).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _preprocess[key];
    }
  });
});