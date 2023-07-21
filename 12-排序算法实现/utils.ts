export function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  // 等价于
  // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
}

export function isSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

// 编写一个工具，直接帮助测试排序算法
type sortAlgoFn = (arr: number[]) => number[];
// 表示testSort参入的参数sortFn是一个类型sortAlgoFn的函数
export function testSort(sortFn: sortAlgoFn) {
  // 1. 随机一个长度为10的数组
  const nums = Array.from({ length: 10 }, () => {
    return Math.floor(Math.random() * 200);
  });

  // 2. 使用排序对数组进行排序
  console.log('排序前的原数组', nums);
  const newNums = sortFn(nums);
  console.log('排序后的新数组', newNums);

  console.log('是否排序后有正确的顺序:', isSorted(newNums));
}
