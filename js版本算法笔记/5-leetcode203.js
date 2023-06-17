// 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

// 分析: 
// 传入的结构 head为 Node { val: Number, next: Node }
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */

// 1. 解法一：
const removeElements = (head, val) => {

    // 针对头节点，循环删除头节点val值等于参数val
    // 假设我们头节点val值恰好为val，经过删除操作后，新的头节点就会诞生，再循环在判断，知道头节点确定没有问题。这是对头节点的单独操作。
    while(head!== null && head.val === val) {
        let delNode = head;
        head = head.next;
        delNode.next = null
    }

    // 完成对头节点操作后，可能使得链表为空
    if (head === null) {
        return null;
    }

    // 对非头节点的操作
    let prev = head;
    while (prev.next !== null) {
        if (prev.next.val === val) {
           let delNode = prev.next;
           prev.next = delNode.next;
           delNode.next = null
        // 可以简化为
        // prev.next = prev.next.next
        } else {
            prev = prev.next
        }
    }

    return head;
}

// 解法二： 虚拟头节点，统一节点操作。

// 定义链表节点
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// 复制进leetcode记得修改函数名，保持和他要求的函数名一样
const removeElements2 = function(head, val) {
    // 这里使用new构造函数，使得dummyHead._proto_ = ListNode.prototype
    let dummyHead = new ListNode(-1)
    // console.log(dummyHead);
    dummyHead.next = head;

    // prev中间变量
    let prev = dummyHead;
    while(prev.next !== null) {
        if (prev.next.val === val) {
            prev.next = prev.next.next
        } else {
            prev = prev.next;
        }
    }

    return dummyHead.next
}

// 解法三：递归
const removeElements3 = (head, val) => {
    if (head === null) {
        return null;
    }

    let res = removeElements3(head.next, val)
    // 不断递归最后第一次执行下面res取到链表尾部的值，然后一层往链表上一层执行，最终执行到链表头
    if (head.val === val) {
        return res;
    } else {
        head.next = res;
        return head;
    }
    
}

// 解法四：递归优化
var removeElements4 = function(head, val) {
    if (head === null) {
        return head;
    }
    head.next = removeElements4(head.next, val);
    return head.val === val ? head.next : head;
};
