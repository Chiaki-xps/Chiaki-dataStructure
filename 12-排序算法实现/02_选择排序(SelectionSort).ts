import { measureSort, swap, testSort, compareSort } from 'hy-algokit';

function SelectionSort(arr: number[]): number[] {
  let n = arr.length;

  // 外层循环作用: 经过多少轮找最小值
  for (let i = 0; i < n - 1; i++) {
    // 内层循环作用，每次找到最小值
    let minIndex = i;
    for (let j = 1 + i; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 优化: 如果i和minIndex位置相等的话，说明不需要交换操作
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }

  return arr;
}

// testSort(SelectionSort);
measureSort(SelectionSort);
// compareSort([SelectionSort]);
