import path from 'path';
import url from 'node:url';
import fs from 'fs';
import xlsx from 'node-xlsx';

// 导出一个函数，用于获取Google的配置
export const getGoogleCon = () => {
  // 获取当前文件夹的路径
  const file = resolve('./excel/source.xlsx');
  // 解析excel文件
  const con = xlsx.parse(file);
  // 创建一个Map
  const conMap = new Map();
  // 遍历excel文件
  con.forEach((item) => {
    // 判断item.name是否为空
    if (!/\w+/.test(item.name)) return;
    // 遍历item.data
    item.data.forEach((el, i) => {
      // 判断el是否为空
      if (!i || !el?.length) return;
      // 获取el的值
      const [key, cn, tw, en] = el;
      // 将el的值添加到Map中
      conMap.set(key, { cn, tw, en });
    });
  });
  // 返回Map
  return conMap;
};

// 获取当前文件夹的路径
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
// 导出一个函数，用于获取当前文件夹的路径
export const resolve = (str) => path.join(__dirname, str);

// 导出一个函数，用于获取语言的配置
export const getLangCon = () => {
  // 读取cn.json文件
  const cnStr = fs.readFileSync(resolve('./lang/cn.json'), { encoding: 'utf-8' });
  // 读取tw.json文件
  const twStr = fs.readFileSync(resolve('./lang/tw.json'), { encoding: 'utf-8' });
  // 读取en.json文件
  const enStr = fs.readFileSync(resolve('./lang/en.json'), { encoding: 'utf-8' });
  // 创建一个对象
  const obj = {};
  // 遍历cnStr、twStr、enStr
  [cnStr, twStr, enStr].forEach((str, i) => {
    // 将str转换为对象
    const strObj = JSON.parse(str);
    // 获取语言
    const lang = ['cn', 'tw', 'en'][i];
    // 遍历strObj
    Object.entries(strObj).forEach(([key, val]) => {
      // 获取objVal
      const objVal = obj[key];
      // 判断objVal是否存在
      if (objVal) objVal[lang] = val;
      // 如果不存在，则将val添加到obj中
      else obj[key] = { [lang]: val };
    });
  });
  // 返回obj
  return obj;
};
