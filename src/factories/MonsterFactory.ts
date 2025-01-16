import {
  badGnomeIcon,
  golemIcon,
  troglodyteIcon,
  trollIcon,
  vampireIcon,
  witchIcon,
} from "../icons/icons";
import { Monster } from "../models/Monster";
import { getRandomResource } from "../utils/resourceUtil";

export class MonsterFactory {
  private static createMonster(
    baseDamage: number,
    baseHealth: number,
    difficulty: number,
    mapNumber: number
  ): Monster {
    const monster = this.getRandomMonster();
    return new Monster(
      monster.name,
      Math.round(baseDamage * difficulty),
      Math.round(baseHealth * difficulty),
      getRandomResource(),
      Math.floor(Math.random() * 2) * difficulty * mapNumber,
      monster.icon
    );
  }

  static getMonsters(
    monsterCount: number,
    baseDamage: number,
    baseHealth: number,
    mapNumber: number
  ): Monster[] {
    let _baseDamage = baseDamage;
    let _baseHealth = baseHealth;
    let difficultyMultiplier = 1;
    const monsters: Monster[] = [];
    for (let i = 0; i < monsterCount; i++) {
      monsters.push(
        this.createMonster(
          _baseDamage,
          _baseHealth,
          difficultyMultiplier,
          mapNumber
        )
      );
      difficultyMultiplier += 0.05;
      _baseDamage *= 1.001;
      _baseHealth *= 1.001;
    }
    return monsters;
  }

  private static getRandomMonster() {
    const monsters = [
      {
        name: "Gnome",
        icon: badGnomeIcon,
      },
      {
        name: "Troll",
        icon: trollIcon,
      },
      {
        name: "Vampire",
        icon: vampireIcon,
      },
      {
        name: "Witch",
        icon: witchIcon,
      },
      {
        name: "Golem",
        icon: golemIcon,
      },
      {
        name: "Troglodyte",
        icon: troglodyteIcon,
      },
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
  }
}
