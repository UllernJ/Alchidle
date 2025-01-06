import { ref } from "vue";
import { useWorkers, WORKER } from "../composable/useWorkers";
import { usePlayer } from "../composable/usePlayer";

export type Research = {
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  effect?: () => void;
  requirement: () => boolean;
};

const { upgradeWorkerRate } = useWorkers();
const { upgradeProductionRate } = usePlayer();

const efficiencyResearch = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, increasing production rate.",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeProductionRate();
  },
  requirement: () => true,
});

const mathematicsResearch = ref<Research>({
  name: "Mathematics",
  description: "Improves your bankers, increasing their efficiency.",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.BANKER);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

const advancedMiningResearch = ref<Research>({
  name: "Advanced Mining",
  description: "Improves your miners, increasing their efficiency.",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.MINER);
  },
  requirement: () => mathematicsResearch.value.unlocked,
});

const alchemyResearch = ref<Research>({
  name: "Alchemy",
  description: "Improves your alchemists, increasing their efficiency.",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.ALCHEMIST);
  },
  requirement: () => advancedMiningResearch.value.unlocked,
});

const scienceResearch = ref<Research>({
  name: "Science",
  description: "Improves your scientists, increasing their efficiency.",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.SCIENTIST);
  },
  requirement: () => alchemyResearch.value.unlocked,
});

export const getResearchList = () => {
  return ref<Research[]>([
    efficiencyResearch.value,
    mathematicsResearch.value,
    advancedMiningResearch.value,
    alchemyResearch.value,
    scienceResearch.value,
  ]);
};
