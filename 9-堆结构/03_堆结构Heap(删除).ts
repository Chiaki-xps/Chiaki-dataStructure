class Heap<T> {
  // 属性
  data: T[] = [];
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
   *    + 循环结束的条件。index <= 0
   *    + 上滤的最多执行的次数为O(log n)
   *
   */
  insert(value: T) {
    // 1. 将元素放到数组的尾部
    this.data.push(value);
    this.length++;

    // 2. 维护最大堆的特性（最后位置的元素需要执行上滤操作）
    this.heapify_up();
  }

  // 上滤
  private heapify_up() {
    let index = this.length - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] <= this.data[parentIndex]) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // 提取操作
  extract(): T | undefined {
    // 1. 判断元素的个数为0或者1的情况
    if (this.length === 0) return undefined;

    if (this.length === 1) {
      this.length--;
      return this.data.pop();
    }

    // 2. data至少两个，提取返回最大值
    const topValue = this.data[0];
    this.data[0] = this.data.pop()!;
    this.length--;

    this.heapify_down();

    return topValue;
  }

  private heapify_down() {
    // 3. 维护最大堆进行下滤操作
    // 3.1 定义我们的索引位置
    let index = 0;

    while (2 * index + 1 < this.length) {
      // 3.2 找到我们的左右子节点
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;

      let largerIndex = leftChildIndex;

      // 3.3 找到左右子节点较大的值
      if (
        rightChildIndex < this.length &&
        this.data[rightChildIndex] > this.data[leftChildIndex]
      ) {
        largerIndex = rightChildIndex;
      }

      // 3.4 较大的值和index位置比较
      if (this.data[index] >= this.data[largerIndex]) {
        break;
      }

      // 3.5 交换位置
      this.swap(index, largerIndex);
      index = largerIndex;
    }
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

const arr = [19, 100, 26, 17, 3, 25, 1, 2, 7];
const heap = new Heap();
for (const item of arr) {
  heap.insert(item);
}

console.log(heap.data);
while (!heap.isEmpty()) {
  console.log(heap.extract());
}

// 下滤操作时间复杂度为O(log n)

export {};
