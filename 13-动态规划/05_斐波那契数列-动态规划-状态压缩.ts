function fib(n: number): number {
  // 1. 定义状态
  // 2. 初始化状态
  let prev = 0;
  let cur = 1;

  for (let i = 0; i <= n; i++) {
    // 3. 状态转移方程
    const newValue = prev + cur;
    prev = cur;
    cur = newValue;
  }

  // 4. 计算最终的结果
  return cur;
}

console.log(fib(10)); // 55

export {};
