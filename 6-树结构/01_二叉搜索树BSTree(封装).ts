// import { btPrint } from 'hy-algokit';

import Node from '../types/Nodes';

class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
}

class BSTree<T> {
  private root: TreeNode<T> | null = null;
}

export {};
