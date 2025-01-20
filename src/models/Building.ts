import { useResource } from "../composable/useResource";
import type { RESOURCE } from "../types";

type Cost = {
  key: RESOURCE;
  value: number;
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
    const { resources } = useResource();
    return this.cost.every((cost) => resources[cost.key].value >= cost.value);
  }

  upgrade() {
    const { subtractResource } = useResource();
    if (!this.canAfford()) return;
    this.cost.forEach((cost) => {
      subtractResource(cost.key, cost.value);
    });
    this.quantity += 1;
    this.cost.forEach((cost) => {
      cost.value = Math.round(cost.value * this.costMultiplier);
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
        cost.value = Math.round(cost.value * this.costMultiplier);
      });
      this.effect();
    }
    this.quantity = quantity;
  }

  getTotalPriceForQuantity(quantity: number | "MAX") {
    const { resources } = useResource();
    const totalCost: Cost[] = this.cost.map((cost) => ({
      key: cost.key,
      value: 0,
    }));

    const currentCost = this.cost.map((cost) => ({ ...cost }));
    const totalQuantity = quantity === "MAX" ? Infinity : quantity;

    for (let i = 0; i < totalQuantity; i++) {
      if (quantity === "MAX") {
        const canAfford = currentCost.every(
          (cost) => resources[cost.key].value >= cost.value
        );
        if (!canAfford) break;
      }

      totalCost.forEach((total, index) => {
        total.value += currentCost[index].value;
        currentCost[index].value = Math.round(
          currentCost[index].value * this.costMultiplier
        );
      });
    }

    return totalCost;
  }
}
