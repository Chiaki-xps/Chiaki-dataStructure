// 质数（素数）是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。
// 质数的特点：只能被1和num整除

/**
 *
 * 1. 传入一个数字num
 * 2. 0和1 不属于质数，所以遍历i从2开始，当传入0或1时候，i>num不进入循环，返回false
 * 3. 量化质数，实际上质数就是在 2 < i < 质数 之间，没有可以整除质数的。
 */

/**
 * 根据传入的数字，判断是否一个质数
 * @param num 要判断的数字
 * @returns 是否是一个质数
 */
function isPrime(num: number): boolean {
  //  如果传入的是8
  // 判断范围只需要在2～7
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(2));
console.log(isPrime(8));
console.log(isPrime(14));
console.log(isPrime(15));
console.log(isPrime(17));
console.log(isPrime(23));

export {};

// 缺陷：没有判断数字是否为整数
