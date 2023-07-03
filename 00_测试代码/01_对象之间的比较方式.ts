// class Person {
//   name: string;
//   age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }

// // 创建Person对象
// const p1 = new Person('why', 10);
// const p2 = new Person('kobe', 31);

// // 一般情况下对象之间是不能比较的
// console.log(p1 === p2); // false
// console.log(p1 >= p2); // false
// console.log(p1 <= p2); // false

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // js对象中的valueOf()和toString()方法类似，当需要返回对象的基本类型的时候，自动调用，默认返回对象本身，
  // 当我们使用 > < 计算 的时候就会调用到这个方法
  // 使用=== 的时候不会调用
  valueOf() {
    return this.age;
  }
}

// 创建Person对象
const p1 = new Person('why', 10);
const p2 = new Person('kobe', 31);
const p3 = new Person('james', 26);
const p4 = new Person('curry', 26);

// 当我们使用 > < 计算 的时候就会调用到这个方法valueOf
console.log(p1 < p2); // true
console.log(p2 < p3); // false
console.log(p2 > p3); // true

// 使用===要求相同的对象，p3和p4不是相同对象，所以还是false，不会调用valueOf
console.log(p3 === p4); // false
