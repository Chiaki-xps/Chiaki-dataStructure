function fib(n: number): number {
  // 1. 定义状态
  // dp保留斐波那契数列中每一个位置对应的值(状态)
  // dp[x]表示的就是x位置对应的值(状态)
  //  dp数组的作用就是把所有子问题的解都保存下来
  // 子问题或原问题都需要从dp数组中拿去需要的子问题解

  // 2. 状态转移方程: dp[i] = dp[i-1] + dp[i-2]
  // 状态转移方程通常都是写在循环(for/while)中

  // 3. 设置初始化状态: dp[0]/dp[1]初始化状态
  // 4. 计算最终的结果

  // 1. 定义状态
  const dp: number[] = [];

  // 2. 初始化状态
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    // 3. 状态转移方程
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  // 4. 计算最终的结果
  return dp[n];
}

console.log(fib(10)); // 55
console.log(fib(20)); // 6765
console.log(fib(50)); // 12586269025

export {};
