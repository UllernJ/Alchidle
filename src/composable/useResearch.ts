import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { MessageType, useMessage } from "./useMessage";
import { getResearchList, type Research } from "../data/research";

const researchList = getResearchList();

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
    if (!research.unlocked && research.effect) {
      subtractResource(RESOURCE.SCIENCE, research.cost);
      research.effect();
      research.unlocked = true;
    }
  };

  return { researchList, unlockResearch };
};
