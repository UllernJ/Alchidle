import type Decimal from "break_eternity.js";

export class TalentNode {
  title: string;
  description: string;
  cost: Decimal;
  icon: string;
  effect: () => void;
  level: number = 0;
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
}
