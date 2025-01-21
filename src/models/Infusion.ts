export class Infusion {
  name: string;
  cost: number;
  contribution: number;
  effect: () => void;
  level: number;
  unlocked?: boolean;
  workersAllocated: number;
  description: string;

  constructor(
    name: string,
    cost: number,
    contribution: number,
    effect: () => void,
    level: number,
    description: string
  ) {
    this.name = name;
    this.cost = cost;
    this.contribution = contribution;
    this.effect = effect;
    this.level = level;
    this.workersAllocated = 0;
    this.description = description;
  }

  contribute(amount: number) {
    this.contribution += amount;
    if (this.contribution >= this.cost) {
      this.effect();
      this.level++;
      this.contribution = 0;
      this.cost *= 1.5;
    }
  }
}
