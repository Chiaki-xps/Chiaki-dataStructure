import { btPrint } from 'hy-algokit';
import { TreeNode } from './00_二叉搜索树BSTree';

export class AVLTreeNode<T> extends TreeNode<T> {
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
    // return factor >= -1 && factor <= 1; // -1 0 1
    return Math.abs(factor) <= 1;
  }

  // 获取更高的子节点
  public get heightChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    if (leftHeight > rightHeight) return this.left;
    if (leftHeight < rightHeight) return this.right;

    // 剩下的情况是左右相等，一般情况是不可能来到这里，在这里的代码逻辑中，当判断该节点不平衡的时候，才会执行获取更高的节点，所有左右是不相等的。
    // 假如我们传入的节点是任意的,那么如果左右平衡，就返回左节点
    return this.isLeft ? this.left : this.right;
  }

  // 右旋转
  // 在不平衡节点中调用旋转
  rightRotation() {
    // 先保存包this是否为其父节点的左节点，后续作为判断pivot挂载到父节点具体哪个子节点上有帮助
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    // 1. 处理pivot(轴心节点在这里的代码逻辑中必存在)
    const pivot = this.left!;
    pivot.parent = this.parent;

    // 2. 处理pivot的right
    this.left = pivot.right;
    if (pivot.right) {
      pivot.right.parent = this;
    }

    // 3. 处理this
    pivot.right = this;
    this.parent = pivot;

    // 4. 挂载pivot。 将pivot旋转为不平衡的子树或树的根节点
    // pivot直接作为tree的根
    if (!pivot.parent) {
      return pivot;
    }
    // pivot作为父节点的左子结点
    else if (isLeft) {
      pivot.parent.left = pivot;
    }
    // pivot作为父节点的右子节点
    else if (isRight) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }

  // 左旋转
  leftRotation() {
    // 先保存包this是否为其父节点的左节点，后续作为判断pivot挂载到父节点具体哪个子节点上有帮助
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    // 1. 处理pivot(轴心节点在这里的代码逻辑中必存在)
    const pivot = this.right!;
    pivot.parent = this.parent;

    // 2. 处理pivot的right
    this.right = pivot.left;
    if (pivot.left) {
      pivot.left.parent = this;
    }

    // 3. 处理this
    pivot.left = this;
    this.parent = pivot;

    // 4. 挂载pivot。 将pivot旋转为不平衡的子树或树的根节点
    // pivot直接作为tree的根
    if (!pivot.parent) {
      return pivot;
    }
    // pivot作为父节点的左子结点
    else if (isLeft) {
      pivot.parent.left = pivot;
    }
    // pivot作为父节点的右子节点
    else if (isRight) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }
}

// 测试某一个节点的高度
const avlNode1 = new AVLTreeNode(10);
avlNode1.right = new AVLTreeNode(15);
avlNode1.right.parent = avlNode1;
avlNode1.right.right = new AVLTreeNode(20);
avlNode1.right.right.parent = avlNode1.right;

// 事实上这样子，parent已经不平衡了，不过我们是大概得模拟
const parent = new AVLTreeNode(6);
parent.right = avlNode1;

avlNode1.parent = parent;

btPrint(parent);

avlNode1.leftRotation();

btPrint(parent);
