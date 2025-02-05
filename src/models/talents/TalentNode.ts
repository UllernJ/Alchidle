import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import Decimal from "break_eternity.js";

export class TalentNode {
  title: string;
  description: string;
  cost: Decimal;
  icon: string;
  effect: () => void;
  level: Decimal = new Decimal(0);
  multiplier: Decimal = new Decimal(2);
  constructor(
    title: string,
    description: string,
    cost: Decimal,
    icon: string,
    effect: () => void
  ) {
    this.title = title;
    this.description = description;
    this.cost = cost;
    this.icon = icon;
    this.effect = effect;
  }

  learn() {
    this.effect();
    const { points } = useReincarnation();
    if (points.value.greaterThanOrEqualTo(this.cost)) {
      points.value = points.value.sub(this.cost);
      this.level = this.level.add(1);
      this.cost = this.cost.times(this.multiplier).round();
    }
  }

  getPriceFromQuantity(quantity: number) {
    return this.cost.times(this.multiplier.pow(quantity)).round();
  }
}
