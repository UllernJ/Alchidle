import { ref } from "vue";
import { usePlayer } from "../composable/usePlayer";

export class Infusion {
  name: string;
  cost: number;
  contribution: number;
  effect: () => void;
  level: number;
  unlocked?: boolean;
  workersAllocated: number;

  constructor(
    name: string,
    cost: number,
    contribution: number,
    effect: () => void,
    level: number
  ) {
    this.name = name;
    this.cost = cost;
    this.contribution = contribution;
    this.effect = effect;
    this.level = level;
    this.workersAllocated = 0;
  }

  contribute(amount: number) {
    this.contribution += amount;
    if (this.contribution >= this.cost) {
      this.effect();
      this.level++;
      this.contribution = 0;
      this.cost *= 1.07;
    }
  }
}

const { upgradeAttackPower, upgradeDefensePower } = usePlayer();

const infusePower = new Infusion(
  "Power Infusion",
  100,
  0,
  () => {
    upgradeAttackPower();
  },
  1
);

const infuseDefense = new Infusion(
  "Defense Infusion",
  100,
  0,
  () => {
    upgradeDefensePower();
  },
  1
);

export const getInfusions = () => {
  return ref([infusePower, infuseDefense]);
};
