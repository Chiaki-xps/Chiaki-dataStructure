import { BSTree, TreeNode } from './00_二叉搜索树BSTree';
import { AVLTreeNode } from './04_封装AVLTreeNode(左旋转操作)';

class AVLTree<T> extends BSTree<T> {
  // 重写调用的createNode方法
  // 因为我们AVL树继承的是BSTree，BSTree创建的node节点是自己的TreeNode
  // 而我们需要的是AVLTreeNode，所以重写方法

  // 这里可以使用TreeNode，因为父类引用指向子类对象，多态
  // AVLTreeNode创建的累符合TreeNode
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value);
  }

  // 如何去找到不平衡的节点(先不做)
  checkBalance(node: AVLTreeNode<T>): void {
    let current = node.parent;
    while (current) {
      if (!current.isBalanced) {
        this.reBalance(current);
        break;
      }
      current = current.parent;
    }
  }

  /**
   * 根据不平衡的节点的情况（LL/RR/LR/RL）让子树平衡
   * @param root 存入不平衡的节点
   * root的子节点叫pivot为子树更高的节点
   * pivot的更高子节点叫做current
   */

  reBalance(root: AVLTreeNode<T>) {
    const pivot = root.heightChild;
    const current = pivot?.heightChild;

    // 拿到最后旋转的结果
    let resultNode: AVLTreeNode<T> | null = null;

    // 最外层if else中pivot?.isLeft说明pivot是否root左节点判断第一个是L或R
    // left
    if (pivot?.isLeft) {
      // 第二个判断确认LL或LR
      // LL
      if (current?.isLeft) {
        resultNode = root.rightRotation();
      }
      // LR
      else {
        pivot.leftRotation();
        resultNode = root.rightRotation();
      }
    }
    // right
    else {
      // 第二个判断确认RL或RR
      // RL
      if (current?.isLeft) {
        pivot?.rightRotation();
        resultNode = root.leftRotation();
      }
      // RR
      else {
        resultNode = root.leftRotation();
      }
    }

    // 判断返回的pivot是否有父节点
    // 旋转后pivot替代了root位置
    // resultNode父节点为null，说明没有父节点，说明这个resultNode就是根节点
    if (resultNode.parent === null) {
      // resultNode为父节点，直接替换root
      this.root = resultNode;
      // 上面为什么要这样做，假设，我们的传入的节点root不是根节点，
      // 那么我们获取到pivot，进行旋转的时候,本质上也会影响到传入的root
      // 因为旋转的函数会帮助我们,把pivot的父节点指向和root一样的父节点,此时,当root的父节点找直接的时候,找到的就是pivot
      // 这就完成了对当前树的再平衡,对传入的值(对象)做了修改.
      // 但是旋转函数中存在一个缺点，就是，如果发现没有父节点。那么直接返回pivot
      // 那么返回一个新的值，并没有对传入的root进行修改，那么没有起到再平衡的作用
      // 所以我们可以选择在旋转函数中，对已经判断pivot是根节点的时候，替换我们当前保存的根节点root
      // 这里我们选择在reBalance中完成替换根节点操作，根据自己的设计决定。
    }
  }
}

const avlTree = new AVLTree<number>();

// avlTree.insert(50);
// avlTree.insert(100);
// avlTree.insert(150);

// for (let i = 0; i < 20; i++) {
//   avlTree.insert(Math.floor(Math.random() * 200));
// }

avlTree.insert(15);
avlTree.insert(13);
avlTree.insert(20);
avlTree.insert(16);
avlTree.insert(10);
avlTree.insert(14);
avlTree.insert(9);
avlTree.insert(11);

avlTree.remove(13);

avlTree.print();

export {};
