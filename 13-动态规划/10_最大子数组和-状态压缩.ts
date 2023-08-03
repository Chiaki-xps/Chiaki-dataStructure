function maxArray(nums: number[]): number {
  // 1. 获取数组的长度
  const n = nums.length;

  // 2. 定义状态
  // const dp: number[] = [];

  // 3. 初始化状态
  // dp[0] = nums[0];
  let preValue = nums[0];

  // 4. 状态转移的过程
  let max = preValue;
  for (let i = 1; i < n; i++) {
    preValue = Math.max(nums[i], nums[i] + preValue);

    max = Math.max(preValue, max);
  }

  return max;
}

console.log(maxArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

export {};
