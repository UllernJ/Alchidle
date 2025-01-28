import { useResource } from "../../composable/useResource";
import type { RESOURCE } from "../../types";
import { BigNumber } from "../BigNumber";

export class BaseWorker {
  name: string;
  numberOfWorkers: BigNumber;
  cost: {
    resource: RESOURCE;
    value: BigNumber;
  };
  description: string;
  icon: string;
  multiplier: number;
  requirement?: () => boolean;

  constructor(
    name: string,
    cost: {
      resource: RESOURCE;
      value: BigNumber;
    },
    description: string,
    icon: string,
    multiplier: number,
    requirement?: () => boolean
  ) {
    this.name = name;
    this.numberOfWorkers = BigNumber.fromString("0");
    this.cost = cost;
    this.description = description;
    this.icon = icon;
    this.multiplier = multiplier;
    this.requirement = requirement;
  }
  buy() {
    const { subtractResource } = useResource();
    subtractResource(this.cost.resource, this.cost.value);
    this.numberOfWorkers.add([1]);
    this.cost.value.multiply([this.multiplier]);
  }

  restoreFromSave(numberOfWorkers: BigNumber) {
    this.numberOfWorkers = numberOfWorkers;
  }
  getTotalPriceFromQuantity(quantity: number): BigNumber {
    const total = BigNumber.new();
    let currentCost = this.cost.value;

    for (let i = 0; i < quantity; i++) {
      total.add(currentCost.numbers);
      currentCost = BigNumber.fromString(currentCost.toString());
      currentCost.multiply([this.multiplier]);
    }

    return total;
  }

  buyQuantity(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      this.buy();
    }
  }
}
