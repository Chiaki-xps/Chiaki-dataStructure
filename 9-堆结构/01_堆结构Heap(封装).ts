class Heap<T> {
  // 属性
  private data: T[] = [];
  private length: number = 0;

  // 私有工具方法
  // 交换两个节点的位置
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  // 方法

  /**
   * 插入元素：
   * 1. data.push(value)插入新元素到最后
   * 2. 进行上滤操作
   *    + 新元素的位置length-1 与 父节点 位置 Math.floor( (新元素索引 -1) / 2 ) 比较
   *    + 新元素比父元素小或等于，跳出循环break
   *    + 大于父元素，执行swap，新元素的索引修改为父元素的索引。重复循环
   *    + 循环结束的条件。index < 0
   *    + 上滤的最多执行的次数为O(log n)
   *
   */
  insert(value: T) {}

  extract(): T | undefined {
    return undefined;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  buildHeap(arr: T[]) {}
}

export {};
