import { useResource } from "@/composable/useResource";
import { RESOURCE } from "@/types";
import Decimal from "break_eternity.js";

export abstract class Gear {
  name: string;
  cost: Decimal;
  quantity: Decimal;
  path?: string;
  multiplier: number = 1.15;

  constructor(name: string, cost: Decimal, quantity: Decimal, path?: string) {
    this.name = name;
    this.cost = cost;
    this.quantity = quantity;
    this.path = path;
  }

  protected getTotalPrice(quantity: number): Decimal {
    let total = new Decimal(0);
    let currentCost = this.cost;

    for (let i = 0; i < quantity; i++) {
      total = total.add(currentCost);
      currentCost = currentCost.times(this.multiplier);
    }

    return total;
  }

  buy(quantity: number): boolean {
    const { subtractResource, miningAmount } = useResource();

    const totalCost = this.getTotalPrice(quantity);

    if (miningAmount.value.gte(totalCost)) {
      subtractResource(RESOURCE.MINING, totalCost);
      this.quantity = this.quantity.plus(quantity);
      for (let i = 0; i < quantity; i++) {
        this.cost = this.cost.times(this.multiplier);
      }
      return true;
    }
    return false;
  }

  decreaseCost(multiplier: Decimal) {
    this.cost = this.cost.times(multiplier);
  }

  abstract upgrade(multiplier: number): void;
}
