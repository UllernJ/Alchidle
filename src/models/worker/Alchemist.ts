import { BaseWorker } from "./BaseWorker";
import { RESOURCE } from "@/types";
import { alchemyIcon } from "@/icons/icons";
import { isDev } from "@/utils/dev";
import Decimal from "break_eternity.js";
import { unlockAlchemyResearch } from "@/data/research";
import { useResource } from "@/composable/useResource";

export class Alchemist extends BaseWorker {
  public efficiency: Decimal;

  constructor() {
    super(
      "Alchemist",
      {
        resource: RESOURCE.MONEY,
        value: isDev ? new Decimal(10) : new Decimal(75),
      },
      "Alchemy",
      alchemyIcon,
      1,
      () => unlockAlchemyResearch.value.unlocked
    );
    this.efficiency = new Decimal(1);
  }

  upgrade(multiplier: number = 1.1): void {
    this.efficiency = this.efficiency.times(multiplier);
  }

  override buy(): void {
    const { subtractResource, resources } = useResource();
    if (this.cost.value.lte(resources[RESOURCE.MONEY].value.amount)) {
      subtractResource(RESOURCE.MONEY, this.cost.value);
      this.cost.value = this.cost.value.times(1.45).round();
      this.numberOfWorkers = this.numberOfWorkers.plus(1);
    }
  }
  restoreFromSave(numberOfWorkers: Decimal): void {
    this.numberOfWorkers = numberOfWorkers;
    for (let i = 0; i < numberOfWorkers.toNumber(); i++) {
      this.cost.value = this.cost.value.times(1.45).round();
    }
  }
}
