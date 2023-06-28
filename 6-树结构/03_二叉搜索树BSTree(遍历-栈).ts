import { btPrint } from 'hy-algokit';

import Node from '../types/Nodes';

class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
}

// BinarySearchTree
class BSTree<T> {
  private root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  /** 插入数据的操作 */
  insert(value: T) {
    // 1. 根据传入value创建Node(TreeNode)节点
    const newNode = new TreeNode(value);

    // 2. 判断当前是否已经有了根节点
    if (!this.root) {
      // 当前树为空
      this.root = newNode;
    } else {
      // 树中已经有其他值
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      // 去左边继续查找的空白位置
      if (node.left === null) {
        // node 节点的左边已经是空白
        node.left = newNode;
      } else {
        // 去右边继续查找空白位置
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  /** 遍历的操作 */
  // 先序遍历
  preOrderTraversalNoRecursion() {
    let stack: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = this.root;

    /**
     * 初始阶段 stack为空即 stack.length === 0，root为空则不执行，不为空就进入下一个循环
     * 第二个循环做的事情：
     * 1. 输出根节点
     * 2. 保存这个根节点
     * 3. current定位到左子树根节点
     * 4. 当current走到叶子结点，第二个循环结束。回到第一个循环
     *
     * 接下来，保存的已经输出的根节点从栈顺序弹出，current定位到右子树根节点。重新进入第二个循环
     *
     */

    while (current !== null || stack.length !== 0) {
      while (current !== null) {
        console.log(current.value);
        stack.push(current);
        current = current.left;
      }

      current = stack.pop()!;
      current = current.right;
    }
  }

  // 中序遍历
  inOrderTraversalNoRecursion() {
    let stack: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = this.root;

    while (current !== null || stack.length !== 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop()!;
      console.log(current.value);
      current = current.right;
    }
  }

  // 后序遍历
  postOrderTraversalNoRecursion() {
    let stack: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = this.root;
    let lastVisitedNode: TreeNode<T> | null = null;

    /**
     * 第二个循环作用：执行到最后的左子树叶子节点
     * 后序遍历的一个特点：就是当你的右结点不存或者已经输出的时候，意味着这个节点也可以输出了
     */

    while (current !== null || stack.length !== 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack[stack.length - 1];
      if (current.right === null || current.right === lastVisitedNode) {
        console.log(current.value);
        lastVisitedNode = current;
        stack.pop();
        current = null;
      } else {
        current = current.right;
      }
    }
  }
}

const bst = new BSTree<number>();

// 二叉搜索树里存放的值不会重复
// bst.insert(20);
// bst.insert(30);
// bst.insert(18);
// bst.insert(15);
// bst.insert(19);
// bst.insert(36);
// bst.insert(32);
// bst.insert(32);

// bst.print();
// 不难发现32的位置有一点点瑕疵，这是因为我们并没有对它进行去重
//             20
//      ┌───────┴───────┐
//     18              30
//  ┌───┴───┐           └───┐
// 15      19              36
//                        ┌─┘
//                       32
//                        └─┐
//                         32

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

//              11
//       ┌───────┴───────┐
//       7              15
//   ┌───┴───┐       ┌───┴───┐
//   5       9      13      20
// ┌─┴─┐   ┌─┴─┐   ┌─┴─┐   ┌─┴─┐
// 3   6   8  10  12  14  18  25

// bst.print();

// 11 -> 7 -> 5 -> 3 -> 6 -> 9 -> 8 -> 10 -> 15 -> 13 -> 12 -> 14 -> 20 -> 18 -> 25

// bst.preOrderTraversalNoRecursion();

// 3 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> 18 -> 20 -> 25
// bst.inOrderTraversalNoRecursion();

// 3 -> 6 -> 5 -> 8 -> 10 -> 9 -> 7 -> 12 -> 14 -> 13 -> 18 -> 25 -> 20 -> 15 -> 11
bst.postOrderTraversalNoRecursion();

export {};
