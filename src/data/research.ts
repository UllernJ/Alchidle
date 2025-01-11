import { ref } from "vue";
import {
  combatTrainingResearch,
  efficiencyResearch,
  fortificationResearch,
} from "./research/research.player";
import {
  advancedBankingResearch,
  advancedMiningResearch,
  advancedMiningTechniquesResearch,
  mathematicsResearch,
} from "./research/research.resource";
import {
  advancedAlchemyResearch,
  alchemyResearch,
  unlockAlchemyResearch,
} from "./research/research.alchemy";
import {
  advancedScienceResearch,
  scienceResearch,
} from "./research/research.science";

export type Research = {
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  effect?: () => void;
  requirement: () => boolean;
};

export const getResearchList = () => {
  return ref<Research[]>([
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
    advancedBankingResearch.value,
    advancedMiningTechniquesResearch.value,
  ]);
};
