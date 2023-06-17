// 数组实现栈
class Stack {
    constructor() {
        this.arrStack = [];
    };

    push(e) {
        this.arrStack.push(e);
    }

    pop() {
        this.arrStack.pop();
    }

    peek() {
        return this.arrStack[this.arrStack.length - 1];
    }

    isEmpty() {
        return this.arrStack.length === 0;
    }
    
    clear() {
        this.arrStack = []
    }

    size() {
        return this.arrStack.length
    }
}
