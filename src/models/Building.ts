import { useResource } from "../composable/useResource";
import type { RESOURCE } from "../types";
import { BigNumber } from "./BigNumber";

type Cost = {
  key: RESOURCE;
  value: BigNumber;
};

export class Building {
  name: string;
  cost: Cost[];
  costMultiplier: number;
  description: string;
  effect: () => void;
  quantity: number;
  icon?: string;
  requirement?: () => boolean;

  constructor(
    name: string,
    cost: Cost[],
    costMultiplier: number,
    description: string,
    effect: () => void,
    quantity: number,
    icon?: string,
    requirement?: () => boolean
  ) {
    this.name = name;
    this.cost = cost;
    this.costMultiplier = costMultiplier;
    this.description = description;
    this.effect = effect;
    this.quantity = quantity;
    this.icon = icon;
    this.requirement = requirement;
  }

  canAfford() {
    const { canAfford } = useResource();
    return this.cost.every((cost) => canAfford(cost.key, cost.value));
  }

  upgrade() {
    const { subtractResource } = useResource();
    if (!this.canAfford()) return;
    this.cost.forEach((cost) => {
      subtractResource(cost.key, cost.value);
    });
    this.quantity += 1;
    this.cost.forEach((cost) => {
      cost.value.multiplyBigNumber(BigNumber.fromString(this.costMultiplier.toString()));
    });
    this.effect();
  }

  buy(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.upgrade();
    }
  }

  restoreFromSave(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.cost.forEach((cost) => {
        cost.value.multiplyBigNumber(BigNumber.fromString(this.costMultiplier.toString()));
      });
      this.effect();
    }
    this.quantity = quantity;
  }
}
