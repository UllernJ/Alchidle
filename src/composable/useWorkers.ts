import { computed } from "vue";
import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";
import { WORKERS } from "../data/workers";


const workerStations = WORKERS

export const useWorkers = () => {
  const { addResource } = useResource();

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

  const calculateGeneratedResources = (elapsedTime: number) => {
    const generated: Record<string, number> = {};
    workerStations.value.forEach((station) => {
      const rate = station.rate * station.numberOfWorkers;
      const amount = Math.floor((rate * elapsedTime) / 4);
      generated[station.resource] = (generated[station.resource] || 0) + amount;
      addResource(station.resource, amount);
    });
    return generated;
  };

  return {
    workerStations,
    totalIncomePerSecond,
    gatherResources,
    calculateGeneratedResources,
  };
};
