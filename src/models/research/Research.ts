import { MessageType, useMessage } from "../../composable/useMessage";
import { useResource } from "../../composable/useResource";
import { RESOURCE } from "../../types";

export class Research {
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  effect?: () => void;
  requirement: () => boolean;

  constructor(
    name: string,
    description: string,
    cost: number,
    requirement: () => boolean,
    effect?: () => void
  ) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.unlocked = false;
    this.requirement = requirement;
    this.effect = effect;
  }

  unlock() {
    const { subtractResource } = useResource();

    if (!this.canAfford()) {
      return;
    }
    if (!this.unlocked) {
      subtractResource(RESOURCE.SCIENCE, this.cost);
      this.unlocked = true;
    }
    if (this.effect) {
      this.effect();
    }
  }

  canAfford() {
    const { resources } = useResource();
    const value = resources[RESOURCE.SCIENCE].value >= this.cost;
    if (!value) {
      const { establishMessage } = useMessage();
      establishMessage(
        MessageType.WARNING,
        `You need ${this.cost} science to unlock this research`
      );
    }
    return value;
  }

  getName() {
    return this.name;
  }
}
