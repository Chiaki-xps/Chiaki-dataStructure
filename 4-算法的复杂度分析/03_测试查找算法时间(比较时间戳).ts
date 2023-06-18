import sequentSearch from './01_查找算法-顺序查找';
import binarySearch from './02_查找算法_二分查找';

// const MAX_LENGTH = 10000000;
const MAX_LENGTH = 10000000;
const nums = new Array(MAX_LENGTH).fill(0).map((_, index) => index);
const num = MAX_LENGTH / 2;

// 计算时间的方式：
// 1. 使用performance.now()时间戳计算
const startTime = performance.now();

// 2. 使用newDate().getTime()
// const startTime = new Date().getTime();

// 3. 使用console.time开始计时，timeEnd结束计时
console.time();

const index = sequentSearch(nums, num);
// const index = binarySearch(nums, num);

const endTime = performance.now();
// const endTime = new Date().getTime();

console.timeEnd();

console.log('位置:', index, '消耗时间:', endTime - startTime);

export {};
