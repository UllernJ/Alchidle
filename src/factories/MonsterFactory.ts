import { badGnomeIcon, trollIcon, vampireIcon } from "../icons/icons";
import { Monster } from "../models/Monster";
import { getRandomResource } from "../utils/resourceUtil";
export class MonsterFactory {
  private static createMonster(difficulty: number, zone: number): Monster {
    const monster = this.getRandomMonster();
    const zoneMultiplier = 1 + (zone - 1) * 0.1; // Increase difficulty per zone
    return new Monster(
      monster.name,
      Math.round(25 * difficulty * zoneMultiplier),
      Math.round(2 * difficulty * zoneMultiplier),
      getRandomResource(),
      Math.floor(Math.random() * 5) * difficulty * zoneMultiplier,
      monster.icon
    );
  }

  static getMonsters(
    monsterCount: number,
    difficulty: number,
    zone: number
  ): Monster[] {
    let difficultyMultiplier = difficulty;
    const monsters: Monster[] = [];
    for (let i = 0; i < monsterCount; i++) {
      //diffucultyMultiplier should be progressivly increased for each monster
      difficultyMultiplier += 0.1;
      monsters.push(this.createMonster(difficultyMultiplier, zone));
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
    ];
    return monsters[Math.floor(Math.random() * monsters.length)];
  }
}
