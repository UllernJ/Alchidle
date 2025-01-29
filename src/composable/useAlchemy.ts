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
    count += infusion.workersAllocated;
  }
  return count;
});
const infusions = getInfusions();
const alchemyWorkers = ref({
  name: "Alchemist",
  numberOfWorkers: 0,
  efficiency: 1,
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
      employedAlchemists.value < alchemistCount.value &&
      infusions.value[index]
    ) {
      infusions.value[index].workersAllocated++;
    }
  };
  const deallocateAlchemist = (index: number) => {
    if (employedAlchemists.value > 0 && infusions.value[index]) {
      infusions.value[index].workersAllocated--;
    }
  };

  const buyAlchemist = (isStateLoad = false) => {
    const { resources, subtractResource } = useResource();
    if (alchemyWorkers.value.cost.value <= resources[RESOURCE.MONEY].value.amount || isStateLoad) {
      if (!isStateLoad) {
        subtractResource(RESOURCE.MONEY, alchemyWorkers.value.cost.value);
      }
      alchemyWorkers.value.numberOfWorkers++;
      alchemyWorkers.value.cost.value = alchemyWorkers.value.cost.value.pow(1.15).round();
    }
  };

  const upgradeAlchemists = () => {
    alchemyWorkers.value.efficiency *= 2;
  };

  const infusionProduction = (ticksPerSecond: number = 1) => {
    for (const infusion of infusions.value) {
      infusion.contribute(
        (infusion.workersAllocated * alchemyWorkers.value.efficiency) / ticksPerSecond
      );
    }
  };

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
  };
};
