let senArr: number[] = [100, 20, 34, 8];

[senArr[0], senArr[3]] = [senArr[3], senArr[0]];

console.log(senArr); //[ 8, 20, 34, 100 ]

export {};
