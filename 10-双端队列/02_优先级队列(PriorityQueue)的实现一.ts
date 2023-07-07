import Heap from '../9-堆结构/06_堆结构Heap(二叉堆)';

// 1. 创建PriorityNoe
class PriorityNoe<T> {
  priority: number;
  value: T;

  constructor(value: T, priority: number) {
    this.priority = priority;
    this.value = value;
  }

  valueOf() {
    return this.priority;
  }
}

// ts的语法糖可以这么写
// class PriorityNoe<T> {
//   constructor(public value: T, public priority: number) {}
// }

// 1. 创建PriorityQueue
class PriorityQueue<T> {
  private heap: Heap<PriorityNoe<T>> = new Heap();

  // 直接传入节点
  // enqueue(node: PriorityNoe<T>) {
  //   this.heap.insert(node);
  // }

  // 内部创建节点
  enqueue(value: T, priority: number) {
    const newNode = new PriorityNoe(value, priority);
    this.heap.insert(newNode);
  }

  dequeue(): T | undefined {
    return this.heap.extract()?.value;
  }

  peek(): T | undefined {
    return this.heap.peek()?.value;
  }

  isEmpty() {
    return this.heap.isEmpty();
  }

  size() {
    return this.heap.size();
  }
}

const pQueue = new PriorityQueue<string>();
pQueue.enqueue('why', 98);
pQueue.enqueue('kobe', 90);
pQueue.enqueue('james', 105);

while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue());
}
