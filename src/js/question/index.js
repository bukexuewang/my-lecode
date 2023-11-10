function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    if (i != j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

// 示例
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let shuffledArr = fisherYatesShuffle(arr1);
console.log(shuffledArr);

function getExplorer() {
  const ua = window.navigator.userAgent;
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer('MSIE')) return 'IE';
  else if (isExplorer('Firefox')) return 'Firefox';
  else if (isExplorer('Chrome')) return 'Chrome';
  else if (isExplorer('Opera')) return 'Opera';
  else if (isExplorer('Safari')) return 'Safari';
}
const arr = getExplorer();
console.log(arr); //Chrome

// 存储localStorage
setStore = (params) => {
  let name = params.name,
    content = params.content,
    type = params.type,
    datetime = params.datetime;
  name = `${process.env.VUE_APP_NAME}-${name}`;
  const obj = { dataType: typeof content, content: content, datetime: new Date().getTime() };
  if (type) obj.type = type;
  try {
    if (type) {
      window.sessionStorage.setItem(name, JSON.stringify(obj));
    } else {
      // localforage.setItem(name, JSON.stringify(obj))
      store.set(name, JSON.stringify(obj));
    }
  } catch (e) {
    console.log(e);
  }
};
// 获取localStorage
getStore = (params) => {
  let { name, type } = params;
  let obj = {};
  let content;
  name = `${process.env.VUE_APP_NAME}-${name}`;
  obj = store.get(name);
  if (validatenull(obj)) obj = window.sessionStorage.getItem(name);
  if (validatenull(obj)) return (obj = obj ? JSON.parse(obj) : {});
  if (obj.dataType === 'string') {
    content = obj.content;
  } else if (obj.dataType === 'number') {
    content = Number(obj.content);
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType === 'object') {
    content = obj.content;
  }
  return content;
};
// 删除localStorage
removeStore = (name) => {
  name = `${process.env.VUE_APP_NAME}-${name}`;
  store.remove(name);
  window.sessionStorage.removeItem(name);
};

// 生成随机色
const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

console.log(generateRandomHexColor());

// 复制到剪切板
const copyToClipboard = (text) =>
  navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text);

copyToClipboard('Hello World!');

// 检测设备
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

console.log(detectDeviceType());
