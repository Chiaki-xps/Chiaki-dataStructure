function fib(n: number): number {
  // n位置的值 (n-1) + (n-2)
  const memo: number[] = [];

  for (let i = 0; i <= n; i++) {
    // 初始化状态0和1位置对应的数字是0和1
    if (n <= 1) {
      memo[i] = n;
      continue;
    }

    memo[n] = memo[n - 1] + memo[n - 2];
  }

  return memo[n];
}

console.log(fib(10));

export {};
