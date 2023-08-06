// 无重复字符的最长子串
// 可能有多个最长字符串
// 双指针解题 - 滑动窗口
function lengthOfLongestSubstring(s: string): number {
  const n = s.length;

  // 保存字符所在的索引位置
  const map = new Map<string, number>();

  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    const rightChar = s[right];

    // 例子： ‘abcba’
    // 1. 保存最新的索引之前，先判断是否之前这个字符已经出现过
    // 2. 判断新的rightChar索引是否大于等于left （我感觉这一步多余了）
    if (map.has(rightChar) && map.get(rightChar)! >= left) {
      left = map.get(rightChar)! + 1;
    }

    map.set(rightChar, right);
    const currentLength = right - left + 1;
    maxLength = Math.max(currentLength, maxLength);

    map.set(rightChar, right);
  }

  return maxLength;
}

// "abba"
