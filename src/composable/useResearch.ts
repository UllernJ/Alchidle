import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { MessageType, useMessage } from "./useMessage";
import { getResearchList, type Research } from "../data/research";
import type { Ref } from "vue";

const researchList: Ref<Research[]> = getResearchList();

export const useResearch = () => {
  const { resources, subtractResource } = useResource();

  const unlockResearch = (research: Research) => {
    if (resources[RESOURCE.SCIENCE].value < research.cost) {
      const { establishMessage } = useMessage();
      establishMessage(
        MessageType.WARNING,
        `You need ${research.cost} science to unlock this research`
      );
      return;
    }
    if (!research.unlocked) {
      subtractResource(RESOURCE.SCIENCE, research.cost);
      research.unlocked = true;
    }
    if (research.effect) {
      research.effect();
    }
  };

  return { researchList, unlockResearch };
};
