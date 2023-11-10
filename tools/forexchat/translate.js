import fs from 'fs';
import xlsx from 'node-xlsx';

import cn from './lang/cn.json';
import { isObj, resolve } from './common';

const jsonClone = (obj) => JSON.parse(JSON.stringify(obj));

const syncFile = () => {
  const data = xlsx.parse(resolve('./files/output.xlsx'));
  const sheet = data[0].data;
  const titleArr = sheet.shift().slice(1);
  const langMap = new Map();
  sheet.forEach((item) => {
    const [key, ...rest] = item;
    const obj = {};
    titleArr.forEach((v, i) => {
      obj[v] = rest[i];
    });
    langMap.set(key, obj);
  });

  /**
   *
   * @param {string} lang
   * @param {Map} langMap
   * @param {object} obj
   * @param {string} preKey
   */
  const dfs = (lang, langMap, obj, preKey = '') => {
    if (!isObj(obj)) return obj;
    Object.entries(obj).forEach(([key, value]) => {
      const resKey = preKey ? `${preKey}_${key}` : key;
      if (isObj(value)) obj[key] = dfs(lang, langMap, value, resKey);
      else {
        const langObj = langMap.get(resKey);
        if (langObj) {
          const v = langObj[lang];
          if (v) obj[key] = v;
        }
      }
    });
    return obj;
  };

  titleArr.forEach((v) => {
    const sourceObj = jsonClone(cn);
    dfs(v, langMap, sourceObj, '');
    fs.writeFileSync(resolve(`./output/${v}.json`), JSON.stringify(sourceObj), 'utf-8');
  });
};
syncFile();
