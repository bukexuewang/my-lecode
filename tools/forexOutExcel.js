import fs from 'fs';
import xlsx from 'node-xlsx';
import { getGoogleCon, resolve, getLangCon } from './common.js';

const isSameStr = (str1, str2) => {
  const fn = (v) => v.replace(/\{.?\}/g, '');
  return fn(str1) === fn(str2);
};

const diffCon = () => {
  const localObj = getLangCon();
  const googleConMap = getGoogleCon();
  const list = [['Key', 'local-cn', 'cn', 'local-tw', 'tw', 'local-en', 'tw']];
  Object.entries(localObj).forEach(([key, obj]) => {
    const mapVal = googleConMap.get(key);
    const arr = [key];
    Object.entries(obj).forEach(([lang, val]) => {
      if (!mapVal) {
        arr.push(val, '');
      } else {
        const mapLangVal = mapVal[lang] || '';
        if (!isSameStr(val || '', mapLangVal)) arr.push(val, mapLangVal);
        else arr.push('', '');
      }
    });
    if (arr.filter((v) => v).length > 1) list.push(arr);
  });
  const buffer = xlsx.build([{ name: 'sheet', data: list }]);
  fs.writeFileSync(resolve('./output/output.xlsx'), buffer, { encoding: 'binary' });
};
diffCon();
