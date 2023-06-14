import ListNode from './面试题_ListNode';

function reverseList(head: ListNode | null): ListNode | null {
  console.log(head);

  // 判断节点为null,或者只要一个节点，要么直接返回即可
  if (head === null || head.next === null) return head;

  // 2. 反转链表结构

  // 1. 定义反转链表的头节点,暂时指向null
  let newHead: ListNode | null = null;
  // 2. 遍历链表
  while (head) {
    // 3. 需要定义一个指针current保存需要反转的节点的下一个节点
    // +  因为反转后,当前节点指向的是上一个节点,下一个节点没有保存就无法获取
    const current: ListNode | null = head.next;
    // 4. head当前指向的节点，指向newHead
    head.next = newHead;
    newHead = head;
    head = current;
  }

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

// 注意ts-node环境下，里面的tsconfig.json是不允许有隐式的any
export {};
