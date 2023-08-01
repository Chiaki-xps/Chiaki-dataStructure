function jump(n: number): number {
  // 1. 定义状态
  const dp: number[] = [];

  // 2. 初始化状态
  dp[0] = 1;
  dp[1] = 1;

  // 3. 状态转移方程
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(jump(3));
console.log(jump(4));
console.log(jump(10)); // 89

export {};
