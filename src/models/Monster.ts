import Decimal from "break_eternity.js";
import type { RESOURCE } from "../types";

export class Monster {
  name: string;
  health: Decimal;
  attack: Decimal;
  drop: {
    resource: RESOURCE;
    amount: Decimal;
  };
  icon?: string;

  constructor(
    name: string,
    health: Decimal,
    attack: Decimal,
    dropResource: RESOURCE,
    dropAmount: Decimal,
    icon: string
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.drop = {
      resource: dropResource,
      amount: dropAmount,
    };
    this.icon = icon;
  }

  takeDamage(damage: Decimal) {
    this.health = this.health.sub(damage);
  }
  isDead(): boolean {
    return this.health.lessThanOrEqualTo(0);
  }

  static fromObject(obj: Monster): Monster {
    return new Monster(
      obj.name,
      new Decimal(obj.health),
      new Decimal(obj.attack),
      obj.drop.resource,
      new Decimal(obj.drop.amount),
      obj.icon ?? ""
    );
  }

}
