import { computed } from "vue";
import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";
import { WORKERS } from "../data/workers";
import { Worker } from "../models/worker/Worker";
import { BaseWorker } from "../models/worker/BaseWorker";


const workerStations = WORKERS
const workers = computed(() => WORKERS.value.filter((worker) => worker instanceof Worker));
const baseWorkers = computed(() => WORKERS.value.filter((worker) => worker instanceof BaseWorker));

export const useWorkers = () => {
  const { addResource } = useResource();

  const totalIncomePerSecond = computed(() => {
    const { currentFocus, productionRate } = usePlayer();
    const incomePerResource: Partial<Record<RESOURCE, number>> = {};

    workers.value.forEach(({ production, numberOfWorkers }) => {
      incomePerResource[production.resource] =
        (incomePerResource[production.resource] || 0) + production.rate * numberOfWorkers;
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
    workers.value.forEach((station) => {
      const generated = station.production.rate * station.numberOfWorkers;
      addResource(station.production.resource, generated);
    });
  };

  const calculateGeneratedResources = (elapsedTime: number) => {
    const generated: Record<string, number> = {};
    workers.value.forEach((station) => {
      const rate = station.production.rate * station.numberOfWorkers;
      const amount = Math.floor((rate * elapsedTime) / 4);
      generated[station.production.resource] = (generated[station.production.resource] || 0) + amount;
      addResource(station.production.resource, amount);
    });
    return generated;
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
