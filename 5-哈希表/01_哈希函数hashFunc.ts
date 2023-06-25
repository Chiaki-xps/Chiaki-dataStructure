/**
 * 哈希函数，将key映射映射成index
 * @param key 转换的key
 * @param max 数组的长度(最大的数值)
 * @returns 索引值
 */
function hashFunc(key: string, max: number): number {
  // 1. 计算hashCode cats => 60337 (27为底的时候)
  let hashCode = 0;

  const length = key.length;
  for (let i = 0; i < length; i++) {
    // 霍纳法则计算hashCode

    // charCodeAt获取UTF16编码格式
    // 31就是我们霍纳法则的X,是我们选择的幂
    hashCode = 31 * hashCode + key.charCodeAt(i);
  }

  // 取模运算/取余运算
  const index = hashCode % max;
  return index;
}

// 测试哈希函数
console.log(hashFunc('abc', 7));
console.log(hashFunc('cba', 7));
console.log(hashFunc('nba', 7));
console.log(hashFunc('mba', 7));

// 需要注意的是,存放的字符串key不应该重复.重复没有啥意思。
console.log(hashFunc('aaa', 7));
console.log(hashFunc('bbb', 7));
