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
    const newAmount = this.amount.plus(amount).min(this.maxAmount);
    if (newAmount.eq(this.amount)) return;
    this.amount = newAmount;
  }

  subtract(amount: Decimal) {
    if (!this.amount.lessThan(amount)) {
      this.amount = this.amount.sub(amount);
    }
  }

  upgradeStorage(multiplier = 2) {
    this.maxAmount = this.maxAmount.times(multiplier);
  }

  reset() {
    this.amount = new Decimal(0);
    this.maxAmount = new Decimal(200);
  }
}
