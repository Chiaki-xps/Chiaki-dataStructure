import ArrayStack from './01_实现栈结构Stack';

// 要把十进制转化成二进制，我们可以将该十进制数字和2整除，直到结果为0为止。
function decimalToBinary(decimal: number): string {
  // 1. 创建一个栈,用于存放余数
  const stack = new ArrayStack<number>();

  // 2. 使用循环: while/for,直到循环的次数的时候一般用for。但是不知道次数，只知道结束的条件一般用while
  while (decimal > 0) {
    const result = decimal % 2;
    stack.push(result);
    decimal = Math.floor(decimal / 2);
  }

  // 3. 所有的余数都已经放在stack中,依次取出
  let binary = '';
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }
  return binary;
}

console.log(decimalToBinary(35));

export {};
