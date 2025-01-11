import { ref } from "vue";
import type { Research } from "../research";
import { useWorkers, WORKER } from "../../composable/useWorkers";
import { alchemyResearch } from "./research.alchemy";
import {
  advancedMiningResearch,
  mathematicsResearch,
} from "./research.resource";

const { upgradeWorkerRate } = useWorkers();

export const scienceResearch = ref<Research>({
  name: "Science",
  description: "Improves your scientists, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.SCIENTIST);
  },
  requirement: () =>
    alchemyResearch.value.unlocked &&
    mathematicsResearch.value.unlocked &&
    advancedMiningResearch.value.unlocked,
});

export const advancedScienceResearch = ref<Research>({
  name: "Advanced Science",
  description:
    "Further improves your scientists, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.SCIENTIST);
  },
  requirement: () => scienceResearch.value.unlocked,
});
