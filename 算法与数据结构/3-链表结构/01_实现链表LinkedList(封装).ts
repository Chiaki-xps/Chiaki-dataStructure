// 1. 创建Node节点类
class Node<T> {
  value: T;
  next: Node<T> | null = null; //指针

  // 实例的时候完成赋值操作
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// 2. 创建LinkedList类
class LinkedList<T> {
  head: Node<T> | null = null; // 头结点
  private size: number = 0; // private表示私有的，外部不能直接访问

  get length() {
    return this.size;
  }
}

const linkedList = new LinkedList<string>();
console.log(linkedList.head);

// 当前文件定义在一个模块里,否则在全局node环境下，Node是一个关键字
export {};
