class Node<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export default Node;

// ts中interface：
// extend继承类，可以直接使用或修改父类方法
// implements继承类，必须重写父类方法
