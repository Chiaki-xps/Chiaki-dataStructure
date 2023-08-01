function fib(n: number): number {
  // n位置的值 (n-1) + (n-2)
  const memo: number[] = [];

  // i从0开始，最终找到n位置的解，一般称之为自底向上的解法
  // 从0开始，每个子问题的解都求到之后，最终求n的解
  for (let i = 0; i <= n; i++) {
    // 初始化状态0和1位置对应的数字是0和1
    if (i <= 1) {
      memo[i] = i;
      continue;
    }

    // 第n(n>1)个位子的时候，memo[n] = memo[n - 1] + memo[n - 2];
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}

console.log(fib(10)); // 55
console.log(fib(20)); // 6765
console.log(fib(50)); // 12586269025

export {};
