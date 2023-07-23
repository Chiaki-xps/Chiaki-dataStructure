import { testSort } from 'hy-algokit';

function insertionSort(arr: number[]): number[] {
  let n = arr.length;

  // 1. 默认第0个为排序好的，从第1个开始插入
  for (let i = 1; i < n; i++) {
    // 当前插入的数据
    const newNum = arr[i];

    // 插入的数据的位置，前面的数据已经排序好了
    let j = i - 1;
    // 与前面的数据进行比较，0 ~ i-1已经是排序好的数组，在其中找到比newNum小的数字
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // 找到比newNum小的位置，插入到后面的位置上
    arr[j + 1] = newNum;
  }

  return arr;
}

testSort(insertionSort);
