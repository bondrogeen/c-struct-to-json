const getCharCodes = s => {
  let charCodeArr = [];

  for (let i = 0; i < s.length; i++) {
    let code = s.charCodeAt(i);
    charCodeArr.push(code);
  }
  return charCodeArr;
};

const parseStruct = test => {
  test = test.replace(/\r?\n/g, '');
  const getStruct = data.match(/struct(.*?)};/gi);
  const getEnum = data.match(/enum(.*?)};/gi);

  const structs = {};
  let keys;

  getEnum.forEach(data => {
    // const enumName = data.match(/[^enum\s](\w*)/)[0];
    const all = data.match(/\w*,/g);
    keys = all.map(i => i.replace(',', ''));
  });

  getStruct.forEach(struct => {
    const structName = struct.match(/[^struct\s](\w*)/)[0];
    structs[structName] = [];
    const args = struct.match(/{(.*)}/)[0].replace(/[{,}]/g, '');
    const variables = args.match(/[^\s*](\w*) (\w*|\w*\[\d*\]);/g);
    variables.forEach(variable => {
      const [type, value] = variable.split(' ');
      const name = value.match(/(\w*)/)[0];
      const length = value.match(/\d+/)?.[0];
      const res = { t: type, n: name };
      if (length) res.l = +length;
      structs[structName].push(res);
    });
  });

  return { keys, structs };
};
