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

  // 插入方法
  insert(value: T, position: number) {
    // 1. 越界判断
    if (position < 0 || position > this.size) return false;

    // 2. 根据value创建新的节点
    const newNode = new Node(value);

    // 3. 判断是否需要插入头部
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // 双指针方法
      let current = this.head;
      let pervious: Node<T> | null = null;
      let index = 0;

      while (index++ < position && current) {
        // && current是为了让ts知道current值必存在
        pervious = current;
        current = current.next;
      }

      // index === position
      newNode.next = current;
      pervious!.next = newNode; // ?. 相反是 !. 表示必然存在
    }
    this.size++;
    return true;
  }

  // 删除方法:
  removeAt(position: number): T | null {
    // 1. 越界的判断
    // 不能等于长度是因为position从0开始
    if (position < 0 || position >= this.size) return null;

    // 2. 是否是删除第一个节点
    let current = this.head;
    if (position === 0) {
      // 运行到这里意味着必然存在一个节点
      // this.head = this.head!.next
      this.head = this.head?.next ?? null;
    } else {
      let pervious: Node<T> | null = null;
      let index = 0;
      while (index++ < position && current) {
        pervious = current;
        current = current.next;
      }

      // 找到需要的节点
      // current不一定有值，可能就是最后一个节点了
      pervious!.next = current?.next ?? null;
    }

    this.size--;

    // 返回删除的值
    return current?.value ?? null;
  }

  // 获取方法:
  get(position: number): T | null {
    // 越界问题
    if (position < 0 || position >= this.size) return null;

    // 2. 查找元素,并且范围元素
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current.next;
    }

    // index === position
    return current?.value ?? null;
  }
}

const linkedList = new LinkedList<string>();
linkedList.append('aaaa');
linkedList.append('bbbb');
linkedList.append('cccc');
linkedList.append('dddd');

linkedList.insert('abc', 0);
linkedList.traverse();
linkedList.insert('cba', 2);
linkedList.traverse();
linkedList.insert('nba', 6);
linkedList.traverse();

linkedList.removeAt(0);
linkedList.removeAt(0);
linkedList.traverse();

console.log(linkedList.removeAt(2));
linkedList.traverse();
console.log(linkedList.removeAt(3));
linkedList.traverse();

console.log('------ 测试get ------');
console.log(linkedList.get(0));
console.log(linkedList.get(1));
console.log(linkedList.get(2));

// 当前文件定义在一个模块里,否则在全局node环境下，Node是一个关键字
export {};
