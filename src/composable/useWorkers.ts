import { computed } from "vue";
import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";
import { WORKERS } from "../data/workers";
import { Worker } from "../models/worker/Worker";
import { BaseWorker } from "../models/worker/BaseWorker";
import { BigNumber } from "../models/BigNumber";

const workerStations = WORKERS
const workers = computed(() => WORKERS.value.filter((worker) => worker instanceof Worker));
const baseWorkers = computed(() => WORKERS.value.filter((worker) => worker instanceof BaseWorker));

export const useWorkers = () => {
  const { addResource } = useResource();

  const totalIncomePerSecond = computed(() => {
    return 0;
  });

  const gatherResources = (ticksPerSecond: number = 1) => {
    const { currentFocus, productionRate } = usePlayer();
    if (currentFocus.value !== null) {
      const generated = BigNumber.fromString(productionRate.value.toString());
      addResource(currentFocus.value, generated);
    }
  };

  const calculateGeneratedResources = (elapsedTime: number) => {
    return elapsedTime;
  };

  return {
    workerStations,
    workers,
    baseWorkers,
    totalIncomePerSecond,
    gatherResources,
    calculateGeneratedResources,
  };
};
