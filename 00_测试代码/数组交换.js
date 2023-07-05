let senArr = [100, 20, 34, 8];

// 第二个数组保存的是引用，然后把引用解构给第一个数组
[senArr[0], senArr[3]] = [senArr[3], senArr[0]];

console.log(senArr); //[ 8, 20, 34, 100 ]

