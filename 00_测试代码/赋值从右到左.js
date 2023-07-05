var a = {n: 1}
a.x = a = {n: 2}
console.log(a.x); // undefined

// 因为赋值是从右到左