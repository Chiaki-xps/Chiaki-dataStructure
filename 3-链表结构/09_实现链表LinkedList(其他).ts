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

  // 封装私有方法
  // 根据position获取到当前的节点
  private getNode(position: number): Node<T> | null {
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
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
      const pervious = this.getNode(position - 1);
      newNode.next = pervious!.next;
      pervious!.next = newNode;
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
      this.head = current?.next ?? null;
    } else {
      // position - 1为删除的节点的上一个节点
      const pervious = this.getNode(position - 1);

      // 需要给current重新赋值
      current = pervious!.next;

      pervious!.next = pervious?.next?.next ?? null;
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
    // 加入取不到该属性的时候,返回undefined
    return this.getNode(position)?.value ?? null;
  }

  // 更新方法:
  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.size) return false;
    const currentNode = this.getNode(position);
    currentNode!.value = value;
    return true;
  }

  // 根据值,获取对应位置的索引
  indexOf(value: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  // 删除方法: 根据value删除节点
  remove(value: T): T | null {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  // 判断列表是否为空的方法
  isEmpty() {
    return this.size === 0;
  }
}

const linkedList = new LinkedList<string>();
console.log('------ 测试append ------');
linkedList.append('aaa');
linkedList.append('bbb');
linkedList.append('ccc');
linkedList.append('ddd');

console.log('------ 测试insert ------');
linkedList.insert('abc', 0);
linkedList.traverse();
linkedList.insert('cba', 2);
linkedList.insert('nba', 6);
linkedList.traverse();

console.log('------ 测试removeAt ------');
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

console.log('------ 测试update ------');
linkedList.update('why', 1);
linkedList.update('kobe', 2);

console.log('------ 测试indexof ------');
console.log(linkedList.indexOf('cba'));
console.log(linkedList.indexOf('why'));
console.log(linkedList.indexOf('kobe'));
console.log(linkedList.indexOf('james'));

console.log('------ 测试remove ------');
linkedList.remove('why');
linkedList.remove('cba');
linkedList.remove('kobe');
linkedList.traverse();
console.log(linkedList.isEmpty());

// 当前文件定义在一个模块里,否则在全局node环境下，Node是一个关键字
export {};
