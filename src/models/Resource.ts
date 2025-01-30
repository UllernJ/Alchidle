import Decimal from "break_eternity.js";

export class Resource {
  name: string;
  amount: Decimal;
  maxAmount: Decimal;

  constructor(name: string) {
    this.name = name;
    this.amount = new Decimal(0);
    this.maxAmount = new Decimal(200);
  }

  add(amount: Decimal) {
    this.amount = this.amount.add(amount);
    if (this.amount.greaterThan(this.maxAmount)) {
      this.amount = this.maxAmount;
    }
  }

  subtract(amount: Decimal) {
    this.amount = this.amount.sub(amount);
    if (this.amount.lessThan(0)) {
      this.amount = new Decimal(0);
    }
  }

  upgradeStorage() {
    this.maxAmount = this.maxAmount.times(2);
  }
}
