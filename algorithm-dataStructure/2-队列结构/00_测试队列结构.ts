import ArrayQueue from "./01_实现队列结构Queue";

const queue = new ArrayQueue<string>();

queue.enqueue('abc')
queue.enqueue('cba')
queue.enqueue('nba')

console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.peek());

console.log(queue.isEmpty());

// 直接调用get方法直接调用属性。具体参考js class语法
// console.log(queue.size);
console.log(queue.size());



