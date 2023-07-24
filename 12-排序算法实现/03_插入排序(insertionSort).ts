import { testSort } from 'hy-algokit';

function insertionSort(arr: number[]): number[] {
  let n = arr.length;

  // 1. 默认第0个为排序好的，从第1个开始插入
  for (let i = 1; i < n; i++) {
    // 当前插入的数据
    const newNum = arr[i];

    // 插入的数据的位置，i-1代表前面已经排列好的数据
    let j = i - 1;

    // 与前面的数据进行比较，0 ~ i-1已经是排序好的数组，在其中找到比newNum小的数字
    while (arr[j] > newNum && j >= 0) {
      // 每执行一次循环，当前比较的数，向后移动一位
      // 思考：第一次循环中，j+1代表的就是i的位置，数据已经保存在newNum中，所以第一次循环中a[j+1]替换a[j]的时候，原来的数据任保留在newNum中，以此类推
      arr[j + 1] = arr[j];
      // 排序好的数据，向前移动
      j--;
    }

    // 找到比newNum小的位置，插入到后面的位置上。而这个位置上的数据已经向后移动了
    arr[j + 1] = newNum;
  }

  return arr;
}

testSort(insertionSort);
