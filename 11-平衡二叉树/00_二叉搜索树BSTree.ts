import { btPrint } from 'hy-algokit';

import Node from '../types/Nodes';

export class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  // 对于AVL树来说，需要节点保存父节点的信息，方便进行父节点判断是否平衡
  parent: TreeNode<T> | null = null;

  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this);
  }

  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this);
  }
}

// BinarySearchTree
export class BSTree<T> {
  protected root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;

    while (current) {
      // 1. 找到current就返回
      if (current.value === value) {
        return current;
      }

      // 2. 继续向下找
      parent = current;
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }

      // 如果current有值，那么current保存父节点
      if (current) current.parent = parent;
    }

    return null;
  }

  // 模板模式
  protected createNode(value: T): TreeNode<T> {
    return new TreeNode(value);
  }

  // 这里啥也没做是因为BSTree不考虑平衡，假如继承的AVLTree就需要考虑平衡问题，需要重写方法
  protected checkBalance(node: TreeNode<T>, isAdd = true) {}

  /** 插入数据的操作 */
  insert(value: T) {
    // 1. 根据传入value创建Node(TreeNode)节点
    const newNode = this.createNode(value);

    // 2. 判断当前是否已经有了根节点
    if (!this.root) {
      // 当前树为空
      this.root = newNode;
    } else {
      // 树中已经有其他值
      this.insertNode(this.root, newNode);
    }

    // 3. 检查树是否平衡
    this.checkBalance(newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      // 去左边继续查找的空白位置
      if (node.left === null) {
        // node 节点的左边已经是空白
        node.left = newNode;
        // 给新插入的node节点，也设置父节点
        newNode.parent = node;
      } else {
        // 去右边继续查找空白位置
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        // 新增节点都能保证有父节点指向
        newNode.parent = node;
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

  /**
   * 判断拿到的节点是否是搜索的节点
   * 是返回true
   * 不是：
   *  搜索的节点比当前节点的值要大，从右边找
   *  搜索的节点比当前节点的值要下，从左边找
   */
  search(value: T): boolean {
    return !!this.searchNode(value);
  }

  /**
   * 1. 搜索节点，不存在，结束
   * 2. 删除的节点是一个叶子节点
   *      拿到父节点，判断左节点(isLeft)还是右节点(isRight)，然后parent.right = null / parent.left = null
   * 3. 如果删除的节点有一个子字节
   * 4. 如果删除的节点有两个子节点
   */

  /**
   * getSuccessor返回处理好的后继节点
   */
  private getSuccessor(delNode: TreeNode<T>) {
    // 获取右子树，找最小的值，即一直找左节点
    let current = delNode.right;
    // successor保存后继节点
    let successor: TreeNode<T> | null = null;

    while (current) {
      successor = current;
      current = current.left;
      if (current) {
        // 当前节点的父节点也保存起来。这样子我们的后继节点也能够找到父节点。因为后继节点移动后，父节点要删除后继节点。
        current.parent = successor;
      }
    }

    // successor不是删除节点的右节点，说明该节点已经是右子树的最小节点，该节点不会有左节点，因为它已经还是最小的，
    // 但是可能会有右结点，就需要将它的右节点移动到successor节点的位置，即successor的父节点的左节点
    if (successor !== delNode.right) {
      // 有后继节点的右节点就移到后继节点的父节点左节点上，没有就为null
      successor!.parent!.left = successor?.right ?? null;

      // n2: 不再删除current,而是修改current.value的时候，后继节点不移动，不需要重新对right赋值
      // successor!.right = delNode.right;
      // 改为删除后继节点
      if (successor?.right) {
        successor.right.parent = successor.parent;
      }
    }
    // n3: 刚好右子节点的情况,删除后继节点，把后继节点的right移动到删除节点的right上，修改父节点指向
    else {
      delNode.right = successor!.right;
      if (successor!.right) {
        successor!.right.parent = delNode;
      }
    }

    // successor === delNode.right的时候我们不需要做什么。即使我们有右结点，因为删除的节点是后继节点的父节点，后继节点变成父节点。

    // 一定要进行的操作：将删除节点的left，赋值给后继节点的left
    // 将删除节点的左节点，放到后继节点的左边
    // n4: 目标变成删除后继节点，就没必要进行后继节点的赋值操作了
    // successor!.left = delNode.left;
    return successor!;
  }

  remove(value: T): boolean {
    // 1. 搜索：当前是否存在这个value，存在需要把该节点和父节点返回方便下一步操作
    const current = this.searchNode(value);
    if (!current) return false;

    let delNode: TreeNode<T> = current;

    // 2. 获取到三个东西：当前节点/父节点/ isLeft,isRight
    let replaceNode: TreeNode<T> | null = null;

    // 2.1 如果删除的是叶子节点
    if (current.left === null && current.right === null) {
      replaceNode = null;
    }

    // 3. 只有一个子节点：只有左子节点
    else if (current.right === null) {
      // 相当于保存current的左子树
      replaceNode = current.left;
    }

    // 4. 只有一个子节点：只有右子节点
    else if (current.left === null) {
      // 相当于保存current的右子树
      replaceNode = current.right;
    }

    // 5. 有两个子节点
    // 方式一：左子树上移：找到左子树中最大的节点。（该节点称之为前驱节点）
    // 方式二：右子树上移：找到右子树中最小的节点。（该节点称之为后继节点）
    // 如果你用中序遍历就会发现，其实就是他靠边的两个节点。（这是我自己推测的）
    else {
      // 这里我们方式二,拿到后继节点
      // 这里相当于current节点传入后，将current的左右子树合并成一个新的子树然后给到replaceNode
      const successor = this.getSuccessor(current);

      // 这里删除节点使用新方法，注释n开头，表示新方法的注释
      // n1: 这一步的思路：
      // 以为把找到的后继节点上移，然后还要替换其父节点的指向，以及子节点的指向，还有其子节点的指向新的父节点，
      // 为了避开这些麻烦，我们直接把后继节点的值复制给current.value
      // 然后去删除后继节点，因为后继节点最多只有一个右子树，只需要处理一个节点
      current.value = successor.value;

      // replaceNode = successor;
      // n5: 删除的节点，变成了删除后继节点
      delNode = successor;

      // n6: 有两个子节点的时候，我们做的操作不是删除current的,而是删除子节点
      // 这里已经完成了删除，所以不需要下面的执行，可以直接进入判断平衡
      // 然后直接结束
      // n7: 这样做的好处，如果你直接删除了current，可以减少一些节点的操作
      // n8: 这里无论用什么办法，应该传入的是后继节点，因为事实上这个位置的current节点被删除还是不删除只重新赋值,这个位置的节点（或者说这个索引位置）仍然是存在节点的，只是换了一个节点，
      // 真正被删除的是后继节点（后继节点发生移动，那个位置上的索引其实变成了空），那么就会导致后继节点的父节点存在失衡，恰好，current也一定是后继节点通过不断.parent最终也会找到current
      this.checkBalance(delNode, false);
      return true;
    }

    // 这里是真正执行删除的地方
    if (current === this.root) {
      this.root = replaceNode;
    }
    // current.isLeft表示是不是父节点的左节点
    else if (current.isLeft) {
      current.parent!.left = replaceNode;
    } else {
      current.parent!.right = replaceNode;
    }

    // 判断replaceNode
    // 如果replaceNode有值的话,current有父节点，这时候给replace确定父节点
    // 保证删除操作后，更新的树的每个节点会更新正确自己的父节点
    // 因为我们前面的操作只是保证current的父节点指向正确的子节点，这一步是current的后继节点可以指向正确的父节点
    if (replaceNode && current.parent) {
      replaceNode.parent = current.parent;
    }

    // 删除完成后,检测树是否平衡
    // 传入被删除的节点.我们自定义的checkBalance函数会帮助我们进行从传入的父节点开始检查平衡

    // n7: 这里传入的delNode为current,current的子树本身也是二叉搜索树，所以只需要考虑删除一个节点后，current父节点是否会失衡
    this.checkBalance(delNode, false);
    return true;
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

// console.log(bst.getMaxValue());
// console.log(bst.getMinValue());

// console.log(bst.search(1));
// console.log(bst.search(20));
// console.log(bst.search(18));
// console.log(bst.search(6));
// console.log(bst.search(30));

// 删除一个节点的情况
// bst.remove(3);
// bst.remove(8);
// bst.remove(12);
// bst.print();

// bst.remove(6);
// bst.remove(10);
// bst.remove(25);
// bst.print();

// bst.remove(20);
// bst.print();

// bst.remove(13);
// bst.print();

// 删除两个子节点的情况
// bst.remove(11);
// bst.remove(15);
// bst.remove(9);
// bst.print();

export {};
