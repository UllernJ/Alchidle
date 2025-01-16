import { ref } from "vue";
import type { Research } from "../research";
import {
  advancedMiningResearch,
  mathematicsResearch,
} from "./research.resource";
import { SCIENTIST } from "../workers";

export const scienceResearch = ref<Research>({
  name: "Science",
  description: "Improves your scientists, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    SCIENTIST.value.upgradeRate(2);
  },
  requirement: () =>
    mathematicsResearch.value.unlocked && advancedMiningResearch.value.unlocked,
});

export const advancedScienceResearch = ref<Research>({
  name: "Advanced Science",
  description:
    "Further improves your scientists, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    SCIENTIST.value.upgradeRate(2);
  },
  requirement: () => scienceResearch.value.unlocked,
});

export const blacksmithingResearch = ref<Research>({
  name: "Blacksmithing",
  description: "Unlocks the ability to craft weapons and armor.",
  cost: 100,
  unlocked: false,
  effect: () => {},
  requirement: () => true,
});
