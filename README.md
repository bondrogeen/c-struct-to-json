# c-struct-to-json

C struct to JSON

```
npm install c-struct-to-json
```

## Development

```
git clone https://github.com/bondrogeen/c-struct-to-json

cd c-struct-to-json

npm install

npm run dev

npm run build
```

## Usage

```js
// const Struct = require('c-struct-to-json')
import Struct from 'c-struct-to-json';

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
// {
//   key: 37,
//   version: [ 5, 68, 255 ],
//   size: 65535,
//   total: 4294967295,
//   temp: [ 0, -127 ],
//   height: -32768,
//   depth: -2147483648,
//   text: 'test'
//   uint32: [
//     0, 654321, 2,
//     3, 999999, 5,
//     0,      0
//   ]
// }

const buffer = myStruct.getBuffer();

console.log(buffer);

// ArrayBuffer {
//   [Uint8Contents]: <25 05 44 ff ff ff ff ff ff ff 00 81 00 80 00 00 00 80 74 65 73 74 00 00 00 00 00 00 00 00 00 00 f1 fb 09 00 02 00 00 00 03 00 00 00 3f 42 0f 00 05 00 00 00 00 00 00 00 00 00 00 00>,
//   byteLength: 60
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
```

See [example/example.js](example/example.js) for more.

### 1.0.1 (2023-07-02)

- (bondrogeen) fix array size

### 1.0.0 (2022-11-06)

- (bondrogeen) Change

### 0.1.1 (2022-11-02)

- (bondrogeen) init

## License

The MIT License (MIT)

Copyright (c) 2021-2022, bondrogeen <bondrogeen@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
