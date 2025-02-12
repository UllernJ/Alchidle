import Decimal from "break_eternity.js";
import type { RESOURCE } from "../types";
import { getIconByName } from "@/data/monsters";

export class Monster {
  name: string;
  health: {
    maxHealth: Decimal;
    current: Decimal;
  }
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
    icon: string,
    maxHealth?: Decimal | undefined
  ) {
    this.name = name;
    this.health = {
      maxHealth: health,
      current: health,
    }
    this.attack = attack;
    this.drop = {
      resource: dropResource,
      amount: dropAmount,
    };
    this.icon = icon;
    if (maxHealth) {
      this.health.maxHealth = maxHealth;
    }
  }

  takeDamage(damage: Decimal) {
    this.health.current = this.health.current.sub(damage);
  }
  isDead(): boolean {
    return this.health.current.lessThanOrEqualTo(0);
  }

  static fromObject(obj: Monster): Monster {
    return new Monster(
      obj.name,
      new Decimal(obj.health.current),
      new Decimal(obj.attack),
      obj.drop.resource,
      new Decimal(obj.drop.amount),
      obj.icon ?? getIconByName(obj.name),
      obj.health.maxHealth ? new Decimal(obj.health.maxHealth) : undefined
    );
  }
}
