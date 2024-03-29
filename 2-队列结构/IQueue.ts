import IList from '../types/IList';

interface IQueue<T> extends IList<T> {
  // 入队方法
  enqueue(element: T): void;
  // 出队方法，有返回值，为T或者已经为空则返回undefined
  dequeue(): T | undefined;
}

export default IQueue;
