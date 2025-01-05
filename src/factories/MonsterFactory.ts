import { badGnomeIcon, trollIcon, vampireIcon } from "../icons/icons";
import { RESOURCE } from "../types";
import { getRandomResource } from "../utils/resourceUtil";

class Monster {
  name: string;
  health: number;
  attack: number;
  defense: number;
  drop: {
    resource: RESOURCE;
    amount: number;
  };
  icon: string;

  constructor(
    name: string,
    health: number,
    attack: number,
    defense: number,
    dropResource: RESOURCE,
    dropAmount: number,
    icon: string
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.drop = {
      resource: dropResource,
      amount: dropAmount,
    };
    this.icon = icon;
  }
}

class MonsterFactory {
  private static createMonster(difficulty: number): Monster {
    const monster = this.getRandomMonster();
    return new Monster(
      monster.name,
      Math.round(25 * difficulty),
      Math.round(2 * difficulty),
      Math.round(5 * difficulty),
      getRandomResource(),
      Math.floor(Math.random() * 5) * difficulty,
      monster.icon
    );
  }

  static getMonsters(monsterCount: number, difficulty: number): Monster[] {
    const monsters: Monster[] = [];
    for (let i = 0; i < monsterCount; i++) {
      monsters.push(this.createMonster(difficulty));
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

export { MonsterFactory, Monster };
