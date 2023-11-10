import fs from 'fs';

import { getGoogleCon, resolve, getLangCon } from './common.js';

const fn = (v = '') => v.replace(/\{.*?\}/g, '');
const isSameStr = (a, b) => fn(a) === fn(b);

const output = () => {
  const localObj = getLangCon();
  const googleConMap = getGoogleCon();
  const data = {};
  Object.entries(localObj).forEach(([key, obj]) => {
    const mapVal = googleConMap.get(key);
    Object.entries(obj).forEach(([lang, val]) => {
      const langObj = data[lang] || {};
      if (!mapVal) {
        langObj[key] = val;
      } else {
        const mapLangVal = mapVal[lang] || '';
        if (!isSameStr(val || '', mapLangVal)) langObj[key] = mapLangVal;
        else langObj[key] = val;
      }
      data[lang] = langObj;
    });
  });
  Object.entries(data).forEach(([k, v]) => {
    fs.writeFileSync(resolve(`./output/${k}.json`), JSON.stringify(v), { encoding: 'utf-8' });
  });
};

output();
