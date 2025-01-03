import { ref } from "vue";
import { useResource } from "./useResource";
import { useWorkers, WORKER } from "./useWorkers";
import { RESOURCE } from "../types";

export type Research = {
    name: string;
    description: string;
    cost: number;
    unlocked: boolean;
    effect?: () => void;
};

const { upgradeStorage } = useResource();
const { upgradeWorkerRate } = useWorkers();

const researchList = ref<Research[]>([
    {
        name: "Mathematics",
        description: "Unlocks the ability to count, somehow increasing your production in earning more money.",
        cost: 100,
        unlocked: false,
        effect: () => {
            upgradeWorkerRate(WORKER.BANKER);
        }
    },
    {
        name: "Advanced Mining",
        description: "Improves mining efficiency, increasing the rate of mining.",
        cost: 100,
        unlocked: false,
        effect: () => {
            upgradeWorkerRate(WORKER.MINER);
        }
    },
    {
        name: "Alchemy",
        description: "Unlocks the ability to convert resources into alchemy, increasing the rate of alchemy.",
        cost: 100,
        unlocked: false,
        effect: () => {
            upgradeWorkerRate(WORKER.ALCHEMIST);
        }
    },
    {
        name: "Science",
        description: "Unlocks the ability to conduct research, increasing the rate of science.",
        cost: 100,
        unlocked: false,
        effect: () => {
            upgradeWorkerRate(WORKER.SCIENTIST);
        }
    },
    {
        name: "Banking",
        description: "Unlocks the ability to invest money, increasing the rate of money.",
        cost: 100,
        unlocked: false,
        effect: () => {
            upgradeWorkerRate(WORKER.BANKER);
        }
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
        }
        research.unlocked = true;
    };

    return { researchList, unlockResearch };
};