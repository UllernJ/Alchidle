import { ref } from "vue";
import { Research } from "../../models/research/Research";
import { mathematicsResearch, miningResearch } from "./research.resource";
import { SCIENTIST } from "../workers";
import { UpgradeableResearch } from "../../models/research/UpgradeableResearch";

export const scienceResearch = ref(
  new UpgradeableResearch(
    "Science",
    "Improves your scientists, doubling their efficiency (2x).",
    1000,
    () => mathematicsResearch.value.unlocked && miningResearch.value.unlocked,
    2,
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
