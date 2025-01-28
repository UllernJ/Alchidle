import { MessageType, useMessage } from "../../composable/useMessage";
import { SCIENCE, useResource } from "../../composable/useResource";
import { RESOURCE } from "../../types";
import type { BigNumber } from "../BigNumber";

export class Research {
  name: string;
  description: string;
  cost: BigNumber;
  unlocked: boolean;
  effect?: () => void;
  requirement: () => boolean;

  constructor(
    name: string,
    description: string,
    cost: BigNumber,
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
    if (!this.canAfford()) {
      return;
    }
    if (!this.unlocked) {
      SCIENCE.value.deductAmount(this.cost);
      this.unlocked = true;
    }
    if (this.effect) {
      this.effect();
    }
  }

  canAfford() {
    const { canAfford } = useResource();
    const value = canAfford(RESOURCE.SCIENCE, this.cost);
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
