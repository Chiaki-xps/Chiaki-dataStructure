import { BSTree } from './00_二叉搜索树BSTree';

class AVLTree<T> extends BSTree<T> {}

const avlTree = new AVLTree<number>();

avlTree.insert(10);
avlTree.insert(15);
avlTree.insert(20);
// avlTree.insert(5);
// avlTree.insert(8);

avlTree.print();
