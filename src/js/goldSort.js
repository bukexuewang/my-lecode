/**
 *
 * @param {array} list 金牌数
 */
const goldMedalSort = (list) => {
  const res = list.sort((a, b) => {
    let i = 0;
    while (i < list.length) {
      if (a[i] === b[i]) i++;
      else return b[i] - a[i];
    }
  });
  return res.map((v) => v.slice(-1)[0]);
};

const formatList = (list) => list.map((item) => [item.gold, item.sliver, item.copper, item.name]);

const list = [
  { name: 'china', gold: 9, sliver: 2, copper: 9 },
  { name: 'jay', gold: 2, sliver: 2, copper: 9 },
  { name: 'Us', gold: 9, sliver: 2, copper: 9 },
  { name: 'japan', gold: 11, sliver: 3, copper: 2 },
  { name: 'hs', gold: 11, sliver: 3, copper: 6 }
];

const res = goldMedalSort(formatList(list));
console.log(res);
