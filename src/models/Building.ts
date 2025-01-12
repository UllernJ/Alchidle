import { useResource } from "../composable/useResource";
import type { RESOURCE } from "../types";

type Cost = {
  key: RESOURCE;
  value: number;
};

export class Building {
  name: string;
  cost: Cost[];
  description: string;
  effect: () => void;
  quantity: number;
  icon?: string;
  requirement?: () => boolean;

  constructor(
    name: string,
    cost: Cost[],
    description: string,
    effect: () => void,
    quantity: number,
    icon?: string,
    requirement?: () => boolean
  ) {
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.effect = effect;
    this.quantity = quantity;
    this.icon = icon;
    this.requirement = requirement;
  }

  upgrade() {
    const { subtractResource } = useResource();
    this.cost.forEach((cost) => {
      subtractResource(cost.key, cost.value);
    });
    this.quantity += 1;
    this.cost.forEach((cost) => {
      cost.value = Math.round(cost.value * 1.07);
    });
    this.effect();
  }
}
