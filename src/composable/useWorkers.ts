import { computed, ref } from "vue";
import type { WorkerStation } from "../types";
import { useResource } from "./useResource";

const initialWorkerStations: WorkerStation[] = [
  {
    name: "WORKER_A",
    rate: 5,
    numberOfWorkers: 0,
    cost: 50,
  },
  {
    name: "WORKER_B",
    rate: 10,
    numberOfWorkers: 0,
    cost: 100,
  },
];
const workerStations = ref<WorkerStation[]>([...initialWorkerStations]);

export const useWorkers = () => {
  const { money } = useResource();

  const addWorker = (stationName: string) => {
    const station = workerStations.value.find((w) => w.name === stationName);
    if (station && station.cost <= money.value) {
      money.value -= station.cost;
      station.numberOfWorkers += 1;
    }
  };

  const removeWorker = (stationName: string) => {
    const station = workerStations.value.find((w) => w.name === stationName);
    if (station && station.numberOfWorkers > 0) {
      money.value += station.cost;
      station.numberOfWorkers -= 1;
    }
  };

  const totalIncomePerSecond = computed(() =>
    workerStations.value.reduce(
      (sum, station) => sum + station.rate * station.numberOfWorkers,
      0,
    )
  );

  const gatherMoney = () => {
    money.value += totalIncomePerSecond.value;
  };

  return {
    workerStations,
    totalIncomePerSecond,
    addWorker,
    removeWorker,
    gatherMoney,
  };
};
