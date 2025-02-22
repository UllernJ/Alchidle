import { Gear } from "./Gear";
import Decimal from "break_eternity.js";

export class Weapon extends Gear {
  damage: Decimal;

  constructor(name: string, damage: Decimal, cost: Decimal, quantity: Decimal, path?: string) {
    super(name, cost, quantity, path);
    this.damage = damage;
  }

  override upgrade(multiplier: number = 1.1) {
    this.damage = this.damage.times(multiplier);
  }
}
