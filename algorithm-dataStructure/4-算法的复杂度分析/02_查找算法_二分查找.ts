// 在一个数组中进行二分查找
// 思路：
/**
 * 1. 二分查找需要先把数据做好排序，这道题里暂时不用
 * 2. 定义头尾两个节点。通过判断头尾节点中间的值来锁定查找的数的区间，当大于中间值，意味着查找值在中间节点到尾节点之间，这时候，
 *    尾节点向在中间节点索引 +1，得到新的区间，继续循环判断。
 * 3. 无论尾节点的移动还是头节点的移动，最后当尾节点大于头节点的时候，说明查找不到。结束循环
 *
 */
function binarySearch(array: number[], num: number) {
  // 1. 定义左边的索引
  let left = 0;
  // 2. 定义右边的索引
  let right = array.length - 1;

  // 3. 开始查找
  while (left <= right) {
    // Math.floor向下取整，取得出结果小的整数
    let mid = Math.floor((left + right) / 2);
    const midNum = array[mid];
    if (midNum === num) {
      return mid;
    } else if (midNum < num) {
      left = mid + 1;
    } else {
      right = mid + 1;
    }
  }

  return -1;
}

const index = binarySearch([1, 3, 5, 10, 100, 222, 333], 222);
console.log(index);

export default binarySearch;
