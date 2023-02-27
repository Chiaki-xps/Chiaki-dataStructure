// 定义栈的接口
interface IStack<T> {
    push(element: T): void,
    pop(): T | undefined,
    peek(): T | undefined,
    isEmpty(): boolean,
    size(): number
}

// 导出接口
export default IStack;