"use strict";

var babel = _interopRequireWildcard(require("@babel/core"));

var _componentsReplace = _interopRequireDefault(require("./plugins/components-replace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var options = {
  // ast: true,
  // code: true
  generatorOpts: {
    sourceMaps: true
  },
  plugins: [_componentsReplace["default"]]
};
var code = "\n    /* web-replace: ./bbb */\n    import {aaa} from './aaa';\n    let bbb = 1;\n    aaa.exec(bbb);\n";
babel.transform(code, options, function (err, result) {
  console.log(code);
  console.log(result.code);
});