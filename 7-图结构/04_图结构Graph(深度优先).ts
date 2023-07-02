class Graph<T> {
  // 顶点
  private vertexes: T[] = [];
  // 边：邻接表
  private adjList: Map<T, T[]> = new Map();

  /** 添加顶点和边的方法 */
  addVertex(vertex: T) {
    // 将顶点添加数组中保存
    this.vertexes.push(vertex);
    // 创建一个邻接表中的数组
    this.adjList.set(vertex, []);
  }

  // 采用邻接表的设计
  // 边是无向的，所以给两个顶点建立边的时候，需要给两个顶点的数组都把对方加入进去
  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v1);
  }

  // 遍历
  traverse() {
    console.log('Graph: ');
    this.vertexes.forEach((vertex) => {
      const edges = this.adjList.get(vertex);
      console.log(`${vertex} -> ${edges?.join(' ')}`);
    });
  }

  /**
   * 设计思路:
   */
  bfs() {
    // 1. 判断是否有顶点
    if (this.vertexes.length === 0) return;

    // 2. 创建队列结访问每一个顶点
    const queue: T[] = [];
    queue.push(this.vertexes[0]);

    // 3. 创建Set结构，记录某一个顶点是否被访问过
    const visited = new Set<T>();
    visited.add(this.vertexes[0]);

    // 4. 遍历队列中每个顶点
    while (queue.length) {
      // 访问队列中第一个顶点
      const vertex = queue.shift()!;
      console.log(vertex);

      //相邻的顶点
      const neighbors = this.adjList.get(vertex);

      if (!neighbors) continue;
      for (const nei of neighbors) {
        if (!visited.has(nei)) {
          visited.add(nei);
          queue.push(nei);
        }
      }
    }
  }

  // 下面是coderwhy的代码，有问题
  // dfs() {
  //   // 1. 判断有没有顶点，没有直接返回
  //   if (this.vertexes.length === 0) return;

  //   // 2. 创建栈结构
  //   const stack: T[] = [];
  //   stack.push(this.vertexes[0]);

  //   // 3. 创建Set结构
  //   const visited = new Set<T>();
  //   visited.add(this.vertexes[0]);

  //   // 4. 从第一个顶点开始访问
  //   while (stack.length) {
  //     const vertex = stack.pop()!;
  //     console.log(vertex);

  //     const neighbors = this.adjList.get(vertex);

  //     // 下面这句话用来类型缩小，告诉ts下面的代码neighbors存在
  //     if (!neighbors) return;
  //     for (let i = neighbors.length - 1; i >= 0; i--) {
  //       const nei = neighbors[i];

  //       if (!visited.has(nei)) {
  //         visited.add(nei);
  //         stack.push(nei);
  //       }
  //     }
  //   }
  // }

  // 我自己的解决思路
  dfs() {
    // 1. 判断有没有顶点，没有直接返回
    if (this.vertexes.length === 0) return;
    // 2. 创建栈结构
    const stack: T[] = [];
    stack.push(this.vertexes[0]);
    // 3. 创建Set结构
    const visited = new Set<T>();
    visited.add(this.vertexes[0]);

    // 4. 从第一个顶点开始访问
    while (stack.length) {
      const vertex = stack.pop()!;
      console.log(vertex);
      visited.add(vertex);
      console.log(visited);

      const neighbors = this.adjList.get(vertex);

      // 下面这句话用来类型缩小，告诉ts下面的代码neighbors存在
      if (!neighbors) return;
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const nei = neighbors[i];

        if (!visited.has(nei) && !stack.includes(nei)) {
          stack.push(nei);
        }
      }
    }
  }
}

const graph = new Graph();
// 添加A～I
for (let i = 65; i < 74; i++) {
  graph.addVertex(String.fromCharCode(i));
}
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('H');
// graph.addVertex('I');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

graph.traverse();
// graph.bfs();
graph.dfs();

export {};
