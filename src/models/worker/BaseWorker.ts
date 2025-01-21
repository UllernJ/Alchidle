import { useResource } from "../../composable/useResource";
import type { RESOURCE } from "../../types";

export class BaseWorker {
  name: string;
  numberOfWorkers: number;
  cost: {
    resource: RESOURCE;
    value: number;
  };
  description: string;
  icon: string;
  multiplier?: number;
  requirement?: () => boolean;

  constructor(
    name: string,
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
    this.name = name;
    this.numberOfWorkers = numberOfWorkers;
    this.cost = cost;
    this.description = description;
    this.icon = icon;
    this.multiplier = multiplier;
    this.requirement = requirement;
  }
  buy() {
    const { subtractResource } = useResource();
    subtractResource(this.cost.resource, this.cost.value);
    this.numberOfWorkers++;
    this.cost.value = Math.round(this.cost.value * 1.07);
  }

  restoreFromSave(numberOfWorkers: number) {
    for (let i = 0; i < numberOfWorkers; i++) {
      this.cost.value = Math.round(this.cost.value * 1.07);
    }
  }
}
