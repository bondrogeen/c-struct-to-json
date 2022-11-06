import Struct from '../src';

const myStruct = new Struct([
  { name: 'key', type: 'uint8_t' },
  { name: 'version', type: 'uint8_t', length: 3 },
  { name: 'size', type: 'uint16_t' },
  { name: 'total', type: 'uint32_t' },
  { name: 'temp', type: 'int8_t', length: 2 },
  { name: 'height', type: 'int16_t' },
  { name: 'depth', type: 'int32_t' },
  { name: 'text', type: 'char', length: 10 },
]);

myStruct.setObject({ key: 37, version: [5, 68, 255], size: 65535, total: 4294967295, temp: [0, -127], height: -32768, depth: -2147483648, text: 'test' });

const object = myStruct.getObject();

console.log(object);
// {
//   key: 37,
//   version: [ 5, 68, 255 ],
//   size: 65535,
//   total: 4294967295,
//   temp: [ 0, -127 ],
//   height: -32768,
//   depth: -2147483648,
//   text: 'test'
// }

const buffer = myStruct.getBuffer();

console.log(buffer);

// ArrayBuffer {
//   [Uint8Contents]: <25 05 44 ff ff ff ff ff ff ff 00 81 00 80 00 00 00 80 74 65 73 74 00 00 00 00 00 00>,
//   byteLength: 28
// }

const newMyStruct = myStruct.setBuffer(new ArrayBuffer(myStruct.length)).getObject();

console.log(newMyStruct);
// {
//   key: 0,
//   version: [ 0, 0, 0 ],
//   size: 0,
//   total: 0,
//   temp: [ 0, 0 ],
//   height: 0,
//   depth: 0,
//   text: ''
// }
