import { ref } from "vue";
import { Research } from "../../models/research/Research";
import {
  advancedMiningResearch,
  mathematicsResearch,
} from "./research.resource";
import { SCIENTIST } from "../workers";

export const scienceResearch = ref(
  new Research(
    "Science",
    "Improves your scientists, doubling their efficiency (2x).",
    100,
    () =>
      mathematicsResearch.value.unlocked &&
      advancedMiningResearch.value.unlocked,
    () => {
      SCIENTIST.value.upgradeRate(2);
    }
  )
);

export const advancedScienceResearch = ref(
  new Research(
    "Advanced Science",
    "Further improves your scientists, doubling their efficiency (2x).",
    200,
    () => scienceResearch.value.unlocked,
    () => {
      SCIENTIST.value.upgradeRate(2);
    }
  )
);

export const blacksmithingResearch = ref(
  new Research(
    "Blacksmithing",
    "Unlocks the ability to craft weapons and armor.",
    100,
    () => true
  )
);
