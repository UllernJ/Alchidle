import { ref } from "vue";
import { useResource } from "./useResource";
import { useWorkers, WORKER } from "./useWorkers";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";

export type Research = {
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  effect?: () => void;
};

const { upgradeWorkerRate } = useWorkers();
const { upgradeProductionRate } = usePlayer();

const researchList = ref<Research[]>([
  {
    name: "Effiency",
    description: "Improves your own effeciency, increasing production rate.",
    cost: 1,
    unlocked: false,
    effect: () => {
      upgradeProductionRate();
    },
  },
  {
    name: "Mathematics",
    description: "Increasing your math skills, increasing the rate of money.",
    cost: 100,
    unlocked: false,
    effect: () => {
      upgradeWorkerRate(WORKER.BANKER);
    },
  },
  {
    name: "Advanced Mining",
    description: "Improves mining efficiency, increasing the rate of mining.",
    cost: 100,
    unlocked: false,
    effect: () => {
      upgradeWorkerRate(WORKER.MINER);
    },
  },
  {
    name: "Alchemy",
    description:
      "Unlocks the ability to convert resources into alchemy, increasing the rate of alchemy.",
    cost: 100,
    unlocked: false,
    effect: () => {
      upgradeWorkerRate(WORKER.ALCHEMIST);
    },
  },
  {
    name: "Science",
    description:
      "Unlocks the ability to conduct research, increasing the rate of science.",
    cost: 100,
    unlocked: false,
    effect: () => {
      upgradeWorkerRate(WORKER.SCIENTIST);
    },
  },
]);

export const useResearch = () => {
  const { resources, subtractResource } = useResource();

  const unlockResearch = (research: Research) => {
    if (resources[RESOURCE.SCIENCE].value < research.cost) {
      //todo add error message
      return;
    }
    if (!research.unlocked && research.effect) {
      subtractResource(RESOURCE.SCIENCE, research.cost);
      research.effect();
      upgradeResearch(research.name);
    }
  };

  return { researchList, unlockResearch };
};

const upgradeResearch = (name: string) => {
  const romanNums = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];

  const research = researchList.value.find((r) => r.name === name);
  if (!research) {
    console.warn(`Research with name "${name}" not found`);
    return;
  }

  const romanNum = romanNums.find((r) =>
    research.name.toUpperCase().endsWith(` ${r}`)
  );

  if (!romanNum) {
    research.name += " II"; // Append " II" if no Roman numeral is found
  } else {
    const index = romanNums.indexOf(romanNum);
    if (index < romanNums.length - 1) {
      research.name = research.name.replace(romanNum, romanNums[index + 1]);
    }
  }
  if (romanNum === "X") {
    research.unlocked = true;
  }
  research.cost = research.cost *= 2;
};
