import sequentSearch from './01_查找算法-顺序查找';
import binarySearch from './02_查找算法_二分查找';

const MAX_LENGTH = 1000000;
const nums = new Array(MAX_LENGTH).fill(0).map((_, index) => index);
const num = MAX_LENGTH / 2;

const startTime = performance.now();
// const startTime = new Date().getTime();
// const index = sequentSearch(nums, num);
const index = binarySearch(nums, num);
const endTime = performance.now();
// const endTime = new Date().getTime();

console.log('位置:', index, '消耗时间:', endTime - startTime);

export {};
