import { Item } from "@/models/item/Item";
import type { Monster } from "@/models/Monster";
import Decimal from "break_eternity.js";
import { MonsterFactory } from "@/factories/MonsterFactory";

export class Map extends Item {
  monsters: Monster[];

  constructor(
    name: string,
    description: string,
    icon: {
      path: string;
      color: string;
    },
    effect: () => void,
    difficulty: number,
    level?: number
  ) {
    super(name, description, icon, effect, level);

    const attack = new Decimal(10).times(difficulty);
    const health = new Decimal(100).times(difficulty);
    this.monsters = MonsterFactory.getMonsters(20, attack, health, this.level);
  }

  override use() {
    this.effect();
    return this.monsters;
  }
}
