import Decimal from "break_eternity.js";
import { Monster } from "../models/Monster";
import { getRandomResource } from "../utils/resourceUtil";
import { monsters } from "@/data/monsters";

export class MonsterFactory {
  private static createMonster(
    baseDamage: Decimal,
    baseHealth: Decimal,
    baseDrop: Decimal,
    difficulty: number,
    mapNumber: number,
  ): Monster {
    const monster = this.getRandomMonster();
    return new Monster(
      monster.name,
      baseDamage.times(difficulty),
      baseHealth.times(difficulty),
      getRandomResource(),
      this.getResourceDrop(baseDrop, difficulty, mapNumber),
      monster.icon
    );
  }

  static getMonsters(
    monsterCount: number,
    baseDamage: Decimal,
    baseHealth: Decimal,
    baseDrop: Decimal,
    mapNumber: number
  ): Monster[] {
    let _baseDamage = baseDamage;
    let _baseHealth = baseHealth;
    let _baseDrop = baseDrop;
    let difficultyMultiplier = 1;
    const monsters: Monster[] = [];
    for (let i = 0; i < monsterCount; i++) {
      monsters.push(
        this.createMonster(
          _baseDamage,
          _baseHealth,
          _baseDrop,
          difficultyMultiplier,
          mapNumber,
        )
      );
      difficultyMultiplier += 0.025;
      if (i + 1 === monsterCount - 1) {
        difficultyMultiplier *= 2;
      }
      _baseDamage = _baseDamage.times(1.002);
      _baseHealth = _baseHealth.times(1.002);
      _baseDrop = _baseDrop.times(1.01);
    }
    return monsters;
  }

  private static getRandomMonster() {
    const monster = monsters[Math.floor(Math.random() * monsters.length)];
    return monster;
  }

  private static getResourceDrop(
    dropAmount: Decimal,
    difficulty: number,
    mapNumber: number
  ): Decimal {
    const baseChance = 0.65;
    const difficultyFactor = 0.01 * difficulty;
    const mapFactor = 0.01 * mapNumber;
    const chance = baseChance + difficultyFactor + mapFactor;
    if (Math.random() < chance) {
      return dropAmount;
    }
    return new Decimal(0);
  }
}
