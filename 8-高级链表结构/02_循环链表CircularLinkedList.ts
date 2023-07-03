import LinkedList from './01_实现单向链表LinkedList';

class circularLinkedList<T> extends LinkedList<T> {
  // 重新实现的方法: append
  append(value: T): void {
    // 调用父类的方法
    super.append(value);
    // 拿到最后一个节点next指向第一个节点
    this.tail!.next = this.head;
  }

  //
}
