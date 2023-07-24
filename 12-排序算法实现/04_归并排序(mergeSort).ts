import { measureSort, testSort } from 'hy-algokit';

function mergeSort(arr: number[]): number[] {
  // 递归结束条件
  if (arr.length <= 1) return arr;

  // 1. 分解（divide): 对数组进行分解(分解成两个小数组)
  // 1.1 切割数组
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  // 1.2 递归的切割leftArr和rightArr
  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);

  // 2. 合并(merge): 将两个子数组进行合并(双指针)
  // 2.1 定义双指针
  const newArr: number[] = [];
  let i = 0;
  let j = 0;
  // 左右两边必须有值又能够比较，不然指针i或j指向的值undefined
  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }

  // 2.2 判断是否某一个数组中还有剩余的元素
  // 执行到这里的时候，存在一个数组为空，另一个数组有值的情况，这时候把有值的数组拼接到newArr最后
  // 循环完左边还有剩余
  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i));
  }
  // 循环完右边还有剩余
  if (j < newLeftArr.length) {
    newArr.push(...newRightArr.slice(j));
  }

  return newArr;
}

// testSort(mergeSort);
measureSort(mergeSort);
