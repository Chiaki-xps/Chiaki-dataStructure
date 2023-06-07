import IStack from './IStack';

class ArrayStack<T = any> implements IStack<T> {
  // 定义一个数组/链表，用于存储元素
  private data: T[] = [];

  push(element: T): void {
    this.data.push(element);
  }

  pop(): T | undefined {
    return this.data.pop();
  }

  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  size(): number {
    return this.data.length;
  }
}

const stack = new ArrayStack<number>();

export default ArrayStack;
