import { testSort } from 'hy-algokit';

function mergeSort(arr: number[]): number[] {
  // 1. 分解（divide): 对数组进行分解(分解成两个小数组)
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  // 2. 合并(merge): 将两个子数组进行合并(双指针)
  // 返回新数组
  return mergeSortedArr(mergeSort(leftArr), mergeSort(rightArr));
}

// 合并两个有序数组
function mergeSortedArr(a: number[], b: number[]): number[] {
  let i = 0,
    j = 0;
  // 声明新数组
  const mergeArr: number[] = [];
  while (i < a.length && j < b.length) {
    // 将较小的元素放入新数组
    a[i] < b[j] ? mergeArr.push(a[i++]) : mergeArr.push(b[j++]);
  }

  return mergeArr;
}

testSort(mergeSort);
