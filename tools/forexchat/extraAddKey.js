import fs from 'fs';
import path from 'path';
import xlsx from 'node-xlsx';

import cn from './lang/cn.json';
import { isObj, resolve } from './common.js';

const jsonClone = (obj) => JSON.parse(JSON.stringify(obj));

function deleteFilesInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  // if (err) {
  //   console.error(`Error reading folder ${folderPath}:`, err);
  //   return;
  // }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      deleteFilesInFolder(filePath);
    } else {
      fs.unlinkSync(filePath);
      console.log(`Deleted file ${filePath}`);
    }
  });
}

function readJsonList(folderPath) {
  const files = fs.readdirSync(folderPath);
  const obj = {};
  files.forEach((item) => {
    console.log('item', item);
  });
}

readJsonList('./langList');
