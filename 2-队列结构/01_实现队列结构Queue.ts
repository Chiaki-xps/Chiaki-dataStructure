import IQueue from './IQueue';

class ArrayQueue<T> implements IQueue<T> {
  // 内部是通过数组(链表)保存
  protected data: T[] = [];

  enqueue(element: T): void {
    this.data.push(element);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }
  // 接口定义为get属性
  size(): number {
    return this.data.length;
  }

  // 如果继承的接口是一个get方法,实现或重写方法的时候也需要带上get
  // get size(): number {
  //   return this.data.length;
  // }
}

export default ArrayQueue;
