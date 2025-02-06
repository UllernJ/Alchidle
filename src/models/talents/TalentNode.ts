import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import Decimal from "break_eternity.js";

export class TalentNode {
  title: string;
  cost: Decimal;
  icon: string;
  effect: () => void;
  level: Decimal = new Decimal(0);
  multiplier: Decimal = new Decimal(2);
  constructor(
    title: string,
    cost: Decimal,
    icon: string,
    effect: () => void
  ) {
    this.title = title;
    this.cost = cost;
    this.icon = icon;
    this.effect = effect;
  }

  learn() {
    const { points } = useReincarnation();
    if (points.value.greaterThanOrEqualTo(this.cost)) {
      points.value = points.value.sub(this.cost);
      this.level = this.level.add(1);
      this.cost = this.cost.times(this.multiplier).round();
      this.effect();
    }
  }

  getPriceFromQuantity(quantity: number) {
    return this.cost.times(this.multiplier.pow(quantity)).round();
  }

  restoreFromSave(level: string) {
    this.level = new Decimal(level);
    this.cost = this.cost.times(this.multiplier.pow(this.level.toNumber()));
    for (let i = 0; i < this.level.toNumber(); i++) {
      this.effect();
    }
  }
}
