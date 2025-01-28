export class BigNumber {
  numbers: number[];

  private constructor(numbers: number[]) {
    this.numbers = numbers;
    return this;
  }

  static new() {
    return new BigNumber([0]);
  }

  static fromString(str: string) {
    str = str.replace(/\D/g, "").replace(/^0+/, "");

    if (str === "") {
      return new BigNumber([0]);
    }
    const numbers: number[] = [];
    for (let i = str.length; i > 0; i -= 3) {
      const chunk = str.substring(Math.max(0, i - 3), i);
      numbers.push(parseInt(chunk, 10));
    }

    return new BigNumber(numbers);
  }

  add(num: number[]) {
    let carry = 0;
    let i = 0;

    while (i < num.length || carry) {
      if (i === this.numbers.length) {
        this.numbers.push(0);
      }
      const sum = this.numbers[i] + (num[i] || 0) + carry;
      this.numbers[i] = sum % 1000;
      carry = Math.floor(sum / 1000);
      i++;
    }
  }

  subtract(num: number[]) {
    let borrow = 0;
    let i = 0;

    while (i < num.length || borrow) {
      if (i === this.numbers.length) {
        this.numbers.push(0);
      }

      let diff = (this.numbers[i] || 0) - (num[i] || 0) - borrow;

      if (diff < 0) {
        diff += 1000;
        borrow = 1;
      } else {
        borrow = 0;
      }

      this.numbers[i] = diff;
      i++;
    }

    while (
      this.numbers.length > 1 &&
      this.numbers[this.numbers.length - 1] === 0
    ) {
      this.numbers.pop();
    }
    return this;
  }

  addBigNumber(other: BigNumber) {
    let carry = 0;
    let i = 0;

    while (i < other.numbers.length || carry) {
      if (i === this.numbers.length) {
        this.numbers.push(0);
      }
      const sum = this.numbers[i] + (other.numbers[i] || 0) + carry;
      this.numbers[i] = sum % 1000;
      carry = Math.floor(sum / 1000);
      i++;
    }
    return this;
  }

  subtractBigNumber(other: BigNumber) {
    let borrow = 0;
    let i = 0;

    while (i < other.numbers.length || borrow) {
      if (i === this.numbers.length) {
        this.numbers.push(0);
      }

      let diff = (this.numbers[i] || 0) - (other.numbers[i] || 0) - borrow;

      if (diff < 0) {
        diff += 1000;
        borrow = 1;
      } else {
        borrow = 0;
      }

      this.numbers[i] = diff;
      i++;
    }

    while (
      this.numbers.length > 1 &&
      this.numbers[this.numbers.length - 1] === 0
    ) {
      this.numbers.pop();
    }
  }

  multiplyBigNumber(other: BigNumber) {
    const result = new Array(this.numbers.length + other.numbers.length).fill(
      0
    );

    for (let i = 0; i < this.numbers.length; i++) {
      let carry = 0;

      for (let j = 0; j < other.numbers.length || carry; j++) {
        const prod =
          (this.numbers[i] || 0) * (other.numbers[j] || 0) +
          (result[i + j] || 0) +
          carry;
        result[i + j] = prod % 1000;
        carry = Math.floor(prod / 1000);
      }
    }

    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }

    this.numbers = result;
    return this;
  }

getPercentageOf(other: BigNumber): number {
  const scaled = new BigNumber([...this.numbers]);
  scaled.multiplyBigNumber(new BigNumber([100]));
  const { quotient } = scaled.divideBigNumber(other);

  // Convert the quotient to a floating-point number
  return parseFloat(quotient.toString());
}

  divideBigNumber(other: BigNumber): {
    quotient: BigNumber;
    remainder: BigNumber;
  } {
    // Handle division by zero
    if (other.numbers.every((num) => num === 0)) {
      throw new Error("Division by zero");
    }
  
    // Initialize quotient and remainder
    const quotient = new BigNumber([0]);
    let remainder = new BigNumber([0]);
  
    // Iterate through each chunk of the dividend
    for (let i = this.numbers.length - 1; i >= 0; i--) {
      // Shift the remainder left by 3 digits (equivalent to multiplying by 1000)
      remainder.numbers.unshift(this.numbers[i]);
      remainder.numbers = remainder.numbers.filter((chunk) => chunk !== 0);
  
      // Perform division on the current remainder
      let quotientChunk = 0;
      while (remainder.compare(other) >= 0) {
        remainder = remainder.subtract(other.numbers);
        quotientChunk++;
      }
  
      // Append the quotient chunk to the result
      quotient.numbers.unshift(quotientChunk);
    }
  
    // Remove leading zeros from the quotient
    while (quotient.numbers.length > 1 && quotient.numbers[quotient.numbers.length - 1] === 0) {
      quotient.numbers.pop();
    }
    return {
      quotient,
      remainder,
    };
  }

  compare(num: BigNumber) {
    if (this.numbers.length > num.numbers.length) {
      return 1;
    }

    if (this.numbers.length < num.numbers.length) {
      return -1;
    }

    for (let i = this.numbers.length - 1; i >= 0; i--) {
      if (this.numbers[i] > num.numbers[i]) {
        return 1;
      }

      if (this.numbers[i] < num.numbers[i]) {
        return -1;
      }
    }

    return 0;
  }

  toString() {
    if (this.numbers.every((num) => num === 0)) {
      return "0";
    }
    while (
      this.numbers.length > 1 &&
      this.numbers[this.numbers.length - 1] === 0
    ) {
      this.numbers.pop();
    }

    const str = this.numbers
      .map((chunk) => chunk.toString().padStart(3, "0"))
      .reverse()
      .join("");

    return str.replace(/^0+/, "");
  }
}
