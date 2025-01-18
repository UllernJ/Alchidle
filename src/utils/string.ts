export const convertNumToRoman = (num: number): string => {
  const romanNums = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  const arabicNums = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let roman = "";
  let i = arabicNums.length - 1;
  while (num > 0) {
    if (num >= arabicNums[i]) {
      roman += romanNums[i];
      num -= arabicNums[i];
    } else {
      i--;
    }
  }
  return roman;
};
