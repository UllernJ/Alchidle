import { ref } from "vue";
import {
  combatTrainingResearch,
  efficiencyResearch,
  efficiencyResearchI,
  efficiencyResearchII,
  efficiencyResearchIII,
  efficiencyResearchIV,
  fortificationResearch,
} from "./research/research.player";
import {
  advancedMiningResearch,
  advancedMiningResearchI,
  advancedMiningResearchII,
  advancedMiningResearchIII,
  advancedMiningResearchIV,
  mathematicsResearch,
  mathematicsResearchII,
  mathematicsResearchIII,
  mathematicsResearchIV,
} from "./research/research.resource";
import {
  advancedAlchemyResearch,
  alchemyResearch,
  unlockAlchemyResearch,
} from "./research/research.alchemy";
import {
  advancedScienceResearch,
  blacksmithingResearch,
  scienceResearch,
} from "./research/research.science";

export const getResearchList = () => {
  return ref(
    [
      efficiencyResearch.value,
      mathematicsResearch.value,
      advancedMiningResearch.value,
      unlockAlchemyResearch.value,
      alchemyResearch.value,
      scienceResearch.value,
      combatTrainingResearch.value,
      fortificationResearch.value,
      advancedAlchemyResearch.value,
      advancedScienceResearch.value,
      blacksmithingResearch.value,
      efficiencyResearchI.value,
      efficiencyResearchII.value,
      efficiencyResearchIII.value,
      efficiencyResearchIV.value,
      mathematicsResearchII.value,
      mathematicsResearchIII.value,
      mathematicsResearchIV.value,
      advancedMiningResearchI.value,
      advancedMiningResearchII.value,
      advancedMiningResearchIII.value,
      advancedMiningResearchIV.value,
    ].sort((a, b) => a.cost - b.cost)
  );
};
