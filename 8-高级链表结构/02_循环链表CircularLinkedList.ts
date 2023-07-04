import LinkedList from './01_实现单向链表LinkedList';

class CircularLinkedList<T> extends LinkedList<T> {
  // 重新实现的方法: append
  append(value: T): void {
    // 调用父类的方法
    super.append(value);
    // 拿到最后一个节点next指向第一个节点
    this.tail!.next = this.head;
  }

  insert(value: T, position: number): boolean {
    const isSuccess = super.insert(value, position);
    // super.insert调用后，length已经+1,
    // 判断position操作的是否是原链表最后一个节点，可以再完成super.insert之后，判断position === length-1
    if (isSuccess && (position === this.length - 1 || position === 0)) {
      this.tail!.next = this.head;
    }
    return isSuccess;
  }

  removeAt(position: number): T | null {
    const value = super.removeAt(position);

    // 上面调用super.removeAt的时候，如果有值意味着完成了length--的操作
    // 所以这里比较的时候，不能用position === this.length -1,和上面一样
    // this.tail判断是是不是最后一个节点也被删掉了。即链表长度已经为0的时候
    if (value && this.tail && (position === 0 || position === this.length)) {
      this.tail!.next = this.head;
    }

    return value;
  }
}

const cLinkedList = new CircularLinkedList();
cLinkedList.append('aaa');
cLinkedList.append('bbb');
cLinkedList.append('ccc');
cLinkedList.append('ddd');
cLinkedList.traverse();

console.log('------ 测试insert ------');
cLinkedList.insert('abc', 0);
cLinkedList.traverse();
cLinkedList.insert('cba', 2);
cLinkedList.insert('nba', 6);
cLinkedList.traverse();

console.log('------ 测试removeAt ------');
cLinkedList.removeAt(0);
cLinkedList.removeAt(2);
cLinkedList.traverse();
cLinkedList.removeAt(2);
cLinkedList.traverse();

// console.log('------ 测试update ------');
cLinkedList.update('why', 1);
cLinkedList.update('kobe', 2);
cLinkedList.traverse();

// console.log('------ 测试indexof ------');
console.log(cLinkedList.indexOf('cba'));
console.log(cLinkedList.indexOf('why'));
console.log(cLinkedList.indexOf('kobe'));
console.log(cLinkedList.indexOf('james'));
