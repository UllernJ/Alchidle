export abstract class Item {
  name: string;
  description: string;
  icon: {
    path: string;
    color: string;
  };
  effect: () => void;
  level: number = 1;
  unlocked: boolean = false;

  constructor(
    name: string,
    description: string,
    icon: {
      path: string;
      color: string;
    },
    effect: () => void,
    level?: number
  ) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.effect = effect;
    if (level) {
      this.level = level;
    }
  }

  abstract use(): void;
}
