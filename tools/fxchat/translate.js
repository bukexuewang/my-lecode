import fse from 'fs-extra';
import path from 'path';
import xlsx from 'node-xlsx';

import cn from './lang/cn.json';
import { isObj, resolve } from './common.js';

const jsonClone = (obj) => JSON.parse(JSON.stringify(obj));

function deleteFilesInFolder(folderPath) {
  const files = fse.readdirSync(folderPath);
  // if (err) {
  //   console.error(`Error reading folder ${folderPath}:`, err);
  //   return;
  // }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    const stats = fse.statSync(filePath);

    if (stats.isDirectory()) {
      deleteFilesInFolder(filePath);
    } else {
      fse.unlinkSync(filePath);
      console.log(`Deleted file ${filePath}`);
    }
  });
}

/**
 *
 * @param {string} source
 * @param {string} target
 */

const slotReplaceTxt = (source, target) => {
  if (!source) return target;
  const reg = /\{.+?\}/gi;
  const list = source.match(reg);
  if (!list || !target) return target;
  let i = 0;
  return target.replace(reg, () => {
    const val = list[i];
    i++;
    return val;
  });
};

const syncFile = () => {
  const data = xlsx.parse(resolve('./files/output.xlsx'));
  const langMap = new Map();
  let titleArr = ['cn', 'tw', 'en', 'vi', 'th', 'ru', 'ar', 'id', 'ms', 'es', 'jp', 'ko', 'pt', 'it', 'fr', 'tr'];
  data.forEach((sheet, i) => {
    const list = sheet.data;
    if (!i) list.shift();
    // if (!i) titleArr = list.shift().slice(1);
    list.forEach((item) => {
      const [key, ...rest] = item;
      const obj = {};
      const cn = rest[0];
      titleArr.forEach((v, i) => {
        obj[v] = i ? slotReplaceTxt(cn, rest[i]) : cn;
      });
      langMap.set(key, obj);
    });
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

  deleteFilesInFolder(resolve('./output'));

  titleArr.forEach((v) => {
    const sourceObj = jsonClone(cn);
    dfs(v, langMap, sourceObj, '');
    fse.outputJsonSync(resolve(`./output/${v}.json`), sourceObj, { spaces: 2 });
  });
};
syncFile();
