"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = _interopRequireDefault(require("./lib/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var StructToJSON = /*#__PURE__*/function () {
  function StructToJSON() {
    _classCallCheck(this, StructToJSON);
    this.keys = ['INIT'];
    this.isInit = false;
    this.onInit = null;
    this.structs = {
      INIT: _index["default"].extend({
        name: 'key',
        type: _index["default"].types.Uint8
      })
    };
    this.types = {
      int8_t: _index["default"].types.Int8,
      int16_t: _index["default"].types.Int16LE,
      int32_t: _index["default"].types.Int32LE,
      uint8_t: _index["default"].types.Uint8,
      uint16_t: _index["default"].types.Uint16LE,
      uint32_t: _index["default"].types.Uint32LE,
      "char": 'String'
    };
  }
  _createClass(StructToJSON, [{
    key: "init",
    value: function init(data) {
      if (_typeof(data) === 'object') {
        var keys = data.keys,
          structs = data.structs;
        if (!keys && !Array.isArray(keys) && !structs && _typeof(data) !== 'object') return;
        this.keys = keys;
        for (var key in structs) {
          var name = key.toUpperCase();
          var array = structs[key].map(this.redata.bind(this));
          this.structs[name] = _index["default"].extend.apply(_index["default"], _toConsumableArray(array));
        }
        this.isInit = true;
        if (this.onInit) this.onInit();
      }
    }
  }, {
    key: "arrToJson",
    value: function arrToJson(array) {
      try {
        var text = String.fromCharCode.apply(String, _toConsumableArray(array));
        var obj = JSON.parse(text);
        if (obj) this.init(obj);
      } catch (error) {
        console.warn(error);
      }
    }
  }, {
    key: "redata",
    value: function redata(_ref) {
      var type = _ref.t,
        name = _ref.n,
        byteLength = _ref.l;
      var obj = {
        name: name,
        type: this.types[type]
      };
      if (byteLength) obj.byteLength = +byteLength;
      return obj;
    }
  }, {
    key: "getCommand",
    value: function getCommand(key) {
      return typeof key === 'string' ? this.keys.findIndex(function (i) {
        return i === key;
      }) : this.keys[key];
    }
  }, {
    key: "cleanString",
    value: function cleanString(data) {
      var obj = {};
      for (var key in data) {
        obj[key] = typeof data[key] === 'string' ? data[key].replace(/\0/g, '') : data[key];
      }
      return obj;
    }
  }, {
    key: "set",
    value: function set(key, data) {
      if (key) {
        var struct = data ? this.structs[key] : this.structs['INIT'];
        var command = this.getCommand(key);
        if (struct && command !== -1) {
          var object = new struct(new ArrayBuffer(struct.byteLength));
          if (object) {
            if (data) {
              for (var _key in object) {
                object[_key] = data[_key];
              }
            }
            object['key'] = command;
            return object;
          }
        }
      }
      console.warn("No struct or key ".concat(key), data);
      return null;
    }
  }, {
    key: "get",
    value: function get(data) {
      if (data instanceof ArrayBuffer) {
        var _Uint8Array = new Uint8Array(data),
          _Uint8Array2 = _toArray(_Uint8Array),
          key = _Uint8Array2[0],
          array = _Uint8Array2.slice(1);
        if (key === 0 && !this.isInit) this.arrToJson(array);
        var comm = this.getCommand(key);
        if (comm) {
          var struct = this.structs[comm];
          if (struct) {
            var obj = this.cleanString(new struct(data));
            obj['key'] = comm;
            return obj;
          }
        }
      }
      console.warn("No struct from arr: ".concat(data));
      return null;
    }
  }]);
  return StructToJSON;
}();
var _default = StructToJSON;
exports["default"] = _default;