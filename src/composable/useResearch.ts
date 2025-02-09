import { getDefaultCostByResearchName, researchs } from "@/data/research";
import { UpgradeableResearch } from "@/models/research/UpgradeableResearch";


export const useResearch = () => {

  const resetResearch = () => {
    researchs.value.forEach((research) => {
      research.unlocked = false;
      research.cost = getDefaultCostByResearchName(research.name);
      if(research instanceof UpgradeableResearch) {
        research.level = 0;
      }
    });
  }

  return { researchList: researchs, resetResearch };
};
