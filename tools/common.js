import path from 'path';
import url from 'node:url';
import fs from 'fs';
import xlsx from 'node-xlsx';

/**
 * 导出一个函数，该函数返回一个映射，其中包含关于Google概念的信息。
 * 该函数从包含信息的Excel文件中读取，并将键映射到包含对应中文、繁体中文和英文翻译的对象。
 * @function getGoogleCon
 * @returns {Map} 包含关于Google概念信息的映射。
 */
export const getGoogleCon = () => {
  const file = resolve('./excel/source.xlsx');
  const con = xlsx.parse(file);
  const conMap = new Map();
  con.forEach((item) => {
    if (!/\w+/.test(item.name)) return;
    item.data.forEach((el, i) => {
      if (!i || !el?.length) return;
      const [key, cn, tw, en] = el;
      conMap.set(key, { cn, tw, en });
    });
  });
  return conMap;
};

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const resolve = (str) => path.join(__dirname, str);

/**
 * 导出一个函数，该函数返回一个映射，其中包含关于语言特定概念的信息。
 * 该函数从三个包含信息的JSON文件中读取，并将键映射到包含对应中文、繁体中文和英文翻译的对象。
 * @function getLangCon
 * @returns {object} 包含关于语言特定概念信息的映射。
 */
export const getLangCon = () => {
  const cnStr = fs.readFileSync(resolve('./lang/cn.json'), { encoding: 'utf-8' });
  const twStr = fs.readFileSync(resolve('./lang/tw.json'), { encoding: 'utf-8' });
  const enStr = fs.readFileSync(resolve('./lang/en.json'), { encoding: 'utf-8' });
  const obj = {};
  [cnStr, twStr, enStr].forEach((str, i) => {
    const strObj = JSON.parse(str);
    const lang = ['cn', 'tw', 'en'][i];
    Object.entries(strObj).forEach(([key, val]) => {
      const objVal = obj[key];
      if (objVal) objVal[lang] = val;
      else obj[key] = { [lang]: val };
    });
  });
  return obj;
};

// ws协议
export const wsProtocol = 'ws://';