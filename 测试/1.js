import b from "./2.js";

console.log('执行了a');

function a() { 
  console.log('执行a函数');
 }
console.log('执行了a');

setTimeout(() => {
  console.log('setTimeout中的a');
})

b()

export default a;

console.log('执行了a');

// "type": "module",
