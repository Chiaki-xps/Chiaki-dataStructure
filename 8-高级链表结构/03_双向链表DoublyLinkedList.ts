import LinkedList from './01_实现单向链表LinkedList';
import { DoublyNode } from './ILinkedNode';

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null;

  append(value: T): void {
    const newNode = new DoublyNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      // 不能将父类的对象，赋值给子类的类型
      // 可以给一个子类的对象，赋值给一个父类的类型（多态）
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }

  // 插入头部的方法
  prepend(value: T): void {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }
}

// 测试append方法
// console.log('---------- append --------');
const doublyLinkedList = new DoublyLinkedList<string>();
doublyLinkedList.append('aaa');
doublyLinkedList.append('bbb');
doublyLinkedList.append('ccc');
doublyLinkedList.append('ddd');

// doublyLinkedList.traverse();

console.log('---------- prepend --------');
doublyLinkedList.prepend('abc');
doublyLinkedList.prepend('cba');

doublyLinkedList.traverse();

/**
 * 多态：指为不同的数据类型的实体提供统一的接口
 * 多态类型：可以将自身所支持的操作套用到其它类型的值上
 *
 * 通俗理解就是多态指的是子类继承了父类，重写了里面的方法，不同子类执行父类同一个方法，可以是多样的
 *
 * 多态的三个条件
 *  1. 要有继承
 *  2. 重写父类方法
 *  3. 父类引用指向子类对象
 *
 *
 * // 这是一个父类
 * class Animal {}
 *
 * // 子类继承父类
 * class Person extends Animal {}
 *
 * // 父类引用Animal指向子类对象 new Person()
 * // 虽然a1是Animal类，但是实际指向的是Person
 * // 因为Person继承自Animal，所以可以赋值给Animal类
 * // a1执行里面的方法的时候，实际执行Person类里的方法
 * 这就是多态
 * const a1: Animal = new Person()
 *
 * 虽然从上面代码可以知道 a1实际是Person类
 * 但是在ts中。a1的类型是Animal类对象不能赋值给Person类对象p1,
 * 如果把子类的对象赋值给父类的对象，只是把子类中的父类子对象赋值给父类的对象，父类的类型中不包含子类的类型即，父类中缺少子类有的东西，所以赋值失败。
 * 你可以理解成子类需要属性a,b,c。a，b继承父类，但是c是子类特有的，但是父类赋值给子类的时候，缺少了c。所以失败了。即使你知道你的对象实际是子类对象，但是ts没有那么聪明
 * 这就是为什么父类引用指向父类对象
 * const p1: Person = a1
 *
 * 这里引申出另一个：
 *
 */
