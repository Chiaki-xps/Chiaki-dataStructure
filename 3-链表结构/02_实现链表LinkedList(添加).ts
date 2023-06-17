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

  // 追加节点
  append(value: T) {
    // 1. 根据value创建一个新节点
    const newNode = new Node(value);

    // 2. 判读this.head是否为null
    if (!this.head) {
      this.head = newNode;
    } else {
      // current指向节点，通过遍历找到最后一个节点，最后一个节点的特征是next为null
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // current指向最后一个节点
      current.next = newNode;
    }

    // 3. size++
    this.size++;
  }

  // 遍历链表的方法
  traverse() {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join('->'));
  }
}

const linkedList = new LinkedList<string>();
linkedList.append('aaaa');
linkedList.append('bbbb');
linkedList.append('cccc');
linkedList.append('dddd');

linkedList.traverse();

// 当前文件定义在一个模块里,否则在全局node环境下，Node是一个关键字
export {};
