import ArrayQueue from '../2-队列结构/01_实现队列结构Queue';
class ArrayDeque<T> extends ArrayQueue<T> {
  addFront(value: T) {
    this.data.unshift(value);
  }
  removeBack(): T | undefined {
    return this.data.pop();
  }
}

const deque = new ArrayDeque<string>();
deque.enqueue('aaa');
deque.enqueue('bbb');
deque.enqueue('ccc');
deque.addFront('abc');
deque.addFront('cba');

while (!deque.isEmpty()) {
  console.log(deque.removeBack());
}

export {};

// 从效率上来说，用链表会高一点，但是从编写代码的角度，你还要实现一个链表结构有点麻烦
