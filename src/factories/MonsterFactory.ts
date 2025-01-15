import { badGnomeIcon, golemIcon, troglodyteIcon, trollIcon, vampireIcon, witchIcon } from "../icons/icons";
import { Monster } from "../models/Monster";
import { getRandomResource } from "../utils/resourceUtil";

export class MonsterFactory {
  private static createMonster(difficulty: number): Monster {
    const monster = this.getRandomMonster();
    return new Monster(
      monster.name,
      Math.round(25 * difficulty),
      Math.round(2 * difficulty),
      getRandomResource(),
      Math.floor(Math.random() * 2) * difficulty,
      monster.icon
    );
  }

  static getMonsters(monsterCount: number, difficulty: number): Monster[] {
    let difficultyMultiplier = difficulty;
    const monsters: Monster[] = [];
    for (let i = 0; i < monsterCount; i++) {
      difficultyMultiplier += 0.2;
      monsters.push(this.createMonster(difficultyMultiplier));
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
      }
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
  }
}
