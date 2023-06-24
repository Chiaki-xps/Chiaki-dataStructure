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
    hashCode = 31 * hashCode + key.charCodeAt(i);
  }

  return -1;
}
