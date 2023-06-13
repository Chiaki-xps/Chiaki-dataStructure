// leetCode: 237

// 当我们的节点为 4->5->1->9
// 题目会给到我们已有的几点,比如值为5的节点(记为node),那么我们能知道node.next和node.next.next
// 删除node节点,可以将当前节点值等于下一个节点值,然后当前节点值指向next.next,使得node.next被删除，而node.value值为1

import ListNode from "./面试题_ListNode";

function deleteNode(node: ListNode | null): void {
  node!.val = node!.next!.val;
  node!.next = node!.next!.next;
}
