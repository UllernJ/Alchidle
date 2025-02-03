import Decimal from "break_eternity.js";
import { Monster } from "../models/Monster";
import { getRandomResource } from "../utils/resourceUtil";
import { monsters } from "@/data/monsters";

export class MonsterFactory {
  private static createMonster(
    baseDamage: Decimal,
    baseHealth: Decimal,
    difficulty: number,
    mapNumber: number,
    isBoss = false
  ): Monster {
    const monster = this.getRandomMonster(isBoss);
    return new Monster(
      monster.name,
      baseDamage.times(difficulty),
      baseHealth.times(difficulty),
      getRandomResource(),
      this.getResourceDrop(
        new Decimal(5)
          .pow(difficulty)
          .times(mapNumber)
          .times(Math.random() + 1),
        difficulty,
        mapNumber
      ) || new Decimal(0),
      monster.icon
    );
  }

  static getMonsters(
    monsterCount: number,
    baseDamage: Decimal,
    baseHealth: Decimal,
    mapNumber: number
  ): Monster[] {
    let _baseDamage = baseDamage;
    let _baseHealth = baseHealth;
    let difficultyMultiplier = 1;
    const monsters: Monster[] = [];
    for (let i = 0; i < monsterCount; i++) {
      const isBoss = i + 1 === monsterCount;
      monsters.push(
        this.createMonster(
          _baseDamage,
          _baseHealth,
          difficultyMultiplier,
          mapNumber,
          isBoss
        )
      );
      difficultyMultiplier += 0.025;
      if (i + 1 === monsterCount - 1) {
        difficultyMultiplier *= 2;
      }
      _baseDamage = _baseDamage.times(1.002);
      _baseHealth = _baseHealth.times(1.002);
    }
    return monsters;
  }

  private static getRandomMonster(isBoss = false) {
    const monster = monsters[Math.floor(Math.random() * monsters.length)];
    if (isBoss) {
      monster.name = "Boss " + monster.name;
    }
    return monster;
  }

  private static getResourceDrop(
    dropAmount: Decimal,
    difficulty: number,
    mapNumber: number
  ): Decimal | undefined {
    const baseChance = 0.65;
    const difficultyFactor = 0.01 * difficulty;
    const mapFactor = 0.01 * mapNumber;
    const chance = baseChance + difficultyFactor + mapFactor;
    if (Math.random() < chance) {
      return dropAmount;
    }
  }
}
