import { computed, ref } from "vue";
import type { WorkerStation } from "../types";
import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";

const initialWorkerStations: WorkerStation[] = [
  {
    name: "Banker",
    rate: 1,
    resource: RESOURCE.MONEY,
    numberOfWorkers: 0,
    cost: 50,
    description: "Gathers food",
  },
  {
    name: "Miner",
    rate: 1,
    resource: RESOURCE.MINING,
    numberOfWorkers: 0,
    cost: 50,
    description: "Mines for resources",
  },
  {
    name: "Alchemist",
    rate: 1,
    resource: RESOURCE.ALCHEMY,
    numberOfWorkers: 0,
    cost: 50,
    description: "Gather herbs for alchemy",
  },
  {
    name: "Scientist",
    rate: 1,
    resource: RESOURCE.SCIENCE,
    numberOfWorkers: 0,
    cost: 50,
    description: "Mad man",
  }
];
const workerStations = ref<WorkerStation[]>([...initialWorkerStations]);

export const useWorkers = () => {
  const { resources, addResource, subtractResource } = useResource();

  const addWorker = (stationName: string) => {
    const station = workerStations.value.find((w) => w.name === stationName);
    if (station && station.cost <= resources[RESOURCE.MONEY].value) {
      subtractResource(RESOURCE.MONEY, station.cost);
      station.numberOfWorkers += 1;
      station.cost = Math.round(Math.pow(station.cost, 1.1))
    }
  };

  const totalIncomePerSecond = computed(() => {
    const incomePerResource: Partial<Record<RESOURCE, number>> = {};

    workerStations.value.forEach((station) => {
      const generated = station.rate * station.numberOfWorkers;
      if (!incomePerResource[station.resource]) {
        incomePerResource[station.resource] = 0;
      }
      incomePerResource[station.resource]! += generated;
    });

    return incomePerResource;
  });

  const gatherResources = () => {
    const { currentFocus } = usePlayer();
    if (currentFocus.value !== null) {
      addResource(currentFocus.value, 1);
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
  };
};
