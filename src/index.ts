import type { IntType, IntOptions, StructField, ParseStructResult, StructsMap } from './types';

class Int {
  #type: IntType;
  #byteOffset: number;
  #littleEndian: boolean;
  #length: number;
  #byteLength: number;
  #size: number;

  constructor({ byteLength, type, byteOffset, littleEndian, length }: IntOptions) {
    this.#type = type;
    this.#byteOffset = byteOffset;
    this.#littleEndian = littleEndian ?? true;
    this.#length = length ?? 1;
    this.#byteLength = byteLength;
    this.#size = byteLength * this.#length;
  }

  get byteLength(): number {
    return this.#byteLength;
  }

  get size(): number {
    return this.#size;
  }

  #setInt(buffer: DataView, value: number, byteOffset: number = this.#byteOffset) {
    (buffer as any)[`set${this.#type}`](byteOffset, value, this.#littleEndian);
  }

  #getInt(buffer: DataView, byteOffset: number = this.#byteOffset): number {
    return (buffer as any)[`get${this.#type}`](byteOffset, this.#littleEndian);
  }

  #setIntArray(buffer: DataView, array: number[]) {
    for (let i = 0; i < this.#length; i++) {
      const value = array?.[i] ?? 0;
      this.#setInt(buffer, value, this.#byteOffset + i * this.#byteLength);
    }
  }

  #getIntArray(buffer: DataView): number[] {
    const arr: number[] = [];
    for (let i = 0; i < this.#length; i++) {
      const value = this.#getInt(buffer, this.#byteOffset + i * this.#byteLength);
      arr.push(value);
    }
    return arr;
  }

  set(buffer: DataView, data: number | number[]) {
    if (this.#length === 1) this.#setInt(buffer, data as number);
    else this.#setIntArray(buffer, data as number[]);
  }

  get(buffer: DataView): number | number[] {
    return this.#length === 1 ? this.#getInt(buffer) : this.#getIntArray(buffer);
  }
}

class Char extends Int {
  constructor(object: IntOptions) {
    super(object);
  }
  set(buffer: DataView, value: string): void;
  set(buffer: DataView, value: number | number[]): void;
  set(buffer: DataView, value: string | number | number[]): void {
    if (typeof value === 'string') {
      const arr = value.split('').map(char => char.charCodeAt(0));
      super.set(buffer, arr);
    } else {
      super.set(buffer, value as number | number[]);
    }
  }
  get(buffer: DataView): number | number[];
  get(buffer: DataView, asString: true): string;
  get(buffer: DataView, asString?: boolean): number | number[] | string {
    const arr = super.get(buffer) as number[];
    return String.fromCharCode(...arr.filter(i => i));
  }
}

type StructObject = Record<string, Int | Char>;
type StructInput = Record<string, number | number[] | string>;

class Struct {
  #length: number;
  #object: StructObject;
  #struct: DataView;
  #byteOffset: number;

  constructor(array: StructField[]) {
    this.#length = 0;
    this.#object = {};
    this.#byteOffset = 0;
    this.init(array);
    this.#struct = new DataView(new ArrayBuffer(this.#length));
  }

  static parseStruct(data: string): ParseStructResult {
    data = data.replace(/\r?\n/g, '');
    const getStruct = data.match(/struct(.*?)};/gi) || [];
    const getEnum = data.match(/enum(.*?)};/gi) || [];

    const structs: StructsMap = {};
    let keys: string[] = [];

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
        const res: StructField = { type, name };
        if (length) res.length = +length;
        structs[structName].push(res);
      });
    });

    return { keys, structs };
  }

  init(array: StructField[]) {
    array.forEach(item => {
      const byteOffset = item.byteOffset ?? this.#byteOffset;
      this.#object[item.name] = this.getInstanceData(item.type, { ...item, byteOffset });
      const size = this.#object[item.name].size;
      this.#byteOffset += size;
      this.#length += size;
    });
  }

  private getInstanceData(type: string, data: StructField): Int | Char {
    const byteOffset = data.byteOffset ?? 0;
    if (['int8_t'].includes(type)) return new Int({ ...data, byteLength: 1, type: 'Int8', byteOffset });
    if (['int16_t'].includes(type)) return new Int({ ...data, byteLength: 2, type: 'Int16', byteOffset });
    if (['int32_t'].includes(type)) return new Int({ ...data, byteLength: 4, type: 'Int32', byteOffset });
    if (['uint8_t'].includes(type)) return new Int({ ...data, byteLength: 1, type: 'Uint8', byteOffset });
    if (['uint16_t'].includes(type)) return new Int({ ...data, byteLength: 2, type: 'Uint16', byteOffset });
    if (['uint32_t'].includes(type)) return new Int({ ...data, byteLength: 4, type: 'Uint32', byteOffset });
    if (['float'].includes(type)) return new Int({ ...data, byteLength: 4, type: 'Float32', byteOffset });
    if (['char'].includes(type)) return new Char({ ...data, byteLength: 1, type: 'Uint8', byteOffset });
    throw new Error(`Unknown type: ${type}`);
  }

  get length(): number {
    return this.#length;
  }

  getObject(): StructInput {
    const obj: StructInput = {};
    for (const key in this.#object) {
      const data = this.#object[key];
      if (data instanceof Char) obj[key] = data.get(this.#struct);
      else if (data) obj[key] = data.get(this.#struct);
    }
    return obj;
  }

  setObject(object: StructInput): this {
    for (const key in object) {
      const data = this.#object[key];
      const value = object[key];
      if (data) data.set(this.#struct, value as any);
    }
    return this;
  }

  getBuffer(): ArrayBuffer {
    return this.#struct.buffer instanceof ArrayBuffer ? this.#struct.buffer.slice(0) : new ArrayBuffer(0);
  }

  setBuffer(buffer: ArrayBuffer): this {
    if (buffer instanceof ArrayBuffer) {
      if (buffer.byteLength !== this.#struct.buffer.byteLength) return this;
      this.#struct = new DataView(buffer);
    }
    return this;
  }
}

export default Struct;
