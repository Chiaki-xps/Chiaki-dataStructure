class HashTable<T = any> {
  // 定义属性
  // storage 储存 创建一个数组,用来存放链地址法中的链(数组)
  // [string, T] 是一个元组类型，特点就是限制数组元素个数和类型，这里意味着数组长度为2.数组第一项为string类型，第二项T
  storage: [string, T][][] = [];
  // 定义数组的长度
  private length: number = 7;
  // 记录元素已经存放的个数， count / length = loadFactor > 0.75的时候需要增加数组长度，且对所有已保存的数据再hash
  private count: number = 0;

  private hashFunc(key: string, max: number) {
    let hashCode = 0;
    const length = key.length;
    for (let i = 0; i < length; i++) {
      hashCode = 31 * hashCode + key.charCodeAt(i);
    }
    const index = hashCode % max;
    return index;
  }

  isPrime(num: number): boolean {
    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  private getNextPrime(num: number) {
    let newPrime = num;
    while (!this.isPrime(newPrime)) {
      newPrime++;
    }
    return newPrime;
  }

  private resize(newLength: number) {
    // 设置新的长度
    const newPrime = this.getNextPrime(newLength);
    console.log('获取到容量的质数:', newPrime);
    this.length = newPrime;

    // 获取到原来所有的数据,并且重新放入到新的容量数组中
    // 1. 对数据进行初始化操作
    const oldStorage = this.storage;
    this.storage = [];
    this.count = 0;

    // 2. 获取原来的数据，放入新的数组中
    oldStorage.forEach((bucket) => {
      if (!bucket) return;

      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }

  // 插入/修改
  put(key: string, value: T) {
    // 1. 根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 取出索引值对应位置的数组（一般我们称之为桶，bucket）
    let bucket = this.storage[index];

    // 3. 判断bucket是否有值
    // 初始阶段，storage每一项都是undefined，
    // 所以bucket一开始得到的是undefined
    if (!bucket) {
      bucket = [];
      // storage保存bucket索引
      this.storage[index] = bucket;
    }

    // 4. 确定已经有一个数组了，但是数组中是否已经存在key是不确定的
    let isUpdate = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        // 覆盖操作
        tuple[1] = value;
        isUpdate = true;
      }
    }

    // 5. 如果上面的代码没有进行覆盖，那么该位置进行添加
    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;

      // 发现loadFactor比例大于0.75,那么直接扩容
      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  // 获取值
  get(key: string): T | undefined {
    // 1. 根据key获取索引值index
    const index = this.hashFunc(key, this.length);

    // 2. 获取bucket(桶)
    const bucket = this.storage[index];

    if (!bucket) return undefined;

    // 3. 对bucket进行遍历
    // 只要我们的装填因子小于0.75，一般情况下，bucket里的数据并不多，遍历的性能消耗也不会太大
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        return tupleValue;
      }
    }

    return undefined;
  }

  // 删除操作
  delete(key: string): T | undefined {
    // 1. 获取索引值的位置
    const index = this.hashFunc(key, this.length);

    // 2. 获取bucket(桶)
    const bucket = this.storage[index];

    if (!bucket) return undefined;

    // 3. 遍历桶数组
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        // splice会对原数组进行删除和增加操作,
        // splice(起始位置, 删除位置, 新增元素)
        // 新增元素也是从起始位置开始
        const arr = bucket.splice(i, 1);
        this.count--;

        // 如果loadFactor小于0.25，缩容操作
        // 缩容操作后，有些已经保存的storage会变回空数组，但不会变回undefined
        const loadFactor = this.count / this.length;
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }
        return tupleValue;
      }
    }

    return undefined;
  }
}

const hashTable = new HashTable();
hashTable.put('aaa', 100);
hashTable.put('aaa', 200);
hashTable.put('bbb', 300);
hashTable.put('ccc', 400);
hashTable.put('abc', 111);
hashTable.put('cba', 222);

// console.log(hashTable.storage);

hashTable.put('nba', 333);
hashTable.put('mba', 444);
// console.log(hashTable.storage);

hashTable.delete('nba');
hashTable.delete('mba');
hashTable.delete('cba');
hashTable.delete('abc');
hashTable.delete('aaa');
// console.log(hashTable.storage);

// 关于打印结果不固定的问题：
// 一开始我们的storage是空数组，长度为0，只有我们的出现index为设置的哈希表设置的最大长度，例如一开始设置的是7，这时候数组的长度才有7.
// 极端情况下，存放10个数据，都是在index为0的情况下，扩容后设置的长度变成两倍，但是打印我们的哈希表，显示的数组长度仍然可能是1。
// 所以扩容的操作虽然会影响哈希表的长度，但不一定会有改变。

export default HashTable;
