import { testSort, swap, measureSort } from 'hy-algokit';
// import { testSort, swap } from './utils';

export default function bubbleSort(arr: number[]): number[] {
  const n = arr.length;

  // 当j<length可以取到数组最后一个，但是我们冒泡排序中不需要拿最后一个比较，
  // 在倒数第二的时候就会进行arr[j] > arr[j+1]
  // 如果填写j<length,那么取值最后，比较最后的一个的下一个会造成越界
  // 所以：j应该小于length -1。
  // 最终得到 j < length - 1 -i

  // 外层循环执行次数，应当为我们的数组长度
  // 这里i可以选择i< n-1。因为最后一个没必要比较，一定是最小的
  for (let i = 0; i < n; i++) {
    // 是否发生了交换
    let swapped = false;

    // 内层循环找到最大值
    // 内存循环执行的次数i，意味着倒数i个都是大于前面的值，没必要继续比较
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
      }
    }

    // 只要这一轮发生过交换，就说明当前数组没有排序完成
    // 这一轮没有发生过交换，说明当前数组已经提前排序好了，可以直接结束
    // 例如一开始就排序好，就没必要下一轮循环了。
    if (!swapped) break;
  }

  return arr;
}

// 1. 测试代码
// const nums = [18, 88, 45, 27, 9, 15, 65, 7];
// const newNums = bubbleSort(nums);
// console.log(newNums);
testSort(bubbleSort);
// measureSort(bubbleSort);
