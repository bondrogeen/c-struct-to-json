"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getCharCodes = function getCharCodes(s) {
  var charCodeArr = [];
  for (var i = 0; i < s.length; i++) {
    var code = s.charCodeAt(i);
    charCodeArr.push(code);
  }
  return charCodeArr;
};
var parseStruct = function parseStruct(test) {
  test = test.replace(/\r?\n/g, '');
  var getStruct = data.match(/struct(.*?)};/gi);
  var getEnum = data.match(/enum(.*?)};/gi);
  var structs = {};
  var keys;
  getEnum.forEach(function (data) {
    // const enumName = data.match(/[^enum\s](\w*)/)[0];
    var all = data.match(/\w*,/g);
    keys = all.map(function (i) {
      return i.replace(',', '');
    });
  });
  getStruct.forEach(function (struct) {
    var structName = struct.match(/[^struct\s](\w*)/)[0];
    structs[structName] = [];
    var args = struct.match(/{(.*)}/)[0].replace(/[{,}]/g, '');
    var variables = args.match(/[^\s*](\w*) (\w*|\w*\[\d*\]);/g);
    variables.forEach(function (variable) {
      var _value$match;
      var _variable$split = variable.split(' '),
        _variable$split2 = _slicedToArray(_variable$split, 2),
        type = _variable$split2[0],
        value = _variable$split2[1];
      var name = value.match(/(\w*)/)[0];
      var length = (_value$match = value.match(/\d+/)) === null || _value$match === void 0 ? void 0 : _value$match[0];
      var res = {
        t: type,
        n: name
      };
      if (length) res.l = +length;
      structs[structName].push(res);
    });
  });
  return {
    keys: keys,
    structs: structs
  };
};