import type { RESOURCE } from "../../types";
import { BaseWorker } from "./BaseWorker";

export class Worker extends BaseWorker {
  production: {
    resource: RESOURCE;
    rate: number;
  };

  constructor(
    name: string,
    production: {
      resource: RESOURCE;
      rate: number;
    },
    numberOfWorkers: number,
    cost: {
      resource: RESOURCE;
      value: number;
    },
    description: string,
    icon: string,
    multiplier?: number,
    requirement?: () => boolean
  ) {
    super(name, numberOfWorkers, cost, description, icon, multiplier, requirement);
    this.production = {
      resource: production.resource,
      rate: production.rate,
    };
  }

  upgradeRate(multiplier: number): void {
    this.production.rate *= multiplier;
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
