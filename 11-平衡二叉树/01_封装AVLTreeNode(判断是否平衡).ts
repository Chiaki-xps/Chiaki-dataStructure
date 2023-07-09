import { TreeNode } from './00_二叉搜索树BSTree';

class AVLTreeNode<T> extends TreeNode<T> {
  // 保证获取到的left/right节点的类型是AVLTreeNode,这样子才能拿到AVLTreeNode一些特别的属性
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;

  // 获取每个节点的高度
  // 通过递归的方式，递归到最后叶子节点的时候高度为1，然后依次递归回来，向上走，每个节点，字节点最高的节点高度加上本身节点，继续返回
  private getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    // 这里 + 1，代表自身节点。左右节点中最大的高度加上自己就是自己的节点高度。
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // 权重：平衡因子(左边height - 右边height)
  // 获取到高度后，就可以进行计算左右子树高度差
  private getBalanceFactor(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return leftHeight - rightHeight;
  }

  // 直接判断当前节点是否平衡
  get isBalanced(): boolean {
    const factor = this.getBalanceFactor();
    return factor >= -1 && factor <= 1; // -1 0 1
  }
}

// 测试某一个节点的高度
const avlNode1 = new AVLTreeNode(10);
avlNode1.right = new AVLTreeNode(15);
avlNode1.right.right = new AVLTreeNode(20);
// console.log(avlNode1.getHeight());
// console.log(avlNode1.right.getHeight());

// 测试平衡因子（权值）
// console.log(avlNode1.getBalanceFactor());
// console.log(avlNode1.right.getBalanceFactor());

// 直接获取到一个节点当前是否平衡
console.log(avlNode1.isBalanced);
console.log(avlNode1.right.isBalanced);
