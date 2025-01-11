import { ref } from "vue";
import type { Research } from "../research";
import { useWorkers, WORKER } from "../../composable/useWorkers";
import { useMonsters } from "../../composable/useMonsters";

const { upgradeWorkerRate } = useWorkers();
const { map } = useMonsters();

export const unlockAlchemyResearch = ref<Research>({
  name: "Alchemy",
  description:
    "Unlock the secrets of alchemy. Enchant every aspect of your life.",
  cost: 0,
  unlocked: false,
  effect: () => {},
  requirement: () => map.value >= 1,
});

export const alchemyResearch = ref<Research>({
  name: "Alchemy",
  description: "Improves your alchemists, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.ALCHEMIST);
  },
  requirement: () => unlockAlchemyResearch.value.unlocked,
});

export const advancedAlchemyResearch = ref<Research>({
  name: "Advanced Alchemy",
  description:
    "Further improves your alchemists, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.ALCHEMIST);
  },
  requirement: () => alchemyResearch.value.unlocked,
});
