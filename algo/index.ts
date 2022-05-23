//! Find the Largest Sum
const solve = (intArray: number[], number: number) => {
  return;
};
console.log(solve([1, 2, 3, 4, 5], 3));

//! 2D Array of Integers With Square Root Dimensions

//   const arr = Array.from(Array(Math.sqrt(k)), () => new Array(Math.sqrt(k)));
//   let count = 1;

//   for (let i = 0; i < arr.length; i++) {
//     var inner = arr[i];

//     for (let j = 0; j < inner.length; j++) {
//       arr[i][j] = count;
//       count++;
//     }
//   }

//   return arr;
// };
// console.log(solve(9));

//! Find the Missing Number
// const solve = (intArray: number[]) => {
//   intArray.sort((a, b) => a - b);
//   const start = intArray[0];

//   const res = intArray.reduce((acc, num, idx) => {
//     if (acc != num) {
//       return acc;
//     }
//     acc++;
//     return acc;
//   }, start);

//   return res;
// };

// console.log(solve([5, 0, 2, 1, 3]));
//console.log(solve([-5, 0, -2, -1, -3]));

//! Remove Duplicated Strings
// const solve11 = (strArray: string[]) => {
//   let newArr = [];
//   let obj = {};

//   for (let str of strArray) {
//     obj[str] ? obj[str]++ : (obj[str] = 1);

//     if (obj[str] < 2) {
//       newArr.push(str);
//     }
//   }

//   return newArr;
// };

//console.log(solve11(["a", "b", "b", "a", "c", "d"]));
//console.log(solve11(["a", "b", "b", "Hello!", "c", "goodbye", "Hello!"]));

//! Find the First Duplicate
// const solve = (intArray: number[]) => {
//   let obj = {};

//   for (let x of intArray) {
//     obj[x] ? obj[x]++ : (obj[x] = 1);

//     if (obj[x] == 2) {
//       return x;
//     }
//   }
// };
//console.log(solve([6, 2, 5, 1, 0, 12, 2]));
//console.log(solve([-6, 1, 5, -6, 0, -2, 3]));
//console.log(solve([3, 1, 5, 1, 0, -2, 3, 5]));

//! Reverse Characters in a String
// const solve = (strArray: string) => {
//   const x = strArray.split(" ").map((s) => {
//     return s.split("").reverse().join("");
//   });
//   return x.join(", ");
// };

// console.log(solve("How are you?"));

//! Sum Each Digit of an Integer
// const solve = (intArg: number) => {
//   return intArg
//     .toString()
//     .split("")
//     .reduce((acc, n) => {
//       acc += parseInt(n);
//       return acc;
//     }, 0);
// };

// console.log(solve(6368206));

//! Array of Strings Without Special Characters
// todo
// const solve = (strArg: string) => {
//   const res = strArg.split(" ").map();
//   console.log(res);
// };

// console.log(solve("Hi, how are you; I was quite curious!"));

//! Strings of Anagrams
// todo
// const solve = (strArray: string[]) => {
//   const genObj = (word: string) => {
//     let obj = {};
//     word.split("").forEach((s) => {
//       s.toLowerCase();
//       if (obj[s]) {
//         obj[s]++;
//       } else {
//         obj[s] = 1;
//       }
//     });
//     return obj;
//   };

//   strArray.forEach((s) => {
//     s.split();
//   });

//   return;
// };
// console.log(solve(["act", "cat", "tac"]));

//! Find the Most Frequently Occurring Character
// const solve = (strArg: string, k: number) => {
//   let obj: Object = {};
//   strArg.split("").forEach((s) => {
//     if (obj[s]) {
//       obj[s]++;
//     } else {
//       obj[s] = 1;
//     }
//   });

//   for (let val in obj) {
//     if (obj[val] === k) {
//       return val;
//     }
//   }

//   return null;
// };

// console.log(solve("aaabbc", 2));

//! Character Appears Even Number of Times
// const solve = (strArg: string) => {
//   let obj = {
//     b: 0,
//   };

//   strArg.split("").forEach((key) => {
//     if (key in obj) {
//       obj[key]++;
//     } else {
//       obj[key] = 1;
//     }
//   });

//   for (let val in obj) {
//     if (obj[val] % 2 === 1) {
//       return false;
//     }
//   }
//   return true;
// };
// console.log(solve("aabbccdd"));

//! Merging Sorted Array of Integers
// const solve = (arrOne, arrTwo) => {
//   return [...arrOne, ...arrTwo].sort((a, b) => a - b);
// };
// console.log(solve([1, 10, 20], [2, 3, 15]));

//! Intersection of an Array
// const solve = (arrOne: number[], arrTwo: number[]) => {
//   let arr = [];
//   arrOne.forEach((a) => {
//     if (
//       arrTwo.some((b) => {
//         return a == b;
//       }) == true
//     ) {
//       arr.push(a);
//     }
//   });
//   return arr;
// };

// console.log(solve([1, -2, 3, -4, 5], [-4, -2]));

