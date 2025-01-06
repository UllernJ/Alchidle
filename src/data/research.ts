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
const { upgradeProductionRate, upgradeAttackPower, upgradeDefensePower } =
  usePlayer();

const efficiencyResearch = ref<Research>({
  name: "Efficiency",
  description: "Improves your own efficiency, doubling production rate (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeProductionRate();
  },
  requirement: () => true,
});

const mathematicsResearch = ref<Research>({
  name: "Mathematics",
  description: "Improves your bankers, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.BANKER);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

const advancedMiningResearch = ref<Research>({
  name: "Advanced Mining",
  description: "Improves your miners, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.MINER);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

const alchemyResearch = ref<Research>({
  name: "Alchemy",
  description: "Improves your alchemists, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.ALCHEMIST);
  },
  requirement: () => efficiencyResearch.value.unlocked,
});

const scienceResearch = ref<Research>({
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

const combatTrainingResearch = ref<Research>({
  name: "Combat Training",
  description: "Increases your attack power by 10% (1.1x).",
  cost: 150,
  unlocked: false,
  effect: () => {
    upgradeAttackPower();
  },
  requirement: () => scienceResearch.value.unlocked,
});

const fortificationResearch = ref<Research>({
  name: "Fortification",
  description: "Increases your defense power by 10% (1.1x).",
  cost: 150,
  unlocked: false,
  effect: () => {
    upgradeDefensePower();
  },
  requirement: () => scienceResearch.value.unlocked,
});

const advancedAlchemyResearch = ref<Research>({
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

const advancedScienceResearch = ref<Research>({
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

const advancedBankingResearch = ref<Research>({
  name: "Advanced Banking",
  description: "Further improves your bankers, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.BANKER);
  },
  requirement: () => mathematicsResearch.value.unlocked,
});

const advancedMiningTechniquesResearch = ref<Research>({
  name: "Advanced Mining Techniques",
  description: "Further improves your miners, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {
    upgradeWorkerRate(WORKER.MINER);
  },
  requirement: () => advancedMiningResearch.value.unlocked,
});

export const getResearchList = () => {
  return ref<Research[]>([
    efficiencyResearch.value,
    mathematicsResearch.value,
    advancedMiningResearch.value,
    alchemyResearch.value,
    scienceResearch.value,
    combatTrainingResearch.value,
    fortificationResearch.value,
    advancedAlchemyResearch.value,
    advancedScienceResearch.value,
    advancedBankingResearch.value,
    advancedMiningTechniquesResearch.value,
  ]);
};
