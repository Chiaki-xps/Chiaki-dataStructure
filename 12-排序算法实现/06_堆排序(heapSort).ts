import { testSort } from 'hy-algokit';

function heapSort(arr: number[]): number[] {
  // 1. 获取数组的长度
  const n = arr.length;

  // 2. 对arr进行原地建堆
  // 2.1 从第一非叶子节点开始进行下滤操作
  const start = Math.floor(n / 2 - 1);

  for (let i = start; i >= 0; i--) {
    // 2.2 进行下滤操作
  }

  return arr;
}
/**
 *
 * @param arr 在数组中进行下滤操作
 * @param n 下滤操作的范围
 * @param index 哪一个位置需要进行下滤操作
 */
function heapifyDown(arr: number[], n: number, index: number) {}

testSort(heapSort);
