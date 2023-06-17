// 递归：就是函数中使用自己本身

// 使用递归的计较，不断使用自己本身，是的对数据不断的向下挖掘，挖到终点或遇到打断的条件的时候，一层层向上返回，进而一层层向后退，不断处理数据最终完成处理或返回。
import ListNode from './面试题_ListNode';

// 思路：传入的head是一个节点ListNode，利用其特点拥有next可以不断递归到最后一节节点，发现head为null的时候结束递归，从最后一个节点不断返回上一个节点，完成反转。

function reverseList(head: ListNode | null): ListNode | null {
  // 如果使用的是递归，那么递归必须有结束条件
  if (head === null || head.next === null) return head;

  // 递归完成后，把最后一个节点不断向上返回，因为最后一个节点就是我们反转链表的头节点，是我们最终需要的返回值
  const newHead = reverseList(head?.next ?? null);

  // 完成想要的操作是在递归之后
  // 第一次来到这里额时候，是倒数第二个节点，倒数第一个节点是不会来到这里，而是因为结束条件直接return了。
  // 在这里我们要做的就是反转链表，每次拿到当前的节点head，head.next则是下一个节点，head.next.next则是下一个节点的next，
  // 通过改变下一个节点的next，即改变head.next.next完成每下一个节点的反转。即下一个节点指向当前节点。
  head.next.next = head;

  // 当前节点指向null,最大的意义在于最后执行到第一个节点的时候，保证第一个节点执行null，避免第一个节点指向第二个节点，导致循环引用
  head.next = null;

  // 这里不断将最后一个节点冒泡出去
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
