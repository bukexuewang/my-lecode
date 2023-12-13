import { translate } from 'bing-translate-api';
import path from 'path';
import xlsx from 'node-xlsx';
import fs from 'fs';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const resolve = (str) => path.join(__dirname, str);

const readXlsx = (dir) => {
  const res = xlsx.parse(dir);
  return res.map((item) => item.data)[0].filter((v) => v);
};

const translateFn = async (txt, lang) => {
  try {
    const res = await translate(txt || '', null, lang);
    return res ? res.translation : '';
  } catch (error) {
    return '';
  }
};
const translateEvent = async (txt) => {
  // const langArr = ['en'];
  // const data = await Promise.all(langArr.map((lang) => translateFn(txt, lang)));
  const res = await translate(txt);
};

// const str = '使用您自己的标识、品牌和域名，因此您可以向您的终端客户提供完全原生的体验。获得开箱即用fastbull.com的功能';
const str = '使用您自己的标识';
translateEvent(str);

const promiseS = async (dir) => {
  const data = readXlsx(dir);
  const langArr = ['zh-Hant', 'en', 'vi', 'ru', 'ar', 'th', 'id', 'ms'];
  await Promise.all(
    data.map(async (item) => {
      if (!item[1]) return;
      const resList = await Promise.all(langArr.map((v) => translateFn(item[1] + '', v)));
      item.push(...resList);
    })
  );
  return data;
};

const buildXlsx = async (input, output) => {
  const data = await promiseS(input);

  const buffer = xlsx.build([{ name: 'sheet1', data }]);
  fs.writeFileSync(output, buffer, { encoding: 'binary' });
};

const dirPath = resolve('./source.xlsx');
const output = resolve('./output.xlsx');
buildXlsx(dirPath, output);

// ---------------------------- 静态翻译 ------------------------------------
const constTranslate = async (arr, output) => {
  const data = await Promise.all(arr.map((item) => translateFn(item)));
  fs.writeFileSync(output, data.join('\n'), { encoding: 'utf-8' });
};

const txtList = ['标签选项', '关闭其他', '关闭所有'];
const outputTxt = resolve('./output.txt');
// constTranslate(txtList, outputTxt);
