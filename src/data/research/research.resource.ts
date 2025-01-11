import { ref } from "vue";
import type { Research } from "../research";
import { useWorkers, WORKER } from "../../composable/useWorkers";
import { efficiencyResearch } from "./research.player";

const { upgradeWorkerRate } = useWorkers();

export const mathematicsResearch = ref<Research>({
  name: "Mathematics",
  description: "Improves your bankers, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.BANKER);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

export const advancedMiningResearch = ref<Research>({
  name: "Advanced Mining",
  description: "Improves your miners, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.MINER);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

export const advancedBankingResearch = ref<Research>({
  name: "Advanced Banking",
  description: "Further improves your bankers, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.BANKER);
  },
  requirement: () => mathematicsResearch.value.unlocked,
});

export const advancedMiningTechniquesResearch = ref<Research>({
  name: "Advanced Mining Techniques",
  description: "Further improves your miners, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.MINER);
  },
  requirement: () => advancedMiningResearch.value.unlocked,
});
