import { ref } from "vue";
import type { Research } from "../research";
import { efficiencyResearch } from "./research.player";
import { BANKER, MINER } from "../workers";
import { useMonsters } from "../../composable/useMonsters";

const { map } = useMonsters();

//!money
export const mathematicsResearch = ref<Research>({
  name: "Mathematics",
  description: "Improves your bankers, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    BANKER.value.upgradeRate(2);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

export const mathematicsResearchII = ref<Research>({
  name: "Mathematics II",
  description: "Further improves your bankers, doubling their efficiency (2x).",
  cost: 500,
  unlocked: false,
  effect: () => {
    BANKER.value.upgradeRate(2);
  },
  requirement: () => mathematicsResearch.value.unlocked && map.value >= 2,
});

export const mathematicsResearchIII = ref<Research>({
  name: "Mathematics III",
  description: "Further improves your bankers, doubling their efficiency (2x).",
  cost: 3000,
  unlocked: false,
  effect: () => {
    BANKER.value.upgradeRate(2);
  },
  requirement: () => mathematicsResearch.value.unlocked && map.value >= 3,
});

export const mathematicsResearchIV = ref<Research>({
  name: "Mathematics IV",
  description: "Further improves your bankers, doubling their efficiency (2x).",
  cost: 10000,
  unlocked: false,
  effect: () => {
    BANKER.value.upgradeRate(2);
  },
  requirement: () => mathematicsResearch.value.unlocked && map.value >= 4,
});

//!mining
export const advancedMiningResearch = ref<Research>({
  name: "Mining",
  description: "Improves your miners, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    MINER.value.upgradeRate(2);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

export const advancedMiningResearchI = ref<Research>({
  name: "Advanced Mining I",
  description: "Further improves your miners, doubling their efficiency (2x).",
  cost: 500,
  unlocked: false,
  effect: () => {
    MINER.value.upgradeRate(2);
  },
  requirement: () => advancedMiningResearch.value.unlocked,
});

export const advancedMiningResearchII = ref<Research>({
  name: "Advanced Mining II",
  description: "Further improves your miners, doubling their efficiency (2x).",
  cost: 3000,
  unlocked: false,
  effect: () => {
    MINER.value.upgradeRate(2);
  },
  requirement: () => advancedMiningResearchI.value.unlocked && map.value >= 2,
});

export const advancedMiningResearchIII = ref<Research>({
  name: "Advanced Mining III",
  description: "Further improves your miners, doubling their efficiency (2x).",
  cost: 10000,
  unlocked: false,
  effect: () => {
    MINER.value.upgradeRate(2);
  },
  requirement: () => advancedMiningResearchII.value.unlocked && map.value >= 3,
});

export const advancedMiningResearchIV = ref<Research>({
  name: "Advanced Mining IV",
  description: "Further improves your miners, doubling their efficiency (2x).",
  cost: 30000,
  unlocked: false,
  effect: () => {
    MINER.value.upgradeRate(2);
  },
  requirement: () => advancedMiningResearchIII.value.unlocked && map.value >= 4,
});