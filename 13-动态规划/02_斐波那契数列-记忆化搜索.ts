function fib(n: number, memo: number[] = []): number {
  if (n <= 1) return n;

  // 求n的值
  if (memo[n]) {
    return memo[n];
  }

  // 没有从memo中获取到题
  const res = fib(n - 1, memo) + fib(n - 2, memo);
  memo[n] = res; // 将n位置的结果存储到memo中

  return fib(n - 1) + fib(n - 2);
}

console.log(fib(10));

export {};
