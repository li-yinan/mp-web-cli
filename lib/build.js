"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _config = _interopRequireDefault(require("./config.base"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function build() {
  var cwd = process.cwd();

  var webRcPath = _path["default"].join(cwd, '.webrc');

  var webrcConfig = _config["default"]; // 读取、解析.webrc

  if (_fs["default"].existsSync(webRcPath)) {
    var configStr = _fs["default"].readFileSync(webRcPath);

    var config = {};

    try {
      config = JSON.parse(configStr.toString());
    } catch (e) {
      console.error('parse .webrc fail');
    }

    webrcConfig = _objectSpread({}, webrcConfig, {}, config);
  } // 生成临时目录


  var webDistPath = _path["default"].join(cwd, '.web', 'dist');

  (0, _mkdirp["default"])(webDistPath); // 处理APP_SOURCE_PATH字段，如果用户没指定就为cwd

  webrcConfig.appSourcePath = webrcConfig.appSourcePath || cwd; // 把生成目录指向临时目录

  webrcConfig.appDistPath = webDistPath;

  _fs["default"].writeFileSync(webRcPath, JSON.stringify(webrcConfig, null, 4)); // 调用web化编译流程


  _shelljs["default"].exec("echo hello --webrc=".concat(webRcPath)); // 对web化的go模板进行渲染，生成html

}