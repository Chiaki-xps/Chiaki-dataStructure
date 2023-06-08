// 线性结构共用接口
interface IList<T> {
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

export default IList;
