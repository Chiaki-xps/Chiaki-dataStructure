// 线性结构共用接口
export default interface IList<T> {
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
