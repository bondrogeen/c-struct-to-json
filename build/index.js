"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _type = /*#__PURE__*/new WeakMap();
var _byteOffset = /*#__PURE__*/new WeakMap();
var _littleEndian = /*#__PURE__*/new WeakMap();
var _length = /*#__PURE__*/new WeakMap();
var _byteLength = /*#__PURE__*/new WeakMap();
var _setInt = /*#__PURE__*/new WeakSet();
var _getInt = /*#__PURE__*/new WeakSet();
var _setIntArray = /*#__PURE__*/new WeakSet();
var _getIntArray = /*#__PURE__*/new WeakSet();
var Int = /*#__PURE__*/function () {
  function Int(_ref) {
    var byteLength = _ref.byteLength,
      type = _ref.type,
      _byteOffset2 = _ref.byteOffset,
      littleEndian = _ref.littleEndian,
      length = _ref.length;
    _classCallCheck(this, Int);
    _classPrivateMethodInitSpec(this, _getIntArray);
    _classPrivateMethodInitSpec(this, _setIntArray);
    _classPrivateMethodInitSpec(this, _getInt);
    _classPrivateMethodInitSpec(this, _setInt);
    _classPrivateFieldInitSpec(this, _type, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _byteOffset, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _littleEndian, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _length, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _byteLength, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _type, type);
    _classPrivateFieldSet(this, _byteOffset, _byteOffset2);
    _classPrivateFieldSet(this, _littleEndian, littleEndian || true);
    _classPrivateFieldSet(this, _length, length || 1);
    _classPrivateFieldSet(this, _byteLength, byteLength * _classPrivateFieldGet(this, _length));
  }
  _createClass(Int, [{
    key: "byteLength",
    get: function get() {
      return _classPrivateFieldGet(this, _byteLength);
    }
  }, {
    key: "set",
    value: function set(bufer, data) {
      if (_classPrivateFieldGet(this, _length) === 1) _classPrivateMethodGet(this, _setInt, _setInt2).call(this, bufer, data);else _classPrivateMethodGet(this, _setIntArray, _setIntArray2).call(this, bufer, data);
    }
  }, {
    key: "get",
    value: function get(bufer) {
      return _classPrivateFieldGet(this, _length) === 1 ? _classPrivateMethodGet(this, _getInt, _getInt2).call(this, bufer) : _classPrivateMethodGet(this, _getIntArray, _getIntArray2).call(this, bufer);
    }
  }]);
  return Int;
}();
function _setInt2(bufer, value) {
  var byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _classPrivateFieldGet(this, _byteOffset);
  bufer["set".concat(_classPrivateFieldGet(this, _type))](byteOffset, value, _classPrivateFieldGet(this, _type), _classPrivateFieldGet(this, _littleEndian));
}
function _getInt2(bufer) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _classPrivateFieldGet(this, _byteOffset);
  return bufer["get".concat(_classPrivateFieldGet(this, _type))](byteOffset, _classPrivateFieldGet(this, _littleEndian));
}
function _setIntArray2(bufer, array) {
  for (var i = 0; i < _classPrivateFieldGet(this, _length); i++) {
    var item = (array === null || array === void 0 ? void 0 : array[i]) || 0;
    _classPrivateMethodGet(this, _setInt, _setInt2).call(this, bufer, item, _classPrivateFieldGet(this, _byteOffset) + i);
  }
}
function _getIntArray2(bufer) {
  var arr = [];
  for (var i = 0; i < _classPrivateFieldGet(this, _length); i++) {
    var item = _classPrivateMethodGet(this, _getInt, _getInt2).call(this, bufer, _classPrivateFieldGet(this, _byteOffset) + i);
    arr.push(item);
  }
  return arr;
}
var Char = /*#__PURE__*/function (_Int) {
  _inherits(Char, _Int);
  var _super = _createSuper(Char);
  function Char(object) {
    _classCallCheck(this, Char);
    return _super.call(this, object);
  }
  _createClass(Char, [{
    key: "set",
    value: function set(bufer, value) {
      var arr = value.split('').map(function (_char) {
        return _char.charCodeAt(0);
      });
      _get(_getPrototypeOf(Char.prototype), "set", this).call(this, bufer, arr);
    }
  }, {
    key: "get",
    value: function get(bufer) {
      var arr = _get(_getPrototypeOf(Char.prototype), "get", this).call(this, bufer);
      return String.fromCharCode.apply(String, _toConsumableArray(arr.filter(function (i) {
        return i;
      })));
    }
  }]);
  return Char;
}(Int);
var _length2 = /*#__PURE__*/new WeakMap();
var _object = /*#__PURE__*/new WeakMap();
var _struct = /*#__PURE__*/new WeakMap();
var _byteOffset3 = /*#__PURE__*/new WeakMap();
var Struct = /*#__PURE__*/function () {
  function Struct(array) {
    _classCallCheck(this, Struct);
    _classPrivateFieldInitSpec(this, _length2, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _object, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _struct, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _byteOffset3, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _length2, 0);
    _classPrivateFieldSet(this, _object, {});
    _classPrivateFieldSet(this, _byteOffset3, 0);
    this.init(array);
    _classPrivateFieldSet(this, _struct, new DataView(new ArrayBuffer(_classPrivateFieldGet(this, _length2))));
  }
  _createClass(Struct, [{
    key: "init",
    value: function init(array) {
      var _this = this;
      array.forEach(function (item) {
        _classPrivateFieldGet(_this, _object)[item.name] = _this.getInstanceData(item.type, _objectSpread(_objectSpread({}, item), {}, {
          byteOffset: _classPrivateFieldGet(_this, _byteOffset3)
        }));
        var byteLength = _classPrivateFieldGet(_this, _object)[item.name].byteLength;
        _classPrivateFieldSet(_this, _byteOffset3, _classPrivateFieldGet(_this, _byteOffset3) + byteLength);
        _classPrivateFieldSet(_this, _length2, _classPrivateFieldGet(_this, _length2) + byteLength);
      });
    }
  }, {
    key: "getInstanceData",
    value: function getInstanceData(type, data) {
      if (['int8_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 1,
        type: 'Int8'
      }));
      if (['int16_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 2,
        type: 'Int16'
      }));
      if (['int32_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 4,
        type: 'Int32'
      }));
      if (['uint8_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 1,
        type: 'Uint8'
      }));
      if (['uint8_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 1,
        type: 'Uint8'
      }));
      if (['uint16_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 2,
        type: 'Uint16'
      }));
      if (['uint32_t'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 4,
        type: 'Uint32'
      }));
      if (['float'].includes(type)) return new Int(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 4,
        type: 'Float32'
      }));
      if (['char'].includes(type)) return new Char(_objectSpread(_objectSpread({}, data), {}, {
        byteLength: 1,
        type: 'Uint8'
      }));
    }
  }, {
    key: "length",
    get: function get() {
      return _classPrivateFieldGet(this, _length2);
    }
  }, {
    key: "getObject",
    value: function getObject() {
      var obj = {};
      for (var key in _classPrivateFieldGet(this, _object)) {
        var data = _classPrivateFieldGet(this, _object)[key];
        if (data) obj[key] = data.get(_classPrivateFieldGet(this, _struct));
      }
      return obj;
    }
  }, {
    key: "setObject",
    value: function setObject(object) {
      for (var key in object) {
        var data = _classPrivateFieldGet(this, _object)[key];
        var value = object[key];
        if (data) data.set(_classPrivateFieldGet(this, _struct), value);
      }
      return this;
    }
  }, {
    key: "getBuffer",
    value: function getBuffer() {
      return _classPrivateFieldGet(this, _struct).buffer;
    }
  }, {
    key: "setBuffer",
    value: function setBuffer(buffer) {
      if (buffer instanceof ArrayBuffer) {
        if (buffer.byteLength !== _classPrivateFieldGet(this, _struct).buffer.byteLength) return this;
        _classPrivateFieldSet(this, _struct, new DataView(buffer));
      }
      return this;
    }
  }]);
  return Struct;
}();
var _default = Struct;
exports["default"] = _default;