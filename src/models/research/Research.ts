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
        const { resources, subtractResource } = useResource();
        const { establishMessage } = useMessage();
    
        if (resources[RESOURCE.SCIENCE].value < this.cost) {
          establishMessage(
            MessageType.WARNING,
            `You need ${this.cost} science to unlock this research`
          );
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
  }