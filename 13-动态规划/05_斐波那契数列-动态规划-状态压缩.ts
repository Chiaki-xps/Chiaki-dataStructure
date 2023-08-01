function fib(n: number): number {
  // 事实上我们的子问题只和我们的前两个子问题的解，有关系
  // 这时候我们的dp实际上不需要每个子问题都保存下来，只需要记录下最近的两个子问题解就够了
  // 这就是状态压缩

  if (n <= 1) return n;

  // 1. 定义状态
  // 2. 初始化状态
  let prev = 0;
  let cur = 1;

  for (let i = 2; i <= n; i++) {
    // 3. 状态转移方程

    // newValue相当于i位置
    const newValue = prev + cur;
    prev = cur;
    cur = newValue;
  }

  // 4. 计算最终的结果
  return cur;
}

console.log(fib(10)); // 55
console.log(fib(20)); // 6765
console.log(fib(50)); // 12586269025

export {};
