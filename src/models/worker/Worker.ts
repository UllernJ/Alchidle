import type Decimal from "break_eternity.js";
import type { RESOURCE } from "../../types";
import { BaseWorker } from "./BaseWorker";

export class Worker extends BaseWorker {
  production: {
    resource: RESOURCE;
    rate: Decimal;
  };

  constructor(
    name: string,
    production: {
      resource: RESOURCE;
      rate: Decimal;
    },
    cost: {
      resource: RESOURCE;
      value: Decimal;
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
    this.production.rate = this.production.rate.multiply(multiplier);
  }
  getProduction(multiplier: Decimal): Decimal {
    if (multiplier.eq(0)) {
      return this.production.rate;
    }
    const multiplierBonus = this.numberOfWorkers.times(multiplier);
    return this.production.rate
      .times(multiplierBonus)
      .div(100)
      .plus(this.production.rate);
  }
}
