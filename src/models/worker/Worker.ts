import type Decimal from "break_eternity.js";
import { useActionLog } from "../../composable/useActionLog";
import { MessageType } from "../../composable/useMessage";
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
    const { logMessage } = useActionLog();
    logMessage(`${this.name} production has improved!`, MessageType.INFO);
  }
}
