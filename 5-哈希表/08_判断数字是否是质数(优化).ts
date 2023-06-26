// import { isPrime } from "hy-algokit";

/**
 * 分析一个非质数的特点，
 *
 * 例如一个18
 * 18非质数，可以有 2*9 3*6
 * 不难发现18的小的因数都分布在 18的平方根的左侧，即必然存在小于等于18的平方根的公因数
 *
 * 例如一个9
 * 9非质数，可以有 3*3
 * 不难发现9的小的因数都分布在9的平方根的左侧或平方根上，即必然存在小于等于9的平方根的自然因数
 *
 *
 * 非质数都存在一个小于等于平方根的一个因数，这样的话，我们就可以将我们的遍历缩小为（log n）
 */

function isPrime(num: number): boolean {
  // O(n) => O(log n)
  const sqrt = Math.sqrt(num);
  for (var i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(2));
console.log(isPrime(8));
console.log(isPrime(9));
console.log(isPrime(14));
console.log(isPrime(15));
console.log(isPrime(17));
console.log(isPrime(23));

export {};
