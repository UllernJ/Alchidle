import { Item } from "@/models/item/Item";

export class Gear extends Item {
  isEquipped: boolean = false;
  constructor(
    name: string,
    description: string,
    icon: {
      path: string;
      color: string;
    },
    effect: () => void
  ) {
    super(name, description, icon, effect);
  }

  override use() {
    this.isEquipped = true;
    this.effect();
  }

  unequip() {
    this.isEquipped = false;
  }
}
