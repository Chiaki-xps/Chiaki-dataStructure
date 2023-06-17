import ArrayQueue from './01_实现队列结构Queue';

function lastRemaining(n: number, m: number) {
  // 1. 创建队列结构
  const queue = new ArrayQueue<number>();

  // 2. 将所有的数字加入到队列中
  for (let i = 0; i < n; i++) {
    queue.enqueue(i);
  }

  // 3. 判断队列中是否还有数字
  while (queue.size() > 1) {
    // 从1开始数
    for (let i = 1; i < m; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }

  return queue.dequeue()!;
}

console.log(lastRemaining(5, 3)); // 3

console.log(lastRemaining(10, 17)); // 2

// 待定: 动态规划的解法
