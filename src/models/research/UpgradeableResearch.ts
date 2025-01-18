import { convertNumToRoman } from "../../utils/string";
import { Research } from "./Research";

export class UpgradeableResearch extends Research {
  multiplier: number;
  level: number;

  constructor(
    name: string,
    description: string,
    cost: number,
    requirement: () => boolean,
    multiplier: number,
    effect?: () => void
  ) {
    super(name, description, cost, requirement, effect);
    this.multiplier = multiplier;
    this.level = 0;
  }

  override unlock() {
    if (!this.canAfford()) {
      return;
    }
    super.unlock();
    this.unlocked = false;
    this.level++;
    this.cost = Math.round(this.cost * this.multiplier);
  }

  override getName(): string {
    return `${this.name} ${convertNumToRoman(this.level + 1)}`;
  }
}