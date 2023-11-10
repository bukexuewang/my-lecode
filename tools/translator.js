import fs from 'fs';
import path from 'path';
// import prettier from 'prettier';
import xlsx from 'node-xlsx';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const resolve = (str) => path.join(__dirname, str);

// const fs = require('fs');
// const path = require('path');
// const args = process.argv.slice(2);
// const prettier = require('prettier');

const isObject = (val) => val && typeof val === 'object';
const jsonClone = (val) => (isObject(val) ? JSON.parse(JSON.stringify(val)) : null);
// funcs

// 获取中文的内容
const getZhCnCon = () => {
  const str = fs.readFileSync(resolve('./files/cn.js'), { encoding: 'utf-8' });
  // fs.writeFileSync('./text.txt', str.replace('export default', ''), 'utf-8');
  const fn = eval(`() => (${str.replace('export default', '').replace(';', '')})`);
  return fn();
};

const getXlsxMap = () => {
  const res = xlsx.parse(resolve('./lang.xlsx'));
  const data = res[0].data.reduce((res, item) => {
    const key = item[0];
    res.set(key, item[2])
    return res;
  }, new Map());
  return data;
};

const objReplaceLang = (preKey, val, langMap) => {
  Object.entries(val).forEach((key, value) => {
    const rKey = preKey ? `${preKey}_${key}` : key;
    if (isObject(value)) objReplaceLang(rKey, val, langMap);
    else if (langMap.has(rKey)) val[key] = langMap.get(rKey);
  });
  return val;
};

// 同步对象的keys
const syncObjKeys = (preKey, baseObj, targetObj, langMap) => {
  if (!isObject(baseObj)) return;
  const targetObjKeysSet = new Set(Object.keys(targetObj));
  Object.entries(baseObj).forEach(([key, value]) => {
    targetObjKeysSet.delete(key);
    const rKey = preKey ? `${preKey}_${key}` : key;
    if (Reflect.has(targetObj, key)) {
      if (isObject(value)) {
        if (isObject(targetObj[key])) syncObjKeys(rKey, value, targetObj[key], langMap);
        else targetObj[key] = objReplaceLang(rKey, jsonClone(value), langMap);
      } else {
        const langVal = langMap.get(rKey);
        if (langVal) targetObj[key] = langVal;
      }
    } else {
      targetObj[key] = isObject(value)
        ? objReplaceLang(rKey, jsonClone(value), langMap)
        : langMap.has(rKey)
          ? langMap.get(rKey)
          : value;
    }
  });
  if (targetObjKeysSet.size) {
    if (Array.isArray(targetObj)) {
      Array.from(targetObjKeysSet)
        .map((v) => +v)
        .sort()
        .reverse()
        .forEach((v) => targetObj.splice(v, 1));
    } else {
      targetObjKeysSet.forEach((key) => Reflect.deleteProperty(targetObj, key));
    }
  }
  return targetObj;
};

// 根据zh-cn文件同步其他文件keys
const syncFiles = (dir) => {
  const files = getFiles(dir);
  const cnIndex = files.findIndex((item) => item.lang === 'zh-cn');
  if (cnIndex < 0) return;
  const baseFile = files.splice(cnIndex, 1)[0];
  // const baseFile = files[cnIndex]
  const baseObj = baseFile.source;
  const langObj = getXlsxMap();
  files.forEach((item) => {
    syncObjKeys('', baseObj, item.source, langObj[item.lang] || new Map());
  });
  return files;
};

// 获取项目的prettier配置
// const getPrettierOptions = () => {
//   const cwd = process.cwd();
//   const con = fs.readFileSync(path.join(cwd, './prettier.config.cjs'), { encoding: 'utf-8' });
//   const fn = eval(`() => (${con.replace(/^[^]+?(\{)/, '$1').replace(';', '')})`);
//   return fn();
// };

// 写入语言文件内容
const outputPath = resolve('./files/ms.js')
const writeLangFn = () => {
  // const files = syncFiles(dir);
  const cnCon = getZhCnCon()
  const langMap = getXlsxMap()
  const smCon = syncObjKeys('', cnCon, cnCon, langMap)
  // const prettierOpts = getPrettierOptions()
  fs.writeFileSync(outputPath, `export default ${JSON.stringify(smCon)}`, {
    encoding: 'utf-8',
  });
};

// vars
// const cwd = process.cwd();
// const localePath = path.join(cwd, getArg(0, './src/i18n/lang'));

// console.log(getFiles(localePath))

writeLangFn();
