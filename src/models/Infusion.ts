import Decimal from "break_eternity.js";

export class Infusion {
  name: string;
  cost: Decimal;
  contribution: Decimal;
  effect: () => void;
  level: Decimal;
  unlocked?: boolean;
  workersAllocated: Decimal;
  description: string;

  constructor(
    name: string,
    cost: Decimal,
    contribution: Decimal,
    effect: () => void,
    level: Decimal,
    description: string
  ) {
    this.name = name;
    this.cost = cost;
    this.contribution = contribution;
    this.effect = effect;
    this.level = level;
    this.workersAllocated = new Decimal(0);
    this.description = description;
  }

  contribute(amount: Decimal) {
    this.contribution = this.contribution.add(amount);
    if (this.contribution.greaterThanOrEqualTo(this.cost)) {
      this.effect();
      this.level = this.level.add(1);
      this.contribution = new Decimal(0);
      this.cost = this.cost.times(1.5).round();
    }
  }

  allocateWorkers(amount: number) {
    this.workersAllocated = this.workersAllocated.add(amount);
  }
  deallocateWorkers(amount: number) {
    this.workersAllocated = this.workersAllocated.sub(amount);
  }
}
