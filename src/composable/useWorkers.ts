import { computed } from "vue";
import Decimal from "break_eternity.js";
import { useResource } from "@/composable/useResource";
import { RESOURCE } from "@/types";
import { useWorkersStore } from "@/stores/useWorkerStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

//todo make this more readable
export const useWorkers = () => {
  const store = useWorkersStore();
  const { addResource } = useResource();

  const totalIncomePerSecond = computed(() => {
    const { currentFocus, productionRate } = usePlayerStore();
    const incomePerResource = {} as Partial<Record<RESOURCE, Decimal>>;

    store.resourceWorkers.forEach(({ production, numberOfWorkers }) => {
      const rate = production.rate.times(numberOfWorkers);
      incomePerResource[production.resource] = (
        incomePerResource[production.resource] || new Decimal(0)
      ).plus(rate);
    });

    if (currentFocus !== null) {
      incomePerResource[currentFocus] = (
        incomePerResource[currentFocus] || new Decimal(0)
      ).plus(productionRate);
    }

    return incomePerResource;
  });

  const gatherResources = (deltaTime: number) => {
    const { currentFocus, productionRate } = usePlayerStore();
    if (currentFocus !== null) {
      addResource(currentFocus, productionRate.times(deltaTime));
    }
    store.resourceWorkers.forEach((station) => {
      const generated = station.production.rate
        .times(station.numberOfWorkers)
        .times(deltaTime);
      addResource(station.production.resource, generated);
    });
  };

  const calculateGeneratedResources = (elapsedTime: number) => {
    const generated: Record<string, Decimal> = {};
    store.resourceWorkers.forEach((station) => {
      const rate = station.production.rate.times(station.numberOfWorkers);
      const amount = rate.times(elapsedTime).div(4).floor();
      generated[station.production.resource] = (
        generated[station.production.resource] || new Decimal(0)
      ).plus(amount);
      addResource(station.production.resource, amount);
    });
    return generated;
  };

  const upgradeWorkers = (multipliers: number) => {
    store.resourceWorkers.forEach((worker) => {
      worker.production.rate = worker.production.rate.times(multipliers);
    });
    store.effectWorkers.forEach((worker) => {
      worker.produce.rate = worker.produce.rate.times(multipliers);
    });
  };

  const decreaseWorkerCosts = (multiplier: number) => {
    store.workers.forEach((worker) => {
      worker.decreasePriceMultiplier(multiplier);
    });
  };

  return {
    totalIncomePerSecond,
    gatherResources,
    calculateGeneratedResources,
    upgradeWorkers,
    decreaseWorkerCosts,
  };
};
