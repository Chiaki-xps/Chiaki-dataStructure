function fib(n: number, memo: number[] = []): number {
  if (n <= 1) return n;

  // 求n的值
  // 把已经在n位置上，计算过的值保存下来，用到的时候再直接取出，没有的再递归
  if (memo[n]) {
    return memo[n];
  }

  // 没有从memo中获取到题
  const res = fib(n - 1, memo) + fib(n - 2, memo);
  memo[n] = res; // 将n位置的结果存储到memo中

  return res;
}

console.log(fib(10));
console.log(fib(20));
console.log(fib(50)); // 12586269025

export {};
