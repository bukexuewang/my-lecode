const list = [
  { isTop: true, sort: 2 },
  { isTop: false, sort: 1 },
  { isTop: true, sort: 6 },
  { isTop: false, sort: 3 },
  { isTop: false, sort: 10 },
  { isTop: true, sort: 7 },
  { isTop: true, sort: 8 },
  { isTop: false, sort: 4 }
];

const sortList = list.sort((a, b) => {
  if (a.isTop === b.isTop) {
    return b.sort - a.sort;
  }
  return a.isTop ? -1 : 1;
});
console.log(sortList);
