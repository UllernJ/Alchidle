import Decimal from "break_eternity.js";
import { useResource } from "../../composable/useResource";
import type { RESOURCE } from "../../types";

export class BaseWorker {
  name: string;
  numberOfWorkers: Decimal;
  cost: {
    resource: RESOURCE;
    value: Decimal;
    multiplier: number;
  };
  description: string;
  icon: string;
  multiplier: number;
  requirement?: () => boolean;

  constructor(
    name: string,
    cost: {
      resource: RESOURCE;
      value: Decimal;
    },
    description: string,
    icon: string,
    multiplier: number,
    requirement?: () => boolean
  ) {
    this.name = name;
    this.numberOfWorkers = new Decimal(0);
    this.cost = { ...cost, multiplier: 1 };
    this.description = description;
    this.icon = icon;
    this.multiplier = multiplier;
    this.requirement = requirement;
  }
  buy() {
    const { subtractResource } = useResource();
    subtractResource(this.cost.resource, this.cost.value);
    this.numberOfWorkers = this.numberOfWorkers.plus(1);
    this.cost.value = this.cost.value
      .times(this.multiplier)
      .times(this.cost.multiplier);
  }

  restoreFromSave(numberOfWorkers: Decimal) {
    this.numberOfWorkers = numberOfWorkers;
    if (this.numberOfWorkers.greaterThan(0)) {
      for (let i = 0; i < this.numberOfWorkers.toNumber(); i++) {
        this.cost.value = this.cost.value
          .times(this.multiplier)
          .times(this.cost.multiplier);
      }
    }
  }
  getTotalPriceFromQuantity(quantity: number): Decimal {
    let total = new Decimal(0);
    let currentCost = this.cost.value;

    for (let i = 0; i < quantity; i++) {
      total = total.add(currentCost);
      currentCost = currentCost
        .times(this.multiplier)
        .times(this.cost.multiplier);
    }

    return total;
  }

  buyQuantity(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      this.buy();
    }
  }

  decreasePriceMultiplier(multiplier: number): void {
    this.cost.multiplier = this.cost.multiplier / multiplier;
  }
}
