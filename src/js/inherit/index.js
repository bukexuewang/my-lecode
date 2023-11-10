import fs from 'fs';

const fn = () => {
  const obj = {
    abc: '',
    map: new Map(),
    setVal: new Set(),
    time: new Date(),
    empty: undefined,
    emptyVal: null,
    bigNum: 18n,
    fn: function (a, b) {
      return a + b;
    },
    symbolVal: Symbol('test'),
    num: 2
    // self: obj
  };

  const str = JSON.stringify(obj);
};

const processStr = JSON.stringify(process);

fs.writeFileSync('./process.txt', processStr, 'utf-8');
