"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Struct = t();
  }
}(function () {
  return function t(e, r, n) {
    function o(u, f) {
      if (!r[u]) {
        if (!e[u]) {
          var a = "function" == typeof require && require;
          if (!f && a) return a(u, !0);
          if (i) return i(u, !0);
          var c = new Error("Cannot find module '" + u + "'");
          throw c.code = "MODULE_NOT_FOUND", c;
        }
        var s = r[u] = {
          exports: {}
        };
        e[u][0].call(s.exports, function (t) {
          var r = e[u][1][t];
          return o(r || t);
        }, s, s.exports, t, e, r, n);
      }
      return r[u].exports;
    }
    for (var i = "function" == typeof require && require, u = 0; u < n.length; u++) {
      o(n[u]);
    }
    return o;
  }({
    1: [function (t, e, r) {
      "use strict";

      var n = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("./src/struct")),
        o = function (t) {
          if (t && t.__esModule) return t;
          var e = {};
          if (null != t) for (var r in t) {
            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e["default"] = t, e;
        }(t("./src/types"));
      Object.defineProperty(n["default"], "types", {
        enumerable: !0,
        writable: !0,
        value: o
      }), e.exports = n["default"];
    }, {
      "./src/struct": 7,
      "./src/types": 14
    }],
    2: [function (t, e, r) {
      "use strict";

      function n(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0;
      }
      function o(t) {
        return u[t >> 18 & 63] + u[t >> 12 & 63] + u[t >> 6 & 63] + u[63 & t];
      }
      function i(t, e, r) {
        for (var n, i = [], u = e; u < r; u += 3) {
          n = (t[u] << 16) + (t[u + 1] << 8) + t[u + 2], i.push(o(n));
        }
        return i.join("");
      }
      r.byteLength = function (t) {
        return 3 * t.length / 4 - n(t);
      }, r.toByteArray = function (t) {
        var e,
          r,
          o,
          i,
          u,
          c = t.length;
        i = n(t), u = new a(3 * c / 4 - i), r = i > 0 ? c - 4 : c;
        var s = 0;
        for (e = 0; e < r; e += 4) {
          o = f[t.charCodeAt(e)] << 18 | f[t.charCodeAt(e + 1)] << 12 | f[t.charCodeAt(e + 2)] << 6 | f[t.charCodeAt(e + 3)], u[s++] = o >> 16 & 255, u[s++] = o >> 8 & 255, u[s++] = 255 & o;
        }
        return 2 === i ? (o = f[t.charCodeAt(e)] << 2 | f[t.charCodeAt(e + 1)] >> 4, u[s++] = 255 & o) : 1 === i && (o = f[t.charCodeAt(e)] << 10 | f[t.charCodeAt(e + 1)] << 4 | f[t.charCodeAt(e + 2)] >> 2, u[s++] = o >> 8 & 255, u[s++] = 255 & o), u;
      }, r.fromByteArray = function (t) {
        for (var e, r = t.length, n = r % 3, o = "", f = [], a = 0, c = r - n; a < c; a += 16383) {
          f.push(i(t, a, a + 16383 > c ? c : a + 16383));
        }
        return 1 === n ? (e = t[r - 1], o += u[e >> 2], o += u[e << 4 & 63], o += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], o += u[e >> 10], o += u[e >> 4 & 63], o += u[e << 2 & 63], o += "="), f.push(o), f.join("");
      };
      for (var u = [], f = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = c.length; s < l; ++s) {
        u[s] = c[s], f[c.charCodeAt(s)] = s;
      }
      f["-".charCodeAt(0)] = 62, f["_".charCodeAt(0)] = 63;
    }, {}],
    3: [function (t, e, r) {
      "use strict";

      function n(t) {
        if (t > G) throw new RangeError("Invalid typed array length");
        var e = new Uint8Array(t);
        return e.__proto__ = o.prototype, e;
      }
      function o(t, e, r) {
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return a(t);
        }
        return i(t, e, r);
      }
      function i(t, e, r) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
        return V(t) ? l(t, e, r) : "string" == typeof t ? c(t, e) : p(t);
      }
      function u(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function f(t, e, r) {
        return u(t), t <= 0 ? n(t) : void 0 !== e ? "string" == typeof r ? n(t).fill(e, r) : n(t).fill(e) : n(t);
      }
      function a(t) {
        return u(t), n(t < 0 ? 0 : 0 | h(t));
      }
      function c(t, e) {
        if ("string" == typeof e && "" !== e || (e = "utf8"), !o.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');
        var r = 0 | y(t, e),
          i = n(r),
          u = i.write(t, e);
        return u !== r && (i = i.slice(0, u)), i;
      }
      function s(t) {
        for (var e = t.length < 0 ? 0 : 0 | h(t.length), r = n(e), o = 0; o < e; o += 1) {
          r[o] = 255 & t[o];
        }
        return r;
      }
      function l(t, e, r) {
        if (e < 0 || t.byteLength < e) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < e + (r || 0)) throw new RangeError("'length' is out of bounds");
        var n;
        return n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), n.__proto__ = o.prototype, n;
      }
      function p(t) {
        if (o.isBuffer(t)) {
          var e = 0 | h(t.length),
            r = n(e);
          return 0 === r.length ? r : (t.copy(r, 0, 0, e), r);
        }
        if (t) {
          if (W(t) || "length" in t) return "number" != typeof t.length || X(t.length) ? n(0) : s(t);
          if ("Buffer" === t.type && Array.isArray(t.data)) return s(t.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function h(t) {
        if (t >= G) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + G.toString(16) + " bytes");
        return 0 | t;
      }
      function y(t, e) {
        if (o.isBuffer(t)) return t.length;
        if (W(t) || V(t)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var r = t.length;
        if (0 === r) return 0;
        for (var n = !1;;) {
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
            case void 0:
              return N(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return z(t).length;
            default:
              if (n) return N(t).length;
              e = ("" + e).toLowerCase(), n = !0;
          }
        }
      }
      function b(t, e, r) {
        var n = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if (r >>>= 0, e >>>= 0, r <= e) return "";
        for (t || (t = "utf8");;) {
          switch (t) {
            case "hex":
              return x(this, e, r);
            case "utf8":
            case "utf-8":
              return M(this, e, r);
            case "ascii":
              return B(this, e, r);
            case "latin1":
            case "binary":
              return A(this, e, r);
            case "base64":
              return P(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return T(this, e, r);
            default:
              if (n) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), n = !0;
          }
        }
      }
      function d(t, e, r) {
        var n = t[e];
        t[e] = t[r], t[r] = n;
      }
      function g(t, e, r, n, i) {
        if (0 === t.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, X(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
          if (i) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!i) return -1;
          r = 0;
        }
        if ("string" == typeof e && (e = o.from(e, n)), o.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, r, n, i);
        if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : v(t, [e], r, n, i);
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(t, e, r, n, o) {
        function i(t, e) {
          return 1 === u ? t[e] : t.readUInt16BE(e * u);
        }
        var u = 1,
          f = t.length,
          a = e.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
          if (t.length < 2 || e.length < 2) return -1;
          u = 2, f /= 2, a /= 2, r /= 2;
        }
        var c;
        if (o) {
          var s = -1;
          for (c = r; c < f; c++) {
            if (i(t, c) === i(e, -1 === s ? 0 : c - s)) {
              if (-1 === s && (s = c), c - s + 1 === a) return s * u;
            } else -1 !== s && (c -= c - s), s = -1;
          }
        } else for (r + a > f && (r = f - a), c = r; c >= 0; c--) {
          for (var l = !0, p = 0; p < a; p++) {
            if (i(t, c + p) !== i(e, p)) {
              l = !1;
              break;
            }
          }
          if (l) return c;
        }
        return -1;
      }
      function w(t, e, r, n) {
        r = Number(r) || 0;
        var o = t.length - r;
        n ? (n = Number(n)) > o && (n = o) : n = o;
        var i = e.length;
        if (i % 2 != 0) throw new TypeError("Invalid hex string");
        n > i / 2 && (n = i / 2);
        for (var u = 0; u < n; ++u) {
          var f = parseInt(e.substr(2 * u, 2), 16);
          if (X(f)) return u;
          t[r + u] = f;
        }
        return u;
      }
      function _(t, e, r, n) {
        return Y(N(e, t.length - r), t, r, n);
      }
      function O(t, e, r, n) {
        return Y(D(e), t, r, n);
      }
      function m(t, e, r, n) {
        return O(t, e, r, n);
      }
      function j(t, e, r, n) {
        return Y(z(e), t, r, n);
      }
      function E(t, e, r, n) {
        return Y(q(e, t.length - r), t, r, n);
      }
      function P(t, e, r) {
        return 0 === e && r === t.length ? J.fromByteArray(t) : J.fromByteArray(t.slice(e, r));
      }
      function M(t, e, r) {
        r = Math.min(t.length, r);
        for (var n = [], o = e; o < r;) {
          var i = t[o],
            u = null,
            f = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
          if (o + f <= r) {
            var a, c, s, l;
            switch (f) {
              case 1:
                i < 128 && (u = i);
                break;
              case 2:
                128 == (192 & (a = t[o + 1])) && (l = (31 & i) << 6 | 63 & a) > 127 && (u = l);
                break;
              case 3:
                a = t[o + 1], c = t[o + 2], 128 == (192 & a) && 128 == (192 & c) && (l = (15 & i) << 12 | (63 & a) << 6 | 63 & c) > 2047 && (l < 55296 || l > 57343) && (u = l);
                break;
              case 4:
                a = t[o + 1], c = t[o + 2], s = t[o + 3], 128 == (192 & a) && 128 == (192 & c) && 128 == (192 & s) && (l = (15 & i) << 18 | (63 & a) << 12 | (63 & c) << 6 | 63 & s) > 65535 && l < 1114112 && (u = l);
            }
          }
          null === u ? (u = 65533, f = 1) : u > 65535 && (u -= 65536, n.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), n.push(u), o += f;
        }
        return k(n);
      }
      function k(t) {
        var e = t.length;
        if (e <= H) return String.fromCharCode.apply(String, t);
        for (var r = "", n = 0; n < e;) {
          r += String.fromCharCode.apply(String, t.slice(n, n += H));
        }
        return r;
      }
      function B(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) {
          n += String.fromCharCode(127 & t[o]);
        }
        return n;
      }
      function A(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) {
          n += String.fromCharCode(t[o]);
        }
        return n;
      }
      function x(t, e, r) {
        var n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = "", i = e; i < r; ++i) {
          o += F(t[i]);
        }
        return o;
      }
      function T(t, e, r) {
        for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) {
          o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        }
        return o;
      }
      function S(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
      }
      function L(t, e, r, n, i, u) {
        if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < u) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError("Index out of range");
      }
      function U(t, e, r, n, o, i) {
        if (r + n > t.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }
      function I(t, e, r, n, o) {
        return e = +e, r >>>= 0, o || U(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), Z.write(t, e, r, n, 23, 4), r + 4;
      }
      function C(t, e, r, n, o) {
        return e = +e, r >>>= 0, o || U(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), Z.write(t, e, r, n, 52, 8), r + 8;
      }
      function R(t) {
        if ((t = t.trim().replace(K, "")).length < 2) return "";
        for (; t.length % 4 != 0;) {
          t += "=";
        }
        return t;
      }
      function F(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function N(t, e) {
        e = e || 1 / 0;
        for (var r, n = t.length, o = null, i = [], u = 0; u < n; ++u) {
          if ((r = t.charCodeAt(u)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              if (u + 1 === n) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              o = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), o = r;
              continue;
            }
            r = 65536 + (o - 55296 << 10 | r - 56320);
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);
          if (o = null, r < 128) {
            if ((e -= 1) < 0) break;
            i.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            i.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }
        return i;
      }
      function D(t) {
        for (var e = [], r = 0; r < t.length; ++r) {
          e.push(255 & t.charCodeAt(r));
        }
        return e;
      }
      function q(t, e) {
        for (var r, n, o, i = [], u = 0; u < t.length && !((e -= 2) < 0); ++u) {
          n = (r = t.charCodeAt(u)) >> 8, o = r % 256, i.push(o), i.push(n);
        }
        return i;
      }
      function z(t) {
        return J.toByteArray(R(t));
      }
      function Y(t, e, r, n) {
        for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) {
          e[o + r] = t[o];
        }
        return o;
      }
      function V(t) {
        return t instanceof ArrayBuffer || null != t && null != t.constructor && "ArrayBuffer" === t.constructor.name && "number" == typeof t.byteLength;
      }
      function W(t) {
        return "function" == typeof ArrayBuffer.isView && ArrayBuffer.isView(t);
      }
      function X(t) {
        return t !== t;
      }
      var J = t("base64-js"),
        Z = t("ieee754");
      r.Buffer = o, r.SlowBuffer = function (t) {
        return +t != t && (t = 0), o.alloc(+t);
      }, r.INSPECT_MAX_BYTES = 50;
      var G = 2147483647;
      r.kMaxLength = G, o.TYPED_ARRAY_SUPPORT = function () {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function foo() {
              return 42;
            }
          }, 42 === t.foo();
        } catch (t) {
          return !1;
        }
      }(), o.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
        value: null,
        configurable: !0,
        enumerable: !1,
        writable: !1
      }), o.poolSize = 8192, o.from = function (t, e, r) {
        return i(t, e, r);
      }, o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, o.alloc = function (t, e, r) {
        return f(t, e, r);
      }, o.allocUnsafe = function (t) {
        return a(t);
      }, o.allocUnsafeSlow = function (t) {
        return a(t);
      }, o.isBuffer = function (t) {
        return null != t && !0 === t._isBuffer;
      }, o.compare = function (t, e) {
        if (!o.isBuffer(t) || !o.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var r = t.length, n = e.length, i = 0, u = Math.min(r, n); i < u; ++i) {
          if (t[i] !== e[i]) {
            r = t[i], n = e[i];
            break;
          }
        }
        return r < n ? -1 : n < r ? 1 : 0;
      }, o.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;
        }
      }, o.concat = function (t, e) {
        if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return o.alloc(0);
        var r;
        if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) {
          e += t[r].length;
        }
        var n = o.allocUnsafe(e),
          i = 0;
        for (r = 0; r < t.length; ++r) {
          var u = t[r];
          if (!o.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
          u.copy(n, i), i += u.length;
        }
        return n;
      }, o.byteLength = y, o.prototype._isBuffer = !0, o.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) {
          d(this, e, e + 1);
        }
        return this;
      }, o.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) {
          d(this, e, e + 3), d(this, e + 1, e + 2);
        }
        return this;
      }, o.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) {
          d(this, e, e + 7), d(this, e + 1, e + 6), d(this, e + 2, e + 5), d(this, e + 3, e + 4);
        }
        return this;
      }, o.prototype.toString = function () {
        var t = this.length;
        return 0 === t ? "" : 0 === arguments.length ? M(this, 0, t) : b.apply(this, arguments);
      }, o.prototype.equals = function (t) {
        if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === o.compare(this, t);
      }, o.prototype.inspect = function () {
        var t = "",
          e = r.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">";
      }, o.prototype.compare = function (t, e, r, n, i) {
        if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
        if (n >= i && e >= r) return 0;
        if (n >= i) return -1;
        if (e >= r) return 1;
        if (e >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === t) return 0;
        for (var u = i - n, f = r - e, a = Math.min(u, f), c = this.slice(n, i), s = t.slice(e, r), l = 0; l < a; ++l) {
          if (c[l] !== s[l]) {
            u = c[l], f = s[l];
            break;
          }
        }
        return u < f ? -1 : f < u ? 1 : 0;
      }, o.prototype.includes = function (t, e, r) {
        return -1 !== this.indexOf(t, e, r);
      }, o.prototype.indexOf = function (t, e, r) {
        return g(this, t, e, r, !0);
      }, o.prototype.lastIndexOf = function (t, e, r) {
        return g(this, t, e, r, !1);
      }, o.prototype.write = function (t, e, r, n) {
        if (void 0 === e) n = "utf8", r = this.length, e = 0;else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
        }
        var o = this.length - e;
        if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;) {
          switch (n) {
            case "hex":
              return w(this, t, e, r);
            case "utf8":
            case "utf-8":
              return _(this, t, e, r);
            case "ascii":
              return O(this, t, e, r);
            case "latin1":
            case "binary":
              return m(this, t, e, r);
            case "base64":
              return j(this, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return E(this, t, e, r);
            default:
              if (i) throw new TypeError("Unknown encoding: " + n);
              n = ("" + n).toLowerCase(), i = !0;
          }
        }
      }, o.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      var H = 4096;
      o.prototype.slice = function (t, e) {
        var r = this.length;
        t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
        var n = this.subarray(t, e);
        return n.__proto__ = o.prototype, n;
      }, o.prototype.readUIntLE = function (t, e, r) {
        t >>>= 0, e >>>= 0, r || S(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) {
          n += this[t + i] * o;
        }
        return n;
      }, o.prototype.readUIntBE = function (t, e, r) {
        t >>>= 0, e >>>= 0, r || S(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);) {
          n += this[t + --e] * o;
        }
        return n;
      }, o.prototype.readUInt8 = function (t, e) {
        return t >>>= 0, e || S(t, 1, this.length), this[t];
      }, o.prototype.readUInt16LE = function (t, e) {
        return t >>>= 0, e || S(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, o.prototype.readUInt16BE = function (t, e) {
        return t >>>= 0, e || S(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, o.prototype.readUInt32LE = function (t, e) {
        return t >>>= 0, e || S(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, o.prototype.readUInt32BE = function (t, e) {
        return t >>>= 0, e || S(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, o.prototype.readIntLE = function (t, e, r) {
        t >>>= 0, e >>>= 0, r || S(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) {
          n += this[t + i] * o;
        }
        return o *= 128, n >= o && (n -= Math.pow(2, 8 * e)), n;
      }, o.prototype.readIntBE = function (t, e, r) {
        t >>>= 0, e >>>= 0, r || S(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);) {
          i += this[t + --n] * o;
        }
        return o *= 128, i >= o && (i -= Math.pow(2, 8 * e)), i;
      }, o.prototype.readInt8 = function (t, e) {
        return t >>>= 0, e || S(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, o.prototype.readInt16LE = function (t, e) {
        t >>>= 0, e || S(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, o.prototype.readInt16BE = function (t, e) {
        t >>>= 0, e || S(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, o.prototype.readInt32LE = function (t, e) {
        return t >>>= 0, e || S(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, o.prototype.readInt32BE = function (t, e) {
        return t >>>= 0, e || S(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, o.prototype.readFloatLE = function (t, e) {
        return t >>>= 0, e || S(t, 4, this.length), Z.read(this, t, !0, 23, 4);
      }, o.prototype.readFloatBE = function (t, e) {
        return t >>>= 0, e || S(t, 4, this.length), Z.read(this, t, !1, 23, 4);
      }, o.prototype.readDoubleLE = function (t, e) {
        return t >>>= 0, e || S(t, 8, this.length), Z.read(this, t, !0, 52, 8);
      }, o.prototype.readDoubleBE = function (t, e) {
        return t >>>= 0, e || S(t, 8, this.length), Z.read(this, t, !1, 52, 8);
      }, o.prototype.writeUIntLE = function (t, e, r, n) {
        t = +t, e >>>= 0, r >>>= 0, n || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1,
          i = 0;
        for (this[e] = 255 & t; ++i < r && (o *= 256);) {
          this[e + i] = t / o & 255;
        }
        return e + r;
      }, o.prototype.writeUIntBE = function (t, e, r, n) {
        t = +t, e >>>= 0, r >>>= 0, n || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1,
          i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) {
          this[e + o] = t / i & 255;
        }
        return e + r;
      }, o.prototype.writeUInt8 = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1;
      }, o.prototype.writeUInt16LE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
      }, o.prototype.writeUInt16BE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
      }, o.prototype.writeUInt32LE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4;
      }, o.prototype.writeUInt32BE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4;
      }, o.prototype.writeIntLE = function (t, e, r, n) {
        if (t = +t, e >>>= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          L(this, t, e, r, o - 1, -o);
        }
        var i = 0,
          u = 1,
          f = 0;
        for (this[e] = 255 & t; ++i < r && (u *= 256);) {
          t < 0 && 0 === f && 0 !== this[e + i - 1] && (f = 1), this[e + i] = (t / u >> 0) - f & 255;
        }
        return e + r;
      }, o.prototype.writeIntBE = function (t, e, r, n) {
        if (t = +t, e >>>= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          L(this, t, e, r, o - 1, -o);
        }
        var i = r - 1,
          u = 1,
          f = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (u *= 256);) {
          t < 0 && 0 === f && 0 !== this[e + i + 1] && (f = 1), this[e + i] = (t / u >> 0) - f & 255;
        }
        return e + r;
      }, o.prototype.writeInt8 = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, o.prototype.writeInt16LE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
      }, o.prototype.writeInt16BE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
      }, o.prototype.writeInt32LE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4;
      }, o.prototype.writeInt32BE = function (t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4;
      }, o.prototype.writeFloatLE = function (t, e, r) {
        return I(this, t, e, !0, r);
      }, o.prototype.writeFloatBE = function (t, e, r) {
        return I(this, t, e, !1, r);
      }, o.prototype.writeDoubleLE = function (t, e, r) {
        return C(this, t, e, !0, r);
      }, o.prototype.writeDoubleBE = function (t, e, r) {
        return C(this, t, e, !1, r);
      }, o.prototype.copy = function (t, e, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
        var o,
          i = n - r;
        if (this === t && r < e && e < n) for (o = i - 1; o >= 0; --o) {
          t[o + e] = this[o + r];
        } else if (i < 1e3) for (o = 0; o < i; ++o) {
          t[o + e] = this[o + r];
        } else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
        return i;
      }, o.prototype.fill = function (t, e, r, n) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
            var i = t.charCodeAt(0);
            i < 256 && (t = i);
          }
          if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
          if ("string" == typeof n && !o.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
        if (r <= e) return this;
        e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0);
        var u;
        if ("number" == typeof t) for (u = e; u < r; ++u) {
          this[u] = t;
        } else {
          var f = o.isBuffer(t) ? t : new o(t, n),
            a = f.length;
          for (u = 0; u < r - e; ++u) {
            this[u + e] = f[u % a];
          }
        }
        return this;
      };
      var K = /[^+/0-9A-Za-z-_]/g;
    }, {
      "base64-js": 2,
      ieee754: 4
    }],
    4: [function (t, e, r) {
      r.read = function (t, e, r, n, o) {
        var i,
          u,
          f = 8 * o - n - 1,
          a = (1 << f) - 1,
          c = a >> 1,
          s = -7,
          l = r ? o - 1 : 0,
          p = r ? -1 : 1,
          h = t[e + l];
        for (l += p, i = h & (1 << -s) - 1, h >>= -s, s += f; s > 0; i = 256 * i + t[e + l], l += p, s -= 8) {
          ;
        }
        for (u = i & (1 << -s) - 1, i >>= -s, s += n; s > 0; u = 256 * u + t[e + l], l += p, s -= 8) {
          ;
        }
        if (0 === i) i = 1 - c;else {
          if (i === a) return u ? NaN : 1 / 0 * (h ? -1 : 1);
          u += Math.pow(2, n), i -= c;
        }
        return (h ? -1 : 1) * u * Math.pow(2, i - n);
      }, r.write = function (t, e, r, n, o, i) {
        var u,
          f,
          a,
          c = 8 * i - o - 1,
          s = (1 << c) - 1,
          l = s >> 1,
          p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          h = n ? 0 : i - 1,
          y = n ? 1 : -1,
          b = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (f = isNaN(e) ? 1 : 0, u = s) : (u = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -u)) < 1 && (u--, a *= 2), (e += u + l >= 1 ? p / a : p * Math.pow(2, 1 - l)) * a >= 2 && (u++, a /= 2), u + l >= s ? (f = 0, u = s) : u + l >= 1 ? (f = (e * a - 1) * Math.pow(2, o), u += l) : (f = e * Math.pow(2, l - 1) * Math.pow(2, o), u = 0)); o >= 8; t[r + h] = 255 & f, h += y, f /= 256, o -= 8) {
          ;
        }
        for (u = u << o | f, c += o; c > 0; t[r + h] = 255 & u, h += y, u /= 256, c -= 8) {
          ;
        }
        t[r + h - y] |= 128 * b;
      };
    }, {}],
    5: [function (t, e, r) {
      "use strict";

      function n(t) {
        switch (t) {
          case "Int8":
          case "Uint8":
            return 1;
          case "Int16":
          case "Uint16":
            return 2;
          case "Float32":
          case "Int32":
          case "Uint32":
            return 4;
          case "Float64":
            return 8;
          case "String":
            throw new TypeError("byteLength is required for String type");
          default:
            if (this.isStruct(t)) return t.byteLength;
            throw new TypeError("Unexpected type " + t);
        }
      }
      function o(t) {
        return this.isStruct(t) ? function (e) {
          return t.from(this, this.byteOffset + e).get();
        } : this.prototype["get" + t];
      }
      function i(t) {
        return this.isStruct(t) ? function (e, r) {
          return t.from(this, this.byteOffset + e).set(r);
        } : this.prototype["set" + t];
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      }), r["default"] = function (t, e) {
        var r = e.name,
          u = e.type,
          f = e.option,
          a = e.byteLength,
          c = void 0 === a ? n.call(t, u) : a,
          s = e.byteOffset,
          l = void 0 === s ? t.byteLength : s,
          p = o.call(t, u),
          h = i.call(t, u),
          y = {
            configurable: !0,
            enumerable: !0
          };
        return "String" === u ? Object.assign(y, {
          get: function get() {
            return p.call(this, l, c, f);
          },
          set: function set(t) {
            return h.call(this, l, c, t, f);
          }
        }) : Object.assign(y, {
          get: function get() {
            return p.call(this, l, f);
          },
          set: function set(t) {
            return h.call(this, l, t, f);
          }
        }), Object.defineProperty(t.prototype, r, y), Object.assign(t, {
          byteLength: l + c
        });
      };
    }, {}],
    6: [function (t, e, r) {
      "use strict";

      Object.defineProperty(r, "__esModule", {
        value: !0
      }), r["default"] = function (t, e) {
        for (var r in e.prototype) {
          if (t.prototype.hasOwnProperty(r)) throw new TypeError("Union contains conflicting key " + r);
          for (var n = e.prototype; !n.hasOwnProperty(r);) {
            n = Object.getPrototypeOf(n);
          }
          Object.defineProperty(t.prototype, r, Object.getOwnPropertyDescriptor(n, r));
        }
        return t.byteLength = Math.max(t.byteLength, e.byteLength), t;
      };
    }, {}],
    7: [function (t, e, r) {
      "use strict";

      function n(t) {
        return t && t.__esModule ? t : {
          "default": t
        };
      }
      function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function i(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function u(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      function f(t) {
        function e() {
          var e = Reflect.construct(t, Array.from(arguments));
          return Object.setPrototypeOf(e, Object.getPrototypeOf(this)), e;
        }
        return e.prototype = Object.create(t.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t, e;
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var a = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        c = t("buffer"),
        s = n(t("./define")),
        l = n(t("./merge")),
        p = function (t) {
          function e(t) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return o(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, r, (this instanceof e ? this.constructor : void 0).byteLength));
          }
          return u(e, f(DataView)), a(e, null, [{
            key: "extend",
            value: function value() {
              for (var t, e, r = arguments.length, n = Array(r), f = 0; f < r; f++) {
                n[f] = arguments[f];
              }
              return n.reduce(s["default"], (e = t = function (t) {
                function e() {
                  return o(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
                }
                return u(e, t), e;
              }(this), Object.defineProperty(t, "byteLength", {
                enumerable: !0,
                writable: !0,
                value: this.byteLength
              }), e));
            }
          }, {
            key: "from",
            value: function value(t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              if (!(ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) throw new TypeError("value must be a valid ArrayBuffer or TypedArray");
              return new this(t.buffer || t, e);
            }
          }, {
            key: "isStruct",
            value: function value(t) {
              return "function" == typeof t && Object.create(t.prototype) instanceof e;
            }
          }, {
            key: "union",
            value: function value() {
              for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) {
                e[r] = arguments[r];
              }
              return e.reduce(l["default"], this.extend());
            }
          }]), a(e, [{
            key: "getString",
            value: function value(t, e) {
              var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "utf8";
              return c.Buffer.from(this.buffer, this.byteOffset + t, e).toString(r.replace(/[\W_]/g, "").toLowerCase());
            }
          }, {
            key: "setString",
            value: function value(t, e, r) {
              var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "utf8";
              c.Buffer.from(String(r), n.replace(/[\W_]/g, "").toLowerCase()).copy(c.Buffer.from(this.buffer, this.byteOffset + t, e));
            }
          }, {
            key: "get",
            value: function value() {
              return this;
            }
          }, {
            key: "set",
            value: function value(t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              new Uint8Array(this.buffer, this.byteOffset + e, this.byteLength).set(t);
            }
          }, {
            key: "next",
            value: function value() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.constructor,
                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              if (!e.isStruct(t)) throw new TypeError("constructor must implement Struct");
              var n = this.buffer,
                o = this.byteOffset + this.byteLength + r;
              return o + t.byteLength > n.byteLength ? null : t.from(n, o);
            }
          }, {
            key: "prev",
            value: function value() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.constructor,
                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              if (!e.isStruct(t)) throw new TypeError("constructor must implement Struct");
              var n = this.buffer,
                o = this.byteOffset - r - t.byteLength;
              return o < 0 ? null : t.from(n, o);
            }
          }]), e;
        }();
      Object.defineProperty(p, "byteLength", {
        enumerable: !0,
        writable: !0,
        value: 0
      }), r["default"] = p;
    }, {
      "./define": 5,
      "./merge": 6,
      buffer: 3
    }],
    8: [function (t, e, r) {
      "use strict";

      function n(t) {
        return t && t.__esModule ? t : {
          "default": t
        };
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = n(t("../struct")),
        i = n(t("./char")),
        u = n(t("./int8")),
        f = n(t("./uint8"));
      r["default"] = o["default"].union(i["default"], u["default"], f["default"]);
    }, {
      "../struct": 7,
      "./char": 9,
      "./int8": 19,
      "./uint8": 26
    }],
    9: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "char",
            type: "String",
            byteLength: 1,
            option: "binary"
          })), u(e, [{
            key: "get",
            value: function value() {
              return this["char"];
            }
          }, {
            key: "set",
            value: function value(t) {
              this["char"] = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    10: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "float32be",
            type: "Float32",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.float32be;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.float32be = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    11: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "float32le",
            type: "Float32",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.float32le;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.float32le = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    12: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "float64be",
            type: "Float64",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.float64be;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.float64be = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    13: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "float64le",
            type: "Float64",
            option: true
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.float64le;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.float64le = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    14: [function (t, e, r) {
      "use strict";

      function n(t) {
        return t && t.__esModule ? t : {
          "default": t
        };
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = t("./char");
      Object.defineProperty(r, "Char", {
        enumerable: !0,
        get: function get() {
          return n(o)["default"];
        }
      });
      var i = t("./float32be");
      Object.defineProperty(r, "Float32BE", {
        enumerable: !0,
        get: function get() {
          return n(i)["default"];
        }
      });
      var u = t("./float32le");
      Object.defineProperty(r, "Float32LE", {
        enumerable: !0,
        get: function get() {
          return n(u)["default"];
        }
      });
      var f = t("./float64be");
      Object.defineProperty(r, "Float64BE", {
        enumerable: !0,
        get: function get() {
          return n(f)["default"];
        }
      });
      var a = t("./float64le");
      Object.defineProperty(r, "Float64LE", {
        enumerable: !0,
        get: function get() {
          return n(a)["default"];
        }
      });
      var c = t("./int8");
      Object.defineProperty(r, "Int8", {
        enumerable: !0,
        get: function get() {
          return n(c)["default"];
        }
      });
      var s = t("./int16be");
      Object.defineProperty(r, "Int16BE", {
        enumerable: !0,
        get: function get() {
          return n(s)["default"];
        }
      });
      var l = t("./int16le");
      Object.defineProperty(r, "Int16LE", {
        enumerable: !0,
        get: function get() {
          return n(l)["default"];
        }
      });
      var p = t("./int32be");
      Object.defineProperty(r, "Int32BE", {
        enumerable: !0,
        get: function get() {
          return n(p)["default"];
        }
      });
      var h = t("./int32le");
      Object.defineProperty(r, "Int32LE", {
        enumerable: !0,
        get: function get() {
          return n(h)["default"];
        }
      });
      var y = t("./uint8");
      Object.defineProperty(r, "Uint8", {
        enumerable: !0,
        get: function get() {
          return n(y)["default"];
        }
      });
      var b = t("./uint16be");
      Object.defineProperty(r, "Uint16BE", {
        enumerable: !0,
        get: function get() {
          return n(b)["default"];
        }
      });
      var d = t("./uint16le");
      Object.defineProperty(r, "Uint16LE", {
        enumerable: !0,
        get: function get() {
          return n(d)["default"];
        }
      });
      var g = t("./uint32be");
      Object.defineProperty(r, "Uint32BE", {
        enumerable: !0,
        get: function get() {
          return n(g)["default"];
        }
      });
      var v = t("./uint32le");
      Object.defineProperty(r, "Uint32LE", {
        enumerable: !0,
        get: function get() {
          return n(v)["default"];
        }
      });
      var w = t("./byte");
      Object.defineProperty(r, "Byte", {
        enumerable: !0,
        get: function get() {
          return n(w)["default"];
        }
      });
      var _ = t("./short");
      Object.defineProperty(r, "Short", {
        enumerable: !0,
        get: function get() {
          return n(_)["default"];
        }
      });
      var O = t("./word");
      Object.defineProperty(r, "Word", {
        enumerable: !0,
        get: function get() {
          return n(O)["default"];
        }
      });
      var m = t("./long");
      Object.defineProperty(r, "Long", {
        enumerable: !0,
        get: function get() {
          return n(m)["default"];
        }
      });
    }, {
      "./byte": 8,
      "./char": 9,
      "./float32be": 10,
      "./float32le": 11,
      "./float64be": 12,
      "./float64le": 13,
      "./int16be": 15,
      "./int16le": 16,
      "./int32be": 17,
      "./int32le": 18,
      "./int8": 19,
      "./long": 20,
      "./short": 21,
      "./uint16be": 22,
      "./uint16le": 23,
      "./uint32be": 24,
      "./uint32le": 25,
      "./uint8": 26,
      "./word": 27
    }],
    15: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "int16be",
            type: "Int16",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.int16be;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.int16be = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    16: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "int16le",
            type: "Int16",
            option: true
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.int16le;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.int16le = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    17: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "int32be",
            type: "Int32",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.int32be;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.int32be = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    18: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "int32le",
            type: "Int32",
            option: true
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.int32le;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.int32le = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    19: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "int8",
            type: "Int8"
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.int8;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.int8 = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    20: [function (t, e, r) {
      "use strict";

      function n(t) {
        return t && t.__esModule ? t : {
          "default": t
        };
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = n(t("../struct")),
        i = n(t("./word")),
        u = n(t("./float64be")),
        f = n(t("./float64le"));
      r["default"] = o["default"].union(u["default"], f["default"], o["default"].extend({
        name: "lo",
        type: i["default"]
      }, {
        name: "hi",
        type: i["default"]
      }));
    }, {
      "../struct": 7,
      "./float64be": 12,
      "./float64le": 13,
      "./word": 27
    }],
    21: [function (t, e, r) {
      "use strict";

      function n(t) {
        return t && t.__esModule ? t : {
          "default": t
        };
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = n(t("../struct")),
        i = n(t("./byte")),
        u = n(t("./int16be")),
        f = n(t("./int16le")),
        a = n(t("./uint16be")),
        c = n(t("./uint16le"));
      r["default"] = o["default"].union(u["default"], f["default"], a["default"], c["default"], o["default"].extend({
        name: "lo",
        type: i["default"]
      }, {
        name: "hi",
        type: i["default"]
      }));
    }, {
      "../struct": 7,
      "./byte": 8,
      "./int16be": 15,
      "./int16le": 16,
      "./uint16be": 22,
      "./uint16le": 23
    }],
    22: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "uint16be",
            type: "Uint16",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.uint16be;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.uint16be = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    23: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "uint16le",
            type: "Uint16",
            option: true
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.uint16le;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.uint16le = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    24: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "uint32be",
            type: "Uint32",
            option: false
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.uint32be;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.uint32be = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    25: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "uint32le",
            type: "Uint32",
            option: true
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.uint32le;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.uint32le = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    26: [function (t, e, r) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != _typeof(e) && "function" != typeof e ? t : e;
      }
      function i(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var u = function () {
          function t(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r];
              n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e;
          };
        }(),
        f = function (t) {
          return t && t.__esModule ? t : {
            "default": t
          };
        }(t("../struct")),
        a = function (t) {
          function e() {
            return n(this, e), o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
          }
          return i(e, f["default"].extend({
            name: "uint8",
            type: "Uint8"
          })), u(e, [{
            key: "get",
            value: function value() {
              return this.uint8;
            }
          }, {
            key: "set",
            value: function value(t) {
              this.uint8 = t;
            }
          }]), e;
        }();
      r["default"] = a;
    }, {
      "../struct": 7
    }],
    27: [function (t, e, r) {
      "use strict";

      function n(t) {
        return t && t.__esModule ? t : {
          "default": t
        };
      }
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = n(t("../struct")),
        i = n(t("./short")),
        u = n(t("./float32be")),
        f = n(t("./float32le")),
        a = n(t("./int32be")),
        c = n(t("./int32le")),
        s = n(t("./uint32be")),
        l = n(t("./uint32le"));
      r["default"] = o["default"].union(u["default"], f["default"], a["default"], c["default"], s["default"], l["default"], o["default"].extend({
        name: "lo",
        type: i["default"]
      }, {
        name: "hi",
        type: i["default"]
      }));
    }, {
      "../struct": 7,
      "./float32be": 10,
      "./float32le": 11,
      "./int32be": 17,
      "./int32le": 18,
      "./short": 21,
      "./uint32be": 24,
      "./uint32le": 25
    }]
  }, {}, [1])(1);
});