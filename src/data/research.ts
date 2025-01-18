import { ref } from "vue";
import {
  combatTrainingResearch,
  efficiencyResearch,
  fortificationResearch,
} from "./research/research.player";
import {
  mathematicsResearch,
} from "./research/research.resource";
import {
  advancedAlchemyResearch,
  unlockAlchemyResearch,
} from "./research/research.alchemy";
import {
  blacksmithingResearch,
  scienceResearch,
} from "./research/research.science";

export const getResearchList = () => {
  return ref(
    [
      efficiencyResearch.value,
      mathematicsResearch.value,
      unlockAlchemyResearch.value,
      scienceResearch.value,
      combatTrainingResearch.value,
      fortificationResearch.value,
      advancedAlchemyResearch.value,
      blacksmithingResearch.value,
    ].sort((a, b) => a.cost - b.cost)
  );
};
