// 1. 创建Node节点类
export class Node<T> {
  value: T;
  next: Node<T> | null = null; //指针

  // 实例的时候完成赋值操作
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null = null;

  // 继承父类的属性，重写的时候，类型只能和父类相同，或者父类的子类，意味着，next类型要么Node | null ，要么DoublyNode<T> | null
  next: DoublyNode<T> | null = null;
}
