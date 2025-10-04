"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Int_instances, _Int_type, _Int_byteOffset, _Int_littleEndian, _Int_length, _Int_byteLength, _Int_size, _Int_setInt, _Int_getInt, _Int_setIntArray, _Int_getIntArray, _Struct_length, _Struct_object, _Struct_struct, _Struct_byteOffset;
Object.defineProperty(exports, "__esModule", { value: true });
class Int {
    constructor({ byteLength, type, byteOffset, littleEndian, length }) {
        _Int_instances.add(this);
        _Int_type.set(this, void 0);
        _Int_byteOffset.set(this, void 0);
        _Int_littleEndian.set(this, void 0);
        _Int_length.set(this, void 0);
        _Int_byteLength.set(this, void 0);
        _Int_size.set(this, void 0);
        __classPrivateFieldSet(this, _Int_type, type, "f");
        __classPrivateFieldSet(this, _Int_byteOffset, byteOffset, "f");
        __classPrivateFieldSet(this, _Int_littleEndian, littleEndian ?? true, "f");
        __classPrivateFieldSet(this, _Int_length, length ?? 1, "f");
        __classPrivateFieldSet(this, _Int_byteLength, byteLength, "f");
        __classPrivateFieldSet(this, _Int_size, byteLength * __classPrivateFieldGet(this, _Int_length, "f"), "f");
    }
    get byteLength() {
        return __classPrivateFieldGet(this, _Int_byteLength, "f");
    }
    get size() {
        return __classPrivateFieldGet(this, _Int_size, "f");
    }
    set(buffer, data) {
        if (__classPrivateFieldGet(this, _Int_length, "f") === 1)
            __classPrivateFieldGet(this, _Int_instances, "m", _Int_setInt).call(this, buffer, data);
        else
            __classPrivateFieldGet(this, _Int_instances, "m", _Int_setIntArray).call(this, buffer, data);
    }
    get(buffer) {
        return __classPrivateFieldGet(this, _Int_length, "f") === 1 ? __classPrivateFieldGet(this, _Int_instances, "m", _Int_getInt).call(this, buffer) : __classPrivateFieldGet(this, _Int_instances, "m", _Int_getIntArray).call(this, buffer);
    }
}
_Int_type = new WeakMap(), _Int_byteOffset = new WeakMap(), _Int_littleEndian = new WeakMap(), _Int_length = new WeakMap(), _Int_byteLength = new WeakMap(), _Int_size = new WeakMap(), _Int_instances = new WeakSet(), _Int_setInt = function _Int_setInt(buffer, value, byteOffset = __classPrivateFieldGet(this, _Int_byteOffset, "f")) {
    buffer[`set${__classPrivateFieldGet(this, _Int_type, "f")}`](byteOffset, value, __classPrivateFieldGet(this, _Int_littleEndian, "f"));
}, _Int_getInt = function _Int_getInt(buffer, byteOffset = __classPrivateFieldGet(this, _Int_byteOffset, "f")) {
    return buffer[`get${__classPrivateFieldGet(this, _Int_type, "f")}`](byteOffset, __classPrivateFieldGet(this, _Int_littleEndian, "f"));
}, _Int_setIntArray = function _Int_setIntArray(buffer, array) {
    for (let i = 0; i < __classPrivateFieldGet(this, _Int_length, "f"); i++) {
        const value = array?.[i] ?? 0;
        __classPrivateFieldGet(this, _Int_instances, "m", _Int_setInt).call(this, buffer, value, __classPrivateFieldGet(this, _Int_byteOffset, "f") + i * __classPrivateFieldGet(this, _Int_byteLength, "f"));
    }
}, _Int_getIntArray = function _Int_getIntArray(buffer) {
    const arr = [];
    for (let i = 0; i < __classPrivateFieldGet(this, _Int_length, "f"); i++) {
        const value = __classPrivateFieldGet(this, _Int_instances, "m", _Int_getInt).call(this, buffer, __classPrivateFieldGet(this, _Int_byteOffset, "f") + i * __classPrivateFieldGet(this, _Int_byteLength, "f"));
        arr.push(value);
    }
    return arr;
};
class Char extends Int {
    constructor(object) {
        super(object);
    }
    set(buffer, value) {
        if (typeof value === 'string') {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(value);
            super.set(buffer, Array.from(bytes));
        }
        else {
            super.set(buffer, value);
        }
    }
    get(buffer, asString) {
        const arr = super.get(buffer);
        const bytes = new Uint8Array(arr.filter(i => i));
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    }
}
class Struct {
    constructor(array) {
        _Struct_length.set(this, void 0);
        _Struct_object.set(this, void 0);
        _Struct_struct.set(this, void 0);
        _Struct_byteOffset.set(this, void 0);
        __classPrivateFieldSet(this, _Struct_length, 0, "f");
        __classPrivateFieldSet(this, _Struct_object, {}, "f");
        __classPrivateFieldSet(this, _Struct_byteOffset, 0, "f");
        this.init(array);
        __classPrivateFieldSet(this, _Struct_struct, new DataView(new ArrayBuffer(__classPrivateFieldGet(this, _Struct_length, "f"))), "f");
    }
    static parseStruct(data) {
        data = data.replace(/\r?\n/g, '');
        const getStruct = data.match(/struct(.*?)};/gi) || [];
        const getEnum = data.match(/enum(.*?)};/gi) || [];
        const structs = {};
        let keys = [];
        getEnum.forEach(enumData => {
            const all = enumData.match(/\w*,/g) || [];
            keys = all.map(i => i.replace(',', '').replace('KEY_', ''));
        });
        getStruct.forEach(struct => {
            const structName = struct.match(/[^struct\s](\w*)/)?.[0] || '';
            structs[structName] = [];
            const args = struct.match(/{(.*)}/)?.[0].replace(/[{,}]/g, '') || '';
            const variables = args.match(/[^\s*](\w*) (\w*|\w*\[\d*\]);/g) || [];
            variables.forEach(variable => {
                const [type, value] = variable.split(' ');
                const name = value.match(/(\w*)/)?.[0] || '';
                const length = value.match(/\[(\d+)\]/)?.[1];
                const res = { type, name };
                if (length)
                    res.length = +length;
                structs[structName].push(res);
            });
        });
        return { keys, structs };
    }
    init(array) {
        array.forEach(item => {
            const byteOffset = item.byteOffset ?? __classPrivateFieldGet(this, _Struct_byteOffset, "f");
            __classPrivateFieldGet(this, _Struct_object, "f")[item.name] = this.getInstanceData(item.type, { ...item, byteOffset });
            const size = __classPrivateFieldGet(this, _Struct_object, "f")[item.name].size;
            __classPrivateFieldSet(this, _Struct_byteOffset, __classPrivateFieldGet(this, _Struct_byteOffset, "f") + size, "f");
            __classPrivateFieldSet(this, _Struct_length, __classPrivateFieldGet(this, _Struct_length, "f") + size, "f");
        });
    }
    getInstanceData(type, data) {
        const byteOffset = data.byteOffset ?? 0;
        if (['int8_t'].includes(type))
            return new Int({ ...data, byteLength: 1, type: 'Int8', byteOffset });
        if (['int16_t'].includes(type))
            return new Int({ ...data, byteLength: 2, type: 'Int16', byteOffset });
        if (['int32_t'].includes(type))
            return new Int({ ...data, byteLength: 4, type: 'Int32', byteOffset });
        if (['uint8_t'].includes(type))
            return new Int({ ...data, byteLength: 1, type: 'Uint8', byteOffset });
        if (['uint16_t'].includes(type))
            return new Int({ ...data, byteLength: 2, type: 'Uint16', byteOffset });
        if (['uint32_t'].includes(type))
            return new Int({ ...data, byteLength: 4, type: 'Uint32', byteOffset });
        if (['float'].includes(type))
            return new Int({ ...data, byteLength: 4, type: 'Float32', byteOffset });
        if (['char'].includes(type))
            return new Char({ ...data, byteLength: 1, type: 'Uint8', byteOffset });
        throw new Error(`Unknown type: ${type}`);
    }
    get length() {
        return __classPrivateFieldGet(this, _Struct_length, "f");
    }
    getObject() {
        const obj = {};
        for (const key in __classPrivateFieldGet(this, _Struct_object, "f")) {
            const data = __classPrivateFieldGet(this, _Struct_object, "f")[key];
            if (data instanceof Char)
                obj[key] = data.get(__classPrivateFieldGet(this, _Struct_struct, "f"));
            else if (data)
                obj[key] = data.get(__classPrivateFieldGet(this, _Struct_struct, "f"));
        }
        return obj;
    }
    setObject(object) {
        for (const key in object) {
            const data = __classPrivateFieldGet(this, _Struct_object, "f")[key];
            const value = object[key];
            if (data)
                data.set(__classPrivateFieldGet(this, _Struct_struct, "f"), value);
        }
        return this;
    }
    getBuffer() {
        return __classPrivateFieldGet(this, _Struct_struct, "f").buffer instanceof ArrayBuffer ? __classPrivateFieldGet(this, _Struct_struct, "f").buffer.slice(0) : new ArrayBuffer(0);
    }
    setBuffer(buffer) {
        if (buffer instanceof ArrayBuffer) {
            if (buffer.byteLength !== __classPrivateFieldGet(this, _Struct_struct, "f").buffer.byteLength)
                return this;
            __classPrivateFieldSet(this, _Struct_struct, new DataView(buffer), "f");
        }
        return this;
    }
}
_Struct_length = new WeakMap(), _Struct_object = new WeakMap(), _Struct_struct = new WeakMap(), _Struct_byteOffset = new WeakMap();
exports.default = Struct;
