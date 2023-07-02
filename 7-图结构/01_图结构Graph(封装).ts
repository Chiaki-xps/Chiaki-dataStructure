class Graph<T> {
  // 顶点
  private vertexes: T[] = [];
  // 边：邻接表
  private adjList: Map<T, T[]> = new Map();
}

export {};

// Map对象能够保存键值对
// Map中键只能出现一次。
// 同样的还有set则是存储的值都是唯一的。

const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

// for ... of循环返回的形式 [key, value],顺序为set的顺序
for (let item of map) {
  console.log(item);
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

// Set
// const set = new Set(['a', 'b','c'])
// 等价于
const set = new Set();
set.add('a');
set.add('b');
set.add('c');

typeof set; // object
set instanceof Set; // true
