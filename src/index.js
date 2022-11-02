import Struct from './lib/index';

class StructToJSON {
  constructor() {
    this.keys = ['INIT'];
    this.isInit = false;
    this.onInit = null;
    this.structs = {
      INIT: Struct.extend({ name: 'key', type: Struct.types.Uint8 }),
    };
    this.types = {
      int8_t: Struct.types.Int8,
      int16_t: Struct.types.Int16LE,
      int32_t: Struct.types.Int32LE,
      uint8_t: Struct.types.Uint8,
      uint16_t: Struct.types.Uint16LE,
      uint32_t: Struct.types.Uint32LE,
      char: 'String',
    };
  }
  init(data) {
    if (typeof data === 'object') {
      const { keys, structs } = data;
      if (!keys && !Array.isArray(keys) && !structs && typeof data !== 'object') return;

      this.keys = keys;
      for (const key in structs) {
        const name = key.toUpperCase();
        const array = structs[key].map(this.redata.bind(this));
        this.structs[name] = Struct.extend(...array);
      }
      this.isInit = true;
      if (this.onInit) this.onInit();
    }
  }

  arrToJson(array) {
    try {
      let text = String.fromCharCode(...array);
      const obj = JSON.parse(text);
      if (obj) this.init(obj);
    } catch (error) {
      console.warn(error);
    }
  }

  redata({ t: type, n: name, l: byteLength }) {
    const obj = { name, type: this.types[type] };
    if (byteLength) obj.byteLength = +byteLength;
    return obj;
  }

  getCommand(key) {
    return typeof key === 'string' ? this.keys.findIndex(i => i === key) : this.keys[key];
  }

  cleanString(data) {
    const obj = {};
    for (const key in data) {
      obj[key] = typeof data[key] === 'string' ? data[key].replace(/\0/g, '') : data[key];
    }
    return obj;
  }

  set(key, data) {
    if (key) {
      const struct = data ? this.structs[key] : this.structs['INIT'];
      const command = this.getCommand(key);
      if (struct && command !== -1) {
        const object = new struct(new ArrayBuffer(struct.byteLength));
        if (object) {
          if (data) {
            for (const key in object) {
              object[key] = data[key];
            }
          }
          object['key'] = command;
          return object;
        }
      }
    }
    console.warn(`No struct or key ${key}`, data);
    return null;
  }

  get(data) {
    if (data instanceof ArrayBuffer) {
      const [key, ...array] = new Uint8Array(data);
      if (key === 0 && !this.isInit) this.arrToJson(array);
      const comm = this.getCommand(key);
      if (comm) {
        const struct = this.structs[comm];
        if (struct) {
          const obj = this.cleanString(new struct(data));
          obj['key'] = comm;
          return obj;
        }
      }
    }
    console.warn(`No struct from arr: ${data}`);
    return null;
  }
}

export default StructToJSON;
