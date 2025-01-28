import { useMonsters } from "../../composable/useMonsters";
import { convertNumToRoman } from "../../utils/string";
import type { BigNumber } from "../BigNumber";
import { Research } from "./Research";
import type { RESEARCH_INTERVAL } from "./ResearchInterval";

export class UpgradeableResearch extends Research {
  multiplier: number;
  level: number;
  interval: RESEARCH_INTERVAL;

  constructor(
    name: string,
    description: string,
    cost: BigNumber,
    requirement: () => boolean,
    multiplier: number,
    interval: RESEARCH_INTERVAL,
    effect?: () => void
  ) {
    super(name, description, cost, requirement, effect);
    this.multiplier = multiplier;
    this.level = 0;
    this.interval = interval;
  }

  override unlock() {
    if (!this.canAfford()) {
      return;
    }
    super.unlock();
    this.unlocked = false;
    this.level++;
    this.cost.multiply([this.multiplier]);
    this.setNextRequirement();
  }

  override getName(): string {
    return `${this.name} ${convertNumToRoman(this.level + 1)}`;
  }

  setNextRequirement() {
    if (this.level === 0) {
      return;
    }
    const { map } = useMonsters();
    this.requirement = () =>  map.value >= this.interval * (this.level + 1);
  }

}