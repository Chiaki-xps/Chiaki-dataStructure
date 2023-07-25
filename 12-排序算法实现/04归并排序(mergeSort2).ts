// 上一个方法返回新数组。这次原地返回
function mergeSort2(arr: number[]): number[] {
  const n = arr.length;
  mergeSortInternal(arr, 0, n - 1);
  return arr;
}

// mergeSortInternal负责分割数组
// merge负责合并数组

// 归并排序的内部实现函数，对数组arr的[left,right]区间进行排序
function mergeSortInternal(arr: number[], left: number, right: number): void {
  if (left >= right) {
    // 如果区间只有一个元素或者为空，直接返回
    return;
  }

  const mid = left + Math.floor((right - left) / 2);

  // 递归对左右两个子区间进行排序
  // 这里使用了递归
  mergeSortInternal(arr, left, mid);
  mergeSortInternal(arr, mid + 1, right);

  // 递归到底后，开始执行合并
  // 将排好序的做优两个子区间进行合并
  merge(arr, left, mid, right);
}

// 将已排好的左右两个子区间合并成一个有序的区间
function merge(arr: number[], left: number, mid: number, right: number): void {
  const temp = new Array(right - left + 1);
  let i = left,
    j = mid + 1,
    k = 0;

  // 比较左右两个自子区间的元素，将较小的元素插入到temp中
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }

  // 如果左子区间还有元素,将它们全部复制到temp中
  while (i <= mid) {
    temp[k++] = arr[i++];
  }

  // 如果右子区间还有元素,将它们全部复制到temp中
  while (j <= right) {
    temp[k++] = arr[j++];
  }

  // 将temp中的元素赋值回原数组中
  for (let p = 0; p < temp.length; p++) {
    arr[left + p] = temp[p];
  }
}
