import Heap from '../9-堆结构/06_堆结构Heap(二叉堆)';

class PriorityQueue<T> {
  private heap: Heap<T> = new Heap();

  enqueue(value: T) {
    this.heap.insert(value);
  }

  dequeue(): T | undefined {
    return this.heap.extract();
  }

  peek(): T | undefined {
    return this.heap.peek();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }

  size() {
    return this.heap.size();
  }
}

class Student {
  name: String;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  valueOf() {
    return this.score;
  }
}

const pQueue = new PriorityQueue<Student>();

pQueue.enqueue(new Student('why', 98));
pQueue.enqueue(new Student('kobe', 89));
pQueue.enqueue(new Student('james', 95));
pQueue.enqueue(new Student('curry', 88));

while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue());
}
