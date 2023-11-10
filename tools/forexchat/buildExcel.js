import fs from 'fs';
import xlsx from 'node-xlsx';
import cn from './lang/cn.json';
import { resolve, isObj } from './common';

const buildExcelFn = () => {
  const dfs = (obj, preKey = '') => {
    if (!obj) return [];
    const list = [];
    Object.entries(obj).map(([key, value]) => {
      const resKey = preKey ? `${preKey}_${key}` : key;
      if (isObj(value)) list.push(...dfs(value, resKey));
      else list.push([resKey, value]);
    });
    return list;
  };

  const buffer = xlsx.build([{ name: 'sheet', data: dfs(cn) }]);
  fs.writeFileSync(resolve('./output/webKey.xlsx'), buffer, { encoding: 'binary' });
};
buildExcelFn();
