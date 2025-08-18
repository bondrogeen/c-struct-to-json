// import Struct from '../build/index.js';
const Struct = require('../build/index.js').default

console.log(Struct);


const myStruct = new Struct([
  { name: 'key', type: 'uint8_t' },
  { name: 'version', type: 'uint8_t', length: 3 },
  { name: 'size', type: 'uint16_t' },
  { name: 'total', type: 'uint32_t' },
  { name: 'temp', type: 'int8_t', length: 2 },
  { name: 'height', type: 'int16_t' },
  { name: 'depth', type: 'int32_t' },
  { name: 'text', type: 'char', length: 10 },
  { name: 'uint32', type: 'uint32_t', length: 8 },
]);

myStruct.setObject({ key: 37, version: [5, 68, 255], size: 65535, total: 4294967295, temp: [0, -127], height: -32768, depth: -2147483648, text: 'test', uint32: [0, 654321, 2, 3, 999999, 5] });

const object = myStruct.getObject();
console.log(object);

const buffer = myStruct.getBuffer();
console.log(buffer);

const newMyStruct = myStruct.setBuffer(new ArrayBuffer(myStruct.length)).getObject();
console.log(newMyStruct);

const textOne = new Struct([{ name: 'text', type: 'char', length: 50 }]);
const textTwo = new Struct([{ name: 'text', type: 'char', length: 50 }]);

textOne.setObject({ text: 'git clone https://github.com/bondrogeen/c-struct-to-json' });

console.log(textTwo.setBuffer(textOne.getBuffer()).getObject());
