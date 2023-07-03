import { btPrint, PrintableNode } from 'hy-algokit';

class Node<T> {
  data: T;
  constructor(value: T) {
    this.data = value;
  }
}

class TreeNode<T> extends Node<T> implements PrintableNode {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;

  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this);
  }

  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this);
  }

  get value() {
    const data = this.data as unknown as Product;
    return `${data.name} - ${data.price}`;
  }
}

// BinarySearchTree
class BSTree<T> {
  private root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;

    while (current) {
      // 1. 找到current就返回
      if (current.data === value) {
        return current;
      }

      // 2. 继续向下找
      parent = current;
      if (current.data < value) {
        current = current.right;
      } else {
        current = current.left;
      }

      // 如果current有值，那么current保存父节点
      if (current) current.parent = parent;
    }

    return null;
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
    if (newNode.data < node.data) {
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
      console.log(node.data);
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
      console.log(node.data);
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
      console.log(node.data);
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
      console.log(current.data);
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
    return current?.data ?? null;
  }

  getMinValue(): T | null {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.data ?? null;
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
      successor!.right = delNode.right;
    }

    // successor === delNode.right的时候我们不需要做什么。即使我们有右结点，因为删除的节点是后继节点的父节点，后继节点变成父节点。

    // 一定要进行的操作：将删除节点的left，赋值给后继节点的left
    // 将删除节点的左节点，放到后继节点的左边
    successor!.left = delNode.left;
    return successor!;
  }

  remove(value: T): boolean {
    // 1. 搜索：当前是否存在这个value，存在需要把该节点和父节点返回方便下一步操作
    const current = this.searchNode(value);
    if (!current) return false;

    // 2. 获取到三个东西：当前节点/父节点/ isLeft,isRight
    let replaceNode: TreeNode<T> | null = null;

    // 2.1 如果删除的是叶子节点
    if (current.left === null && current.right === null) {
      replaceNode = null;
    }

    // 3. 只有一个子节点：只有左子节点
    else if (current.right === null) {
      replaceNode = current.left;
    }

    // 4. 只有一个子节点：只有右 子节点
    else if (current.left === null) {
      replaceNode = current.right;
    }

    // 5. 有两个子节点
    // 方式一：左子树上移：找到左子树中最大的节点。（该节点称之为前驱节点）
    // 方式二：右子树上移：找到右子树中最小的节点。（该节点称之为后继节点）
    // 如果你用中序遍历就会发现，其实就是他靠边的两个节点。（这是我自己推测的）
    else {
      // 拿到后继节点
      const successor = this.getSuccessor(current);
      replaceNode = successor;
    }

    if (current === this.root) {
      this.root = replaceNode;
    } else if (current.isLeft) {
      current.parent!.left = replaceNode;
    } else {
      current.parent!.right = replaceNode;
    }

    return true;
  }
}

// class Product {
//   name: string;
//   price: string;

//   constructor(name: string, price: string) {
//     this.name = name;
//     this.price = price;
//   }
// }

// 上面的代码，ts提供了一种语法糖
class Product {
  constructor(public name: string, public price: number) {}

  valueOf() {
    return this.price;
  }
}

const bst = new BSTree<Product>();

const p1 = new Product('iphone', 100);
const p2 = new Product('huawei', 120);
const p3 = new Product('xiaomi', 80);
const p4 = new Product('oppo', 90);
const p5 = new Product('vivo', 70);

bst.insert(p1);
bst.insert(p2);
bst.insert(p3);
bst.insert(p4);
bst.insert(p5);

bst.print();

export {};
