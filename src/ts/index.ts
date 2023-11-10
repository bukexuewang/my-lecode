interface Item {
  id: number;
  name: string;
  parentId: number;
}

type Tree = Item & { children?: Tree[] };

const abc = 1;

function add(a: number, b: number) {
  console.log('output-sum', a + b);
  return a + b;
}
add(1, 2);
add(2, 3);
add(3, 4);

const url = new URL('/jis', 'https://baidu.com').toString();
console.log('output-url', url);

const arr = [1, 2, 3];

type ArrItemType = typeof arr;

const r = 1;
