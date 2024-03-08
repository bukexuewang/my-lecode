const langFormatMap = {
  en: {
    sep: { y: '/', M: '', D: '/', h: ' ', m: ':' },
    list: ['M', 'D', 'y', 'h', 'm']
  },
  ar: {
    sep: { M: '/', D: '/', y: '', h: ' ', m: ':' },
    list: ['y', 'M', 'D', 'h', 'm']
  },
  vi: {
    sep: { M: '/', D: ' ', y: '/', h: '', m: ':' },
    list: ['h', 'm', 'D', 'M', 'y']
  },
  th: {
    sep: { M: '/', D: ' ', y: '/', h: '', m: ':' },
    list: ['h', 'm', 'D', 'M', 'y']
  },
  ms: {
    sep: { M: '/', D: '', y: '/', h: ' ', m: ':' },
    list: ['D', 'M', 'y', 'h', 'm']
  }
};

const genTimeFormat = (obj) => {
  const temp = langFormatMap.en;
  let str = '';
  temp.list.forEach((key) => {
    if (!obj[key]) return;
    if (str) str += temp.sep[key];
    str += obj[key];
  });
  return str;
};

/**
 * 格式化各种语言的时间格式
 * @param {string | number} t
 * @param { } format 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'示例：yyyy-MM-DD-hh-mm
 */
export function formatTime(t, format) {
  let time = t;
  if (typeof t === 'number') {
    if (t.toString().length === 10) time = time * '1000';
  } else if (typeof time === 'string') time = new Date(t).getTime();
  const formatObj = format.split('-').reduce((res, cur) => {
    res[cur[0]] = cur;
    return res;
  }, {});
  const dayFormat = genTimeFormat(formatObj);
  console.log(dayFormat);
  //   return dayjs(time).format(dayFormat);
  // const tVal = dayjs(time);
}

export const genUrlQuery = (obj) => {
  const query = new URLSearchParams();
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'object') val = JSON.stringify(val);
    // query.append(key, encodeURIComponent(val));
    query.append(key, val);
  });
  return query.toString();
};

const a = genUrlQuery({ url: '/main' });
console.log(a);
