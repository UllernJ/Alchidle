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
    cost: {
      resource: RESOURCE;
      value: number;
    },
    description: string,
    icon: string,
    multiplier: number,
    requirement?: () => boolean
  ) {
    super(name, cost, description, icon, multiplier, requirement);
    this.production = {
      resource: production.resource,
      rate: production.rate,
    };
  }

  upgradeRate(multiplier: number): void {
    this.production.rate *= multiplier;
  }
}
