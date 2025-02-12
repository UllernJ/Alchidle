import type Decimal from "break_eternity.js";
import type { RESOURCE } from "../../types";
import { BaseWorker } from "./BaseWorker";
import { formatNumber } from "@/utils/number";

export class EffectWorker extends BaseWorker {
  produce: {
    rate: Decimal;
    resource: EFFECT_RESOURCE;
  };
  constructor(
    name: string,
    produce: {
      rate: Decimal;
      resource: EFFECT_RESOURCE;
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
    this.produce = produce;
    this.description = `Increases ${this.produce.resource} by ${this.produce.rate}.`;
  }

  upgrade(multiplier: number): void {
    this.produce.rate = this.produce.rate.times(multiplier);
    this.description = `Increases ${this.produce.resource} by ${formatNumber(this.produce.rate)}.`;
  }

  setProductionRate(rate: Decimal): void {
    this.produce.rate = rate;
    this.description = `Increases ${this.produce.resource} by ${formatNumber(this.produce.rate)}.`;
  }

  getProduction() {
    return this.produce.rate.times(this.numberOfWorkers);
  }
}

export enum EFFECT_RESOURCE {
  REGEN = "regen",
  DEFENCE = "defence",
}