//! Create a Multiplication Table
// const solve = (n: number) => {
//   let arr: number[][] = [];

//   for (let i = 1; i <= n; i++) {
//     arr.push([]);
//     for (let j = 1; j <= n; j++) {
//       arr[i - 1].push(i * j);
//     }
//   }

//   return arr;
// };

// console.log(solve(4));

//! Pairs of Integers
// const solve = (arrayOne: number[], arrayTwo: number[], k: number) => {
//   for (let a of arrayOne) {
//     for (let b of arrayTwo) {
//       if (a + b === k) {
//         return [a, b];
//       }
//     }
//   }
// };

// const solve = (arrayOne: number[], arrayTwo: number[], k: number) => {
//   let result = [];
//   arrayOne.forEach((a) => {
//     arrayTwo.forEach((b) => {
//       if (a + b == k) {
//         result[0] = a;
//         result[1] = b;
//       }
//     });
//   });
//   return result;
// };

// console.log(solve([1, 2, 3], [4, 5, 6], 8));

//! Array of Integers
// const solve = (arrOne: number[], arrTwo: number[]) => {
//   const sum1 = arrOne.reduce((acc, n) => {
//     acc += n;
//     return acc;
//   }, 0);

//   const sum2 = arrTwo.reduce((acc, n) => {
//     acc += n;
//     return acc;
//   }, 0);

//   return sum1 == sum2;
// };

// console.log(solve([5, 7], [7, 1]));

//! Sum of Strings
// const solve = (strOne, strTwo) => {
//   return parseInt(strOne) + parseInt(strTwo);
// };
// console.log(solve("10", "20"));

//! Find Integer in Array
// const solve = (intArray, n) => {
//   return intArray[n];
// };
// console.log(solve([3, 0, -1, 8], 2));

//! Integers in Range of X,Y
// const solve = (intArray: number[], range: number[]) => {
//   return intArray.reduce((final, num) => {
//     if (num > range[0] && num < range[1]) {
//       final.push(num);
//     }
//     return final;
//   }, []);
// };
// console.log(solve([1, 2, 3, 5, 6, 7], [2, 6]));

// const solve = (intArray: number[], range: number[]) => {
//   return intArray.filter((n) => n > range[0] && n < range[1]);
// };
// console.log(solve([1, 2, 3, 5, 6, 7], [2, 6]));

//! Reverse List of Strings
// const solve = (strArray: string[]) => {
//   return strArray.reverse();
// };
// console.log(solve(["Cat", "Dog", "Skunk", "Bird"]));

//! Products of Integers in Array
// const solve = (intArray: number[], k: number) => {
//   return intArray.reduce((total, current) => {
//     if (current !== k) {
//       total *= current;
//     }
//     return total;
//   }, 1);
// };

// console.log(solve([1, 2, 3, 4, 5], 3));

// const solve = (intArray: number[], k: number) => {
//   let total = 1;

//   intArray.forEach((n) => {
//     if (n !== k) {
//       total *= n;
//     }
//   });
//   return total;
// };

// console.log(solve([1, 2, 3, 4, 5], 3));

//! Check if a String is a Palindrome
// const solve = (strArg: string) => {
//   return strArg.split("").reverse().join("") == strArg;
// };

// console.log(solve("ab ba"));

//! Movement of a Person Given an Array
// const solve = (directions) => {
//   return directions.reduce(
//     (point, direction) => {
//       switch (direction) {
//         case "up":
//           point[1] += 1;
//           break;
//         case "down":
//           point[1] -= 1;
//           break;
//         case "left":
//           point[0] -= 1;
//           break;
//         case "right":
//           point[0] += 1;
//           break;
//         default:
//           throw Error("invalid control");
//       }
//       return point;
//     },
//     [0, 0]
//   );
// };

// console.log(solve(["up", "up", "down", "left", "left", "right", "up"]));

// const solve = (directions) => {
//   let point = [0, 0];

//   directions.forEach((d) => {
//     switch (d) {
//       case "up":
//         point[1] += 1;
//         break;
//       case "down":
//         point[1] -= 1;
//         break;
//       case "left":
//         point[0] -= 1;
//         break;
//       case "right":
//         point[0] += 1;
//         break;
//       default:
//         throw Error("no such controller");
//     }
//   });

//   return point;
// };

// console.log(solve(["up", "up", "down", "left", "left", "right", "up"]));

//! Reversing an Array of Integers
// const solve = (intArray: number[]) => {
//   let arr = [];

//   for (let i = intArray.length - 1; i >= 0; i--) {
//     arr.push(intArray[i]);
//   }

//   return arr;
// };
// console.log(solve([1, 2, 3, 4, 5]));

// const solve = (strArray?: string[], strArg?: string) => {
//   return strArray.includes(strArg);
// };
// console.log(solve(["apple", "orange", "banana"], "orange"));

// const solve = (intArray: number[]) => {
//   return intArray.reverse();
// };
