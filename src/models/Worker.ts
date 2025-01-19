import { useResource } from "../composable/useResource";
import type { RESOURCE } from "../types";

export class Worker {
  name: string;
  rate: number;
  resource: RESOURCE;
  numberOfWorkers: number;
  cost: {
    resource: RESOURCE;
    value: number;
  };
  description: string;
  icon: string;
  requirement?: () => boolean;

  constructor(
    name: string,
    rate: number,
    resource: RESOURCE,
    numberOfWorkers: number,
    cost: {
      resource: RESOURCE;
      value: number;
    },
    description: string,
    icon: string,
    requirement?: () => boolean
  ) {
    this.name = name;
    this.rate = rate;
    this.resource = resource;
    this.numberOfWorkers = numberOfWorkers;
    this.cost = cost;
    this.description = description;
    this.icon = icon;
    this.requirement = requirement;
  }

   buy(): void {
    const { subtractResource } = useResource();
    subtractResource(this.cost.resource, this.cost.value);
    this.numberOfWorkers++;
    this.cost.value = Math.round(this.cost.value * 1.07);
  }

  upgradeRate(multiplier: number): void {
    this.rate *= multiplier;
  }

  restoreFromSave(numberOfWorkers: number): void {
    for (let i = 0; i < numberOfWorkers; i++) {
      this.cost.value = Math.round(this.cost.value * 1.07);
    }
  }
  getTotalPriceFromQuantity(quantity: number): number {
    let total = 0;
    let currentCost = this.cost.value;

    for (let i = 0; i < quantity; i++) {
      total += currentCost;
      currentCost = Math.round(currentCost * 1.07);
    }

    return total;
  }

  buyQuantity(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      this.buy();
    }
  }
}
