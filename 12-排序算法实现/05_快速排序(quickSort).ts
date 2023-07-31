import { measureSort, swap, testSort } from 'hy-algokit';

export default function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);
  // 定义递归函数(闭包)
  function partition(left: number, right: number): void {
    // 递归结束条件
    if (left >= right) return;

    // 1. 找到基准元素(pivot)
    // 这里我们用数组最后一个作为轴心
    const pivot = arr[right];

    // 2. 双指针进行交换操作(左边都是比pivot小的数字，右边都是比pivot大的数组)
    let i = left;
    // right被设置我基准
    let j = right - 1;

    // 只要i<=j。那么我们就要循环找、交换步骤
    while (i <= j) {
      // 找到比基准小的，i就会停下，然后去找j位置比pivot大的，然后交换位置上的值。
      // 找比pivot大的元素
      while (arr[i] < pivot) {
        i++;
      }
      // 找比pivot小的元素
      while (arr[j] > pivot) {
        j--;
      }

      // 交换
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }

    // 3. 将pivot放在正确的位置
    // 需要把基准元素放在中间，这里我们选择i位置作为中间位置
    // i所在的位置的值一定是大于等于pivot
    // 当我们结束循环的时候，j<i，说明所有数都遍历了一遍，位置做了交换，0-i范围的值都比pivot小，所以j在0-i区间的时候，已经不需要做交换了
    swap(arr, i, right);

    // 进入递归
    // 左右继续划分区域
    partition(left, j);
    // i位置不再做改变，分成两段，然后继续交换，这里的交换索引仍然指的是原数组的索引，所以这是一个原地排序
    partition(i + 1, right);
  }

  // 快速排序是原地排序
  return arr;
}

// testSort(quickSort);
measureSort(quickSort);
