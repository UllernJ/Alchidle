import { ref } from "vue";
import type { Research } from "../research";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";

const { upgradeProductionRate, upgradeAttackPower, upgradeDefensePower } =
  usePlayer();
  const { map } = useMonsters();

export const efficiencyResearch = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, doubling production rate (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeProductionRate(2);
  },
  requirement: () => true,
});

export const efficiencyResearchI = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, doubling production rate (2x).",
  cost: 1000,
  unlocked: false,
  effect: () => {
    upgradeProductionRate(2);
  },
  requirement: () => efficiencyResearch.value.unlocked && map.value >= 2,
});

export const efficiencyResearchII = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, doubling production rate (2x).",
  cost: 10000,
  unlocked: false,
  effect: () => {
    upgradeProductionRate(2);
  },
  requirement: () => efficiencyResearchI.value.unlocked && map.value >= 3,
});

export const efficiencyResearchIII = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, doubling production rate (2x).",
  cost: 100000,
  unlocked: false,
  effect: () => {
    upgradeProductionRate(2);
  },
  requirement: () => efficiencyResearchII.value.unlocked && map.value >= 4,
});

export const efficiencyResearchIV = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, doubling production rate (2x).",
  cost: 1000000,
  unlocked: false,
  effect: () => {
    upgradeProductionRate(2);
  },
  requirement: () => efficiencyResearchIII.value.unlocked && map.value >= 5,
});

export const combatTrainingResearch = ref<Research>({
  name: "Combat Training",
  description: "Increases your attack power by 10% (1.1x).",
  cost: 10000,
  unlocked: false,
  effect: () => {
    upgradeAttackPower();
  },
  requirement: () => map.value >= 2,
});

export const fortificationResearch = ref<Research>({
  name: "Fortification",
  description: "Increases your defense power by 10% (1.1x).",
  cost: 150,
  unlocked: false,
  effect: () => {
    upgradeDefensePower();
  },
  requirement: () => combatTrainingResearch.value.unlocked,
});
