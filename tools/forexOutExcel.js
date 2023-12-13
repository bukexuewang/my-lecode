import fs from 'fs';
import xlsx from 'node-xlsx';
import { getGoogleCon, resolve, getLangCon } from './common.js';

/**
 * 检查两个字符串是否相同，在删除占位符之后。
 * @function isSameStr
 * @param {string} str1 第一个要比较的字符串。
 * @param {string} str2 第二个要比较的字符串。
 * @returns {boolean} 两个字符串是否在删除占位符之后相同。
 */
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
