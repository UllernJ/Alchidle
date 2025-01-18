import { ref } from "vue";
import { efficiencyResearch } from "./research.player";
import { BANKER, MINER } from "../workers";
import { UpgradeableResearch } from "../../models/research/UpgradeableResearch";

export const mathematicsResearch = ref(
  new UpgradeableResearch(
    "Mathematics",
    "Improves your bankers, doubling their efficiency (2x).",
    100,
    () => efficiencyResearch.value.level >= 1,
    2.75,
    () => {
      BANKER.value.upgradeRate(2);
    }
  )
);

export const miningResearch = ref(
  new UpgradeableResearch(
    "Mining",
    "Improves your miners, doubling their efficiency (2x).",
    100,
    () => efficiencyResearch.value.level >= 1,
    2.75,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);
