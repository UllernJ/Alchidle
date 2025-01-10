import type { RESOURCE } from "../types";

export class Monster {
  name: string;
  health: number;
  attack: number;
  drop: {
    resource: RESOURCE;
    amount: number;
  };
  icon?: string;

  constructor(
    name: string,
    health: number,
    attack: number,
    dropResource: RESOURCE,
    dropAmount: number,
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
}
