class HashTable<T = any> {
  // 定义属性
  // storage 储存 创建一个数组,用来存放链地址法中的链(数组)
  // [string, T] 是一个元组类型，特点就是限制数组元素个数和类型，这里意味着数组长度为2.数组第一项为string类型，第二项T
  private storage: [string, T][][] = [];
  // 定义数组的长度
  private length: number = 7;
  // 记录元素已经存放的个数， count / length = loadFactor > 0.75的时候需要增加数组长度，且对所有已保存的数据再hash
  private count: number = 0;
}

const hashTable = new HashTable();

export default HashTable;
