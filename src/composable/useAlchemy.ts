import { computed, ref } from "vue";
import { getInfusions } from "../data/alchemy";
import { RESOURCE } from "../types";
import { alchemyIcon } from "../icons/icons";
import { useResource } from "./useResource";
import { isDev } from "../utils/dev";
import { unlockAlchemyResearch } from "../data/research";
import Decimal from "break_eternity.js";

const employedAlchemists = computed(() => {
  let count = 0;
  for (const infusion of infusions.value) {
    count += infusion.workersAllocated.toNumber();
  }
  return count;
});
const infusions = getInfusions();
const alchemyWorkers = ref({
  name: "Alchemist",
  numberOfWorkers: new Decimal(0),
  efficiency: new Decimal(1),
  cost: {
    key: RESOURCE.MONEY,
    value: isDev ? new Decimal(10) : new Decimal(100),
  },
  required: () => unlockAlchemyResearch.value.unlocked,
  icon: alchemyIcon,
});
const alchemistCount = computed(
  () => alchemyWorkers.value.numberOfWorkers || 0
);

export const useAlchemy = () => {
  const allocateAlchemist = (index: number) => {
    if (
      employedAlchemists.value <
        alchemyWorkers.value.numberOfWorkers.toNumber() &&
      infusions.value[index]
    ) {
      infusions.value[index].allocateWorkers(1);
    }
  };
  const deallocateAlchemist = (index: number) => {
    if (employedAlchemists.value > 0 && infusions.value[index]) {
      infusions.value[index].deallocateWorkers(1);
    }
  };

  const buyAlchemist = (isStateLoad = false) => {
    const { resources, subtractResource } = useResource();
    if (
      alchemyWorkers.value.cost.value <=
        resources[RESOURCE.MONEY].value.amount ||
      isStateLoad
    ) {
      if (!isStateLoad) {
        subtractResource(RESOURCE.MONEY, alchemyWorkers.value.cost.value);
      }
      alchemyWorkers.value.numberOfWorkers =
        alchemyWorkers.value.numberOfWorkers.plus(1);
      alchemyWorkers.value.cost.value = alchemyWorkers.value.cost.value
        .pow(1.15)
        .round();
    }
  };

  const upgradeAlchemists = () => {
    if (
      alchemyWorkers.value.cost.value.lte(
        useResource().resources[RESOURCE.MONEY].value.amount
      )
    ) {
      useResource().subtractResource(
        RESOURCE.MONEY,
        alchemyWorkers.value.cost.value
      );
      alchemyWorkers.value.efficiency =
        alchemyWorkers.value.efficiency.times(1.1);
      alchemyWorkers.value.cost.value = alchemyWorkers.value.cost.value
        .times(1.15)
        .round();
    }
  };

  const infusionProduction = (ticksPerSecond: number = 1) => {
    for (const infusion of infusions.value) {
      infusion.contribute(
        infusion.workersAllocated
          .times(alchemyWorkers.value.efficiency)
          .div(ticksPerSecond)
      );
    }
  };

  const resetAlchemy = () => {
    alchemyWorkers.value.numberOfWorkers = new Decimal(0);
    alchemyWorkers.value.efficiency = new Decimal(1);
    alchemyWorkers.value.cost.value = new Decimal(100);
    infusions.value.forEach((infusion) => {
      infusion.workersAllocated = new Decimal(0);
      infusion.contribution = new Decimal(0);
      infusion.cost = new Decimal(100)
    });
  }

  return {
    infusions,
    alchemistCount,
    employedAlchemists,
    allocateAlchemist,
    deallocateAlchemist,
    alchemyWorkers,
    buyAlchemist,
    upgradeAlchemists,
    infusionProduction,
    resetAlchemy
  };
};
