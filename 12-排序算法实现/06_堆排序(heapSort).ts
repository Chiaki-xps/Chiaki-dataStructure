import { swap, testSort, cbtPrint } from 'hy-algokit';

export default function heapSort(arr: number[]): number[] {
  // 1. 获取数组的长度
  const n = arr.length;

  // 2. 对arr进行原地建堆
  // 2.1 从第一非叶子节点开始进行下滤操作
  const start = Math.floor(n / 2 - 1);

  for (let i = start; i >= 0; i--) {
    // 2.2 进行下滤操作
    heapifyDown(arr, n, i);
  }

  cbtPrint(arr);

  // 3. 对最大堆进行排序操作
  for (let i = n - 1; i > 0; i--) {
    // 最大值和最后一个值交换
    swap(arr, 0, i);
    // 这里n-1,把最后一位去掉
    heapifyDown(arr, i, 0);
  }

  return arr;
}
/**
 *
 * @param arr 在数组中进行下滤操作
 * @param n 下滤操作的范围
 * @param index 哪一个位置需要进行下滤操作
 */
function heapifyDown(arr: number[], n: number, index: number) {
  while (2 * index + 1 < n) {
    // 1. 获取左右节点的索引
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    // 2. 找到左右子节点交大的值
    let largerIndex = leftChildIndex;
    if (rightChildIndex < n && arr[rightChildIndex] > arr[leftChildIndex]) {
      largerIndex = rightChildIndex;
    }

    // 3. 判断Index位置的值比更大的子节点，直接break
    if (arr[index] >= arr[largerIndex]) {
      break;
    }

    // 4. 和更大位置的进行交换操作
    swap(arr, index, largerIndex);
    index = largerIndex;
  }
}

testSort(heapSort);
