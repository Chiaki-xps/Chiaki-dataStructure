// 这个文件重新设计接口
import IList from '../types/IList';

interface ILinkedList<T> extends IList<T> {
  append(value: T): void;
  traverse(): void;
  insert(value: T, position: number): boolean;
  removeAt(position: number): T | null;
  get(position: number): T | null;
  update(value: T, position: number): boolean;
  indexOf(value: T): number;
  remove(value: T): T | null;
  isEmpty(): boolean;
}

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
export default class LinkedList<T> implements ILinkedList<T> {
  // protected是ts的语法，允许我们的子类访问父类的属性，但不能被实例访问
  // protected private称之为属性修饰符
  protected head: Node<T> | null = null; // 头结点
  private length: number = 0; // private表示私有的，外部不能直接访问

  // 尾部属性: 总是指向我们的尾部
  protected tail: Node<T> | null = null;

  size() {
    return this.length;
  }

  peek(): T | undefined {
    return this.head?.value;
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

  private isTail(node: Node<T>) {
    // return node.next === null || node.next === this.head;
    return this.tail === node;
  }

  // 追加节点
  append(value: T) {
    // 1. 根据value创建一个新节点
    const newNode = new Node(value);

    // 2. 判读this.head是否为null
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail!.next = newNode;
    }
    this.tail = newNode;

    // 3. length++
    this.length++;
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
    if (position < 0 || position > this.length) return false;

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

      if (position === this.length) {
        this.tail = newNode;
      }
    }
    this.length++;
    return true;
  }

  // 删除方法:
  removeAt(position: number): T | null {
    // 1. 越界的判断
    // 不能等于长度是因为position从0开始
    if (position < 0 || position >= this.length) return null;

    // 2. 是否是删除第一个节点
    let current = this.head;
    if (position === 0) {
      // 运行到这里意味着必然存在一个节点
      // this.head = this.head!.next
      this.head = current?.next ?? null;

      // 这里为1，因为我们最后才执行length--，所以删除第一个节点，但是长度还没有执行操作
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      const pervious = this.getNode(position - 1);
      current = pervious!.next;
      pervious!.next = pervious?.next?.next ?? null;

      if (position === this.length - 1) {
        this.tail = pervious;
      }
    }

    this.length--;

    // 返回删除的值
    return current?.value ?? null;
  }

  // 获取方法:
  get(position: number): T | null {
    // 越界问题
    if (position < 0 || position >= this.length) return null;

    // 2. 查找元素,并且范围元素
    // 加入取不到该属性的时候,返回undefined
    return this.getNode(position)?.value ?? null;
  }

  // 更新方法:
  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.length) return false;
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
    return this.length === 0;
  }
}

const linkedList = new LinkedList<string>();
console.log('------ 测试append ------');
linkedList.append('aaa');
linkedList.append('bbb');
linkedList.append('ccc');
linkedList.append('ddd');
linkedList.traverse();

console.log('------ 测试insert ------');
linkedList.insert('abc', 0);
linkedList.traverse();
linkedList.insert('cba', 2);
linkedList.insert('nba', 6);
linkedList.traverse();

// console.log('------ 测试removeAt ------');
linkedList.removeAt(0);
linkedList.removeAt(0);
linkedList.traverse();

console.log(linkedList.removeAt(2));
linkedList.traverse();
console.log(linkedList.removeAt(3));
linkedList.traverse();

// console.log('------ 测试get ------');
console.log(linkedList.get(0));
console.log(linkedList.get(1));
console.log(linkedList.get(2));

// console.log('------ 测试update ------');
linkedList.update('why', 1);
linkedList.update('kobe', 2);
linkedList.traverse();

// console.log('------ 测试indexof ------');
console.log(linkedList.indexOf('cba'));
console.log(linkedList.indexOf('why'));
console.log(linkedList.indexOf('kobe'));
console.log(linkedList.indexOf('james'));

// console.log('------ 测试remove ------');
linkedList.remove('why');
linkedList.remove('cba');
linkedList.remove('kobe');
linkedList.traverse();
console.log(linkedList.isEmpty());

// 当前文件定义在一个模块里,否则在全局node环境下，Node是一个关键字
export {};
