function jump(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return jump(n - 1) + jump(n - 2);
}

console.log(jump(2));
console.log(jump(10));

export {};
