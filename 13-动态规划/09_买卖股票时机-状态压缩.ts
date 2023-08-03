/**
 * 思路1：
 * dp[i] 表示当天能获得的最大收益
 * 获得的最大收益公式 = 今天的价格 - i前面时间里价格最便宜的时候
 * 第一天是没有收益的，当天买入卖出没有意义
 */

/**
 * 思路2：
 * dp[i] 表示当天能获得的最大收益
 * 获得的最大收益公式 = max(前一天的最大收益，今天的最大收益)
 * 今天的最大收益如果没有前一天的高，那么今天的最大收益应该等于前天，因为前一天卖了
 * 最终返回dp的最后一个值就行，这个值就是这个时间段的最大收益
 */

function maxProfit(prices: number[]): number {
  const n = prices.length;

  if (n <= 1) return 0;

  // 1. 定义状态
  const dp: number[] = [];
  // 2. 设置初始化值
  let preValue = 0;
  // 3. 状态转移方程dp[i]
  let minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    // 思路1
    // dp[i] = prices[i] - minPrice;

    // 思路2
    preValue = Math.max(prices[i] - minPrice, preValue);

    minPrice = Math.min(prices[i], minPrice);
  }

  // 思路1
  // return Math.max(...dp);
  // 思路2
  return preValue;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));

export {};
