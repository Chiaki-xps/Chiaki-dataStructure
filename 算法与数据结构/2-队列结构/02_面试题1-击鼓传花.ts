import ArrayQueue from './01_实现队列结构Queue';

function hotPotato(names: string[], num: number) {
  if (names.length === 0) return -1;
  // 1. 创建队列结构
  const queue = new ArrayQueue<string>();

  // 2. 将所有的name入队操作
  for (const name of names) {
    queue.enqueue(name);
  }

  // 3. 淘汰规则
  while (queue.size() > 1) {
    // 不淘汰
    for (let i = 1; i < num; i++) {
      const name = queue.dequeue();
      if (name) queue.enqueue(name);
    }

    // 淘汰
    queue.dequeue();
  }

  // !表示取反，表示类型推断排除null、undefined类型。
  const leftName = queue.dequeue()!;
  const index = names.indexOf(leftName);
  // 返回最后留下的人的索引(位置)
  return index;
}

const leftIndex = hotPotato(['why', 'james', 'kobe', 'curry'], 3);

console.log(leftIndex);
