import ListNode from './面试题_ListNode';

function reverseList(head: ListNode | null): ListNode | null {
  // 什么情况下链表不需要处理?
  // 1. head本身为null的情况下
  if (head === null) return null;
  // 2. 只有head一个节点
  if (head.next === null) return head;

  // 数组模拟栈结构
  const stack: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // 依次从栈结构中取出元素,放到一个新的链表中
  const newHead: ListNode | null = stack.pop()!;
  let newHeadCurrent = newHead;
  while (stack.length) {
    // !表示值不会为undefined
    const node = stack.pop()!;
    newHeadCurrent.next = node;
    newHeadCurrent = newHeadCurrent.next;
  }

  // 获取到最后一个节点时,一定要将节点的next置为null
  // 由于出栈的最后一个节点是head,意味着新的链表最后一个节点还是head
  // 假如遍历下一个节点的时候,到最后一个节点head.next，又指向上一个节点，造成循环
  // 所以当遇到最后一个节点的时候,next指向null
  newHeadCurrent.next = null;

  return newHead;
}

// 模拟数组进行测试
const node1 = new ListNode(1);
node1.next = new ListNode(2);
node1.next.next = new ListNode(3);

const newHead = reverseList(node1);

let current = newHead;
while (current) {
  console.log(current.val);
  current = current.next;
}

export {};
