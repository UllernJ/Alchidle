import { computed, ref } from "vue";
import type { WorkerStation } from "../types";
import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";
import {
  alchemistIcon,
  bankerIcon,
  minerIcon,
  scientistIcon,
} from "../icons/icons";
import { MessageType, useMessage } from "./useMessage";

export enum WORKER {
  BANKER = "Banker",
  MINER = "Miner",
  ALCHEMIST = "Alchemist",
  SCIENTIST = "Scientist",
}

const initialWorkerStations: WorkerStation[] = [
  {
    name: WORKER.BANKER,
    rate: 1,
    resource: RESOURCE.MONEY,
    numberOfWorkers: 0,
    cost: 50,
    description: "Gathers food",
    icon: bankerIcon,
  },
  {
    name: WORKER.MINER,
    rate: 1,
    resource: RESOURCE.MINING,
    numberOfWorkers: 0,
    cost: 50,
    description: "Mines for resources",
    icon: minerIcon,
  },
  {
    name: WORKER.ALCHEMIST,
    rate: 1,
    resource: RESOURCE.ALCHEMY,
    numberOfWorkers: 0,
    cost: 50,
    description: "Gather herbs for alchemy",
    icon: alchemistIcon,
  },
  {
    name: WORKER.SCIENTIST,
    rate: 1,
    resource: RESOURCE.SCIENCE,
    numberOfWorkers: 0,
    cost: 50,
    description: "Mad man",
    icon: scientistIcon,
  },
];
const workerStations = ref<WorkerStation[]>(initialWorkerStations);

export const useWorkers = () => {
  const { resources, addResource, subtractResource } = useResource();
  const { establishMessage } = useMessage();

  const addWorker = (stationName: string) => {
    const station = workerStations.value.find((w) => w.name === stationName);
    if (station && station.cost <= resources[RESOURCE.MONEY].value) {
      subtractResource(RESOURCE.MONEY, station.cost);
      station.numberOfWorkers += 1;
      station.cost = Math.round(Math.pow(station.cost, 1.07));
    } else {
      establishMessage(
        MessageType.WARNING,
        `Not enough money to hire a ${stationName.toLowerCase()}`
      );
    }
  };

  const upgradeWorkerRate = (worker: WORKER) => {
    const station = workerStations.value.find((w) => w.name === worker);
    if (station) {
      station.rate *= 2;
    }
  };

  const totalIncomePerSecond = computed(() => {
    const { currentFocus, productionRate } = usePlayer();
    const incomePerResource: Partial<Record<RESOURCE, number>> = {};

    workerStations.value.forEach(({ resource, rate, numberOfWorkers }) => {
      incomePerResource[resource] =
        (incomePerResource[resource] || 0) + rate * numberOfWorkers;
    });

    if (currentFocus.value !== null) {
      incomePerResource[currentFocus.value] =
        (incomePerResource[currentFocus.value] || 0) + productionRate.value;
    }

    return incomePerResource;
  });

  const gatherResources = () => {
    const { currentFocus, productionRate } = usePlayer();
    if (currentFocus.value !== null) {
      addResource(currentFocus.value, productionRate.value);
    }
    workerStations.value.forEach((station) => {
      const generated = station.rate * station.numberOfWorkers;
      addResource(station.resource, generated);
    });
  };

  return {
    workerStations,
    totalIncomePerSecond,
    addWorker,
    gatherResources,
    upgradeWorkerRate,
    alchemists: computed(() =>
      workerStations.value.find((w) => w.name === WORKER.ALCHEMIST)
    ),
  };
};
