import { ref } from "vue";
import type { Research } from "../research";
import { usePlayer } from "../../composable/usePlayer";
import { scienceResearch } from "./research.science";

const { upgradeProductionRate, upgradeAttackPower, upgradeDefensePower } =
  usePlayer();

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

export const combatTrainingResearch = ref<Research>({
  name: "Combat Training",
  description: "Increases your attack power by 10% (1.1x).",
  cost: 150,
  unlocked: false,
  effect: () => {
    upgradeAttackPower();
  },
  requirement: () => scienceResearch.value.unlocked,
});

export const fortificationResearch = ref<Research>({
  name: "Fortification",
  description: "Increases your defense power by 10% (1.1x).",
  cost: 150,
  unlocked: false,
  effect: () => {
    upgradeDefensePower();
  },
  requirement: () => scienceResearch.value.unlocked,
});
