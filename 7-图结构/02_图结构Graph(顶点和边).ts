import { group, log } from 'console';

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

export {};
