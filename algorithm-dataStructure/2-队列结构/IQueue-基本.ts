interface IQueue<T> {
  // 入队方法
  enqueue(element: T): void;
  // 出队方法，有返回值，为T或者已经为空则返回undefined
  dequeue(): T | undefined;
  // 返回第一个元素
  peek(): T | undefined;
  // 判断是否为空
  isEmpty(): boolean;
  // 元素个数
  size(): number;
  // 如果继承的方法是get方法,这是js class的语法,当你在函数前面用get的时候,就表示get方法(可以理解为get属性，使用的时候就不需要调用方法一样,可以直接使用属性,不需要加小括号),
  // get size(): number; 
}

export default IQueue;
