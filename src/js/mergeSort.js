import { generateNums } from './index.js';

/**
 *
 * @param {array} arr
 */
const mergeSort = (arr) => {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid, len));
  return merge(left, right);

  function merge(left, right) {
    let [l, r] = [0, 0];
    const res = [];
    while (l < left.length && r < right.length) {
      if (left[l] > right[r]) {
        res.push(right[r]);
        r++;
      } else {
        res.push(left[l]);
        l++;
      }
    }
    if (l < left.length) {
      res.push(...left.slice(l));
    }
    if (r < right.length) {
      res.push(...right.slice(r));
    }
    return res;
  }
};

const list = generateNums(10000);

console.time('mergeSort');
mergeSort(list);
console.timeEnd('mergeSort');

console.time('sort');
list.sort();
console.timeEnd('sort');
