// 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。

/**
 *
 * 1. 传入一个数字num
 * 2. 0和1 不属于质数，所以遍历i从2开始，当传入0或1时候，i>num不进入循环，返回false
 * 3. 量化质数，实际上质数就是在 2 < i < 质数 之间，没有可以整除质数的。
 */
function isPrime(num: number) {
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
    return true;
  }
  return false;
}

// function isPrime2(num: number) {
//   // 1. 获取平分根
//   const temp = parseInt(Math.sqrt(num));

//   // 2. 循环判断
//   for (var i = 2; i <= temp; i++) {
//     if (num % i == 0) {
//       return false;
//     }
//   }
//   return true;
// }

console.log(isPrime(2.5));
