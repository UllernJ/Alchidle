import { getDefaultCostByResearchName, researchs } from "@/data/research";


export const useResearch = () => {

  const resetResearch = () => {
    researchs.value.forEach((research) => {
      research.unlocked = false;
      research.cost = getDefaultCostByResearchName(research.name);
    });
  }

  return { researchList: researchs, resetResearch };
};
