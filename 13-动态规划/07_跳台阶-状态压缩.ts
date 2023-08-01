function jump(n: number): number {
  // 1. 定义状态
  let pre = 1;
  let cur = 1;

  // 3. 状态转移方程
  for (let i = 2; i <= n; i++) {
    const iValue = pre + cur;
    pre = cur;
    cur = iValue;
  }

  return cur;
}

console.log(jump(3));
console.log(jump(4));
console.log(jump(10)); // 89

export {};
