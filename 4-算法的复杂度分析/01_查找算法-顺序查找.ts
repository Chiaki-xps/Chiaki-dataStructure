function sequentSearch(array: number[], num: number) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const item = array[i];
    if (item === num) {
      return i;
    }
  }
  return -1;
}

const index = sequentSearch([1, 3, 5, 10, 100, 222, 333], 222);
console.log(index);

export default sequentSearch;
