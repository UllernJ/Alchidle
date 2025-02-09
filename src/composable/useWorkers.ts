import { computed } from "vue";
import Decimal from "break_eternity.js";
import { useResource } from "./useResource";
import { RESOURCE } from "../types";
import { usePlayer } from "./usePlayer";
import { getDefaultCostByWorkerName, WORKERS } from "@/data/workers";
import { Worker } from "../models/worker/Worker";
import { EffectWorker } from "@/models/worker/EffectWorker";

const workerStations = computed(() => WORKERS.value);
const workers = computed(() =>
  WORKERS.value.filter((worker) => worker instanceof Worker)
);
const baseWorkers = computed(() =>
  WORKERS.value.filter((worker) => worker instanceof EffectWorker)
);

export const useWorkers = () => {
  const { addResource } = useResource();

  const totalIncomePerSecond = computed(() => {
    const { currentFocus, productionRate } = usePlayer();
    const incomePerResource: Partial<Record<RESOURCE, Decimal>> = {};

    workers.value.forEach(({ production, numberOfWorkers }) => {
      const rate = production.rate.times(numberOfWorkers);
      incomePerResource[production.resource] = (
        incomePerResource[production.resource] || new Decimal(0)
      ).plus(rate);
    });

    if (currentFocus.value !== null) {
      incomePerResource[currentFocus.value] = (
        incomePerResource[currentFocus.value] || new Decimal(0)
      ).plus(productionRate.value);
    }

    return incomePerResource;
  });

  const gatherResources = (deltaTime: number) => {
    const { currentFocus, productionRate } = usePlayer();
    if (currentFocus.value !== null) {
      addResource(currentFocus.value, productionRate.value.times(deltaTime));
    }
    workers.value.forEach((station) => {
      const generated = station.production.rate
        .times(station.numberOfWorkers)
        .times(deltaTime);
      addResource(station.production.resource, generated);
    });
  };

  const calculateGeneratedResources = (elapsedTime: number) => {
    const generated: Record<string, Decimal> = {};
    workers.value.forEach((station) => {
      const rate = station.production.rate.times(station.numberOfWorkers);
      const amount = rate.times(elapsedTime).div(4).floor();
      generated[station.production.resource] = (
        generated[station.production.resource] || new Decimal(0)
      ).plus(amount);
      addResource(station.production.resource, amount);
    });
    return generated;
  };

  const resetWorkers = () => {
    workerStations.value.forEach((worker) => {
      worker.numberOfWorkers = new Decimal(0);
      worker.cost = {
        ...getDefaultCostByWorkerName(worker.name),
        multiplier: 1,
      };
    });
  };

  const upgradeWorkers = (multipliers: number) => {
    workers.value.forEach((worker) => {
      worker.production.rate = worker.production.rate.times(multipliers);
    });
    baseWorkers.value.forEach((worker) => {
      worker.produce.rate = worker.produce.rate.times(multipliers);
    });
  };

  const decreaseWorkerCosts = (multiplier: number) => {
    workerStations.value.forEach((worker) => {
      worker.decreasePriceMultiplier(multiplier);
    });
  }

  return {
    workerStations,
    workers,
    baseWorkers,
    totalIncomePerSecond,
    gatherResources,
    calculateGeneratedResources,
    resetWorkers,
    upgradeWorkers,
    decreaseWorkerCosts
  };
};