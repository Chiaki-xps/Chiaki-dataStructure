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
  preOrderTraverse() {
    this.preOrderTraversesNode(this.root);
  }

  private preOrderTraversesNode(node: TreeNode<T> | null) {
    // 如果是叶子节点的子节点是不存在的,打断遍历。递归调用，就是调用栈
    if (node) {
      // 1. 先访问根节点
      console.log(node.value);
      // 2. 访问左节点
      this.preOrderTraversesNode(node.left);
      // 3. 访问右节点
      this.preOrderTraversesNode(node.right);
    }
  }

  // 中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }

  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left);
      console.log(node.value);
      this.inOrderTraverseNode(node.right);
    }
  }

  // 后序遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }

  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.value);
    }
  }

  // 层序遍历
  levelOrderTraverse() {
    // 1. 如果没有根节点，那么不需要遍历
    if (!this.root) return;

    // 2. 创建队列结构
    let queue: TreeNode<T>[] = [];
    // 第一个节点是根节点
    queue.push(this.root);

    // 3. 遍历队列中的所有节点(依次出队)
    while (queue.length) {
      const current = queue.shift()!;
      console.log(current.value);
      // current?.left && queue.push(current.left);
      // current?.right && queue.push(current.right);

      // 3.2 将左子节点放入到队列
      if (current.left) {
        queue.push(current.left);
      }

      // 3.3 将右子节点放入到队列
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  /** 获取最值 */
  getMaxValue(): T | null {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value ?? null;
  }

  getMinValue(): T | null {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value ?? null;
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
// bst.preOrderTraverse();

// 3 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> 18 -> 20 -> 25
// bst.inOrderTraverse();

// 3 -> 6 -> 5 -> 8 -> 10 -> 9 -> 7 -> 12 -> 14 -> 13 -> 18 -> 25 -> 20 -> 15 -> 11
// bst.postOrderTraverse();

// 11 -> 7 -> 15 -> 5 -> 9 -> 13 -> 20 -> 3 -> 6 -> 8 -> 10 -> 12 -> 14 -> 18 -> 25
// bst.levelOrderTraverse();

console.log(bst.getMaxValue());
console.log(bst.getMinValue());

export {};
