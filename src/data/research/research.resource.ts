import { ref } from "vue";
import { Research } from "../../models/research/Research";
import { efficiencyResearch } from "./research.player";
import { BANKER, MINER } from "../workers";
import { useMonsters } from "../../composable/useMonsters";

const { map } = useMonsters();

//!money
export const mathematicsResearch = ref(
  new Research(
    "Mathematics",
    "Improves your bankers, doubling their efficiency (2x).",
    100,
    () => efficiencyResearch.value.unlocked,
    () => {
      BANKER.value.upgradeRate(2);
    }
  )
);

export const mathematicsResearchII = ref(
  new Research(
    "Mathematics II",
    "Further improves your bankers, doubling their efficiency (2x).",
    500,
    () => mathematicsResearch.value.unlocked && map.value >= 2,
    () => {
      BANKER.value.upgradeRate(2);
    }
  )
);

export const mathematicsResearchIII = ref(
  new Research(
    "Mathematics III",
    "Further improves your bankers, doubling their efficiency (2x).",
    3000,
    () => mathematicsResearch.value.unlocked && map.value >= 3,
    () => {
      BANKER.value.upgradeRate(2);
    }
  )
);

export const mathematicsResearchIV = ref(
  new Research(
    "Mathematics IV",
    "Further improves your bankers, doubling their efficiency (2x).",
    10000,
    () => mathematicsResearch.value.unlocked && map.value >= 4,
    () => {
      BANKER.value.upgradeRate(2);
    }
  )
);

//!mining
export const advancedMiningResearch = ref(
  new Research(
    "Mining",
    "Improves your miners, doubling their efficiency (2x).",
    100,
    () => efficiencyResearch.value.unlocked,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);

export const advancedMiningResearchI = ref(
  new Research(
    "Advanced Mining I",
    "Further improves your miners, doubling their efficiency (2x).",
    500,
    () => advancedMiningResearch.value.unlocked,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);

export const advancedMiningResearchII = ref(
  new Research(
    "Advanced Mining II",
    "Further improves your miners, doubling their efficiency (2x).",
    3000,
    () => advancedMiningResearchI.value.unlocked && map.value >= 2,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);

export const advancedMiningResearchIII = ref(
  new Research(
    "Advanced Mining III",
    "Further improves your miners, doubling their efficiency (2x).",
    10000,
    () => advancedMiningResearchII.value.unlocked && map.value >= 3,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);

export const advancedMiningResearchIV = ref(
  new Research(
    "Advanced Mining IV",
    "Further improves your miners, doubling their efficiency (2x).",
    30000,
    () => advancedMiningResearchIII.value.unlocked && map.value >= 4,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);