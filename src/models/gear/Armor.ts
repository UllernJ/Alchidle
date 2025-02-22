import { Gear } from "./Gear";
import Decimal from "break_eternity.js";

export class Armor extends Gear {
  defense: Decimal;

  constructor(name: string, defense: Decimal, cost: Decimal, quantity: Decimal, path?: string) {
    super(name, cost, quantity, path);
    this.defense = defense;
  }

  override upgrade(multiplier: number = 1.1) {
    this.defense = this.defense.times(multiplier);
  }
}
