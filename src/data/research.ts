import { ref } from "vue";
import {
  combatTrainingResearch,
  efficiencyResearch,
  fortificationResearch,
} from "./research/research.player";
import {
  mathematicsResearch,
  miningResearch,
} from "./research/research.resource";
import {
  advancedAlchemyResearch,
  unlockAlchemyResearch,
} from "./research/research.alchemy";
import {
  blacksmithingResearch,
  blockingResearch,
  explortationResearch,
  scienceResearch,
} from "./research/research.science";
import { workerHutBlueprintResearch } from "./research/research.buildings";

export const getResearchList = () => {
  return ref(
    [
      efficiencyResearch.value,
      mathematicsResearch.value,
      miningResearch.value,
      unlockAlchemyResearch.value,
      scienceResearch.value,
      combatTrainingResearch.value,
      fortificationResearch.value,
      advancedAlchemyResearch.value,
      blacksmithingResearch.value,
      explortationResearch.value,
      workerHutBlueprintResearch.value,
      blockingResearch.value
    ].sort((a, b) => a.cost - b.cost)
  );
};
