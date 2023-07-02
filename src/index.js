class Int {
  #type;
  #byteOffset;
  #littleEndian;
  #length;
  #byteLength;
  #size;

  constructor({ byteLength, type, byteOffset, littleEndian, length }) {
    this.#type = type;
    this.#byteOffset = byteOffset;
    this.#littleEndian = littleEndian || true;
    this.#length = length || 1;
    this.#byteLength = byteLength;
    this.#size = byteLength * this.#length;
  }

  get byteLength() {
    return this.#byteLength;
  }

  get size() {
    return this.#size;
  }

  #setInt(bufer, value, byteOffset = this.#byteOffset) {
    bufer[`set${this.#type}`](byteOffset, value, this.#type, this.#littleEndian);
  }

  #getInt(bufer, byteOffset = this.#byteOffset) {
    return bufer[`get${this.#type}`](byteOffset, this.#littleEndian);
  }

  #setIntArray(bufer, array) {
    for (let i = 0; i < this.#length; i++) {
      const value = array?.[i] || 0;
      this.#setInt(bufer, value, this.#byteOffset + i * this.#byteLength);
    }
  }

  #getIntArray(bufer) {
    const arr = [];
    for (let i = 0; i < this.#length; i++) {
      const value = this.#getInt(bufer, this.#byteOffset + i * this.#byteLength);
      arr.push(value);
    }
    return arr;
  }

  set(bufer, data) {
    if (this.#length === 1) this.#setInt(bufer, data);
    else this.#setIntArray(bufer, data);
  }

  get(bufer) {
    return this.#length === 1 ? this.#getInt(bufer) : this.#getIntArray(bufer);
  }
}

class Char extends Int {
  constructor(object) {
    super(object);
  }
  set(bufer, value) {
    const arr = value.split('').map(char => char.charCodeAt(0));
    super.set(bufer, arr);
  }
  get(bufer) {
    const arr = super.get(bufer);
    return String.fromCharCode(...arr.filter(i => i));
  }
}

class Struct {
  #length;
  #object;
  #struct;
  #byteOffset;

  constructor(array) {
    this.#length = 0;
    this.#object = {};
    this.#byteOffset = 0;
    this.init(array);
    this.#struct = new DataView(new ArrayBuffer(this.#length));
  }

  init(array) {
    array.forEach(item => {
      this.#object[item.name] = this.getInstanceData(item.type, { ...item, byteOffset: this.#byteOffset });
      const size = this.#object[item.name].size;
      this.#byteOffset += size;
      this.#length += size;
    });
  }

  getInstanceData(type, data) {
    if (['int8_t'].includes(type)) return new Int({ ...data, byteLength: 1, type: 'Int8' });
    if (['int16_t'].includes(type)) return new Int({ ...data, byteLength: 2, type: 'Int16' });
    if (['int32_t'].includes(type)) return new Int({ ...data, byteLength: 4, type: 'Int32' });
    if (['uint8_t'].includes(type)) return new Int({ ...data, byteLength: 1, type: 'Uint8' });
    if (['uint8_t'].includes(type)) return new Int({ ...data, byteLength: 1, type: 'Uint8' });
    if (['uint16_t'].includes(type)) return new Int({ ...data, byteLength: 2, type: 'Uint16' });
    if (['uint32_t'].includes(type)) return new Int({ ...data, byteLength: 4, type: 'Uint32' });
    if (['float'].includes(type)) return new Int({ ...data, byteLength: 4, type: 'Float32' });
    if (['char'].includes(type)) return new Char({ ...data, byteLength: 1, type: 'Uint8' });
  }

  get length() {
    return this.#length;
  }

  getObject() {
    const obj = {};
    for (const key in this.#object) {
      const data = this.#object[key];
      if (data) obj[key] = data.get(this.#struct);
    }
    return obj;
  }

  setObject(object) {
    for (const key in object) {
      const data = this.#object[key];
      const value = object[key];
      if (data) data.set(this.#struct, value);
    }
    return this;
  }

  getBuffer() {
    return this.#struct.buffer;
  }

  setBuffer(buffer) {
    if (buffer instanceof ArrayBuffer) {
      if (buffer.size !== this.#struct.buffer.size) return this;
      this.#struct = new DataView(buffer);
    }
    return this;
  }
}

export default Struct;
