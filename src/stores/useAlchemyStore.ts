import { defaultAlchemist, getInfusions } from "@/data/alchemy";
import { defineStore } from "pinia";
import { useResource } from "@/composable/useResource";
import { RESOURCE } from "@/types";

export const useAlchemyStore = defineStore("alchemy", {
  state: () => {
    const alchemist = defaultAlchemist();
    const infusions = getInfusions();
    return {
      alchemist,
      infusions,
    };
  },

  getters: {
    employedAlchemists: (state) => {
      let count = 0;
      for (const infusion of state.infusions) {
        count += infusion.workersAllocated.toNumber();
      }
      return count;
    },
    alchemistCount: (state) => state.alchemist.numberOfWorkers || 0,
  },

  actions: {
    allocateAlchemist(index: number) {
      if (
        this.employedAlchemists < this.alchemist.numberOfWorkers.toNumber() &&
        this.infusions[index]
      ) {
        this.infusions[index].allocateWorkers(1);
      }
    },

    deallocateAlchemist(index: number) {
      if (this.employedAlchemists > 0 && this.infusions[index]) {
        this.infusions[index].deallocateWorkers(1);
      }
    },

    buyAlchemist(isStateLoad = false) {
      const { resources, subtractResource } = useResource();
      if (
        this.alchemist.cost.value.lte(resources[RESOURCE.MONEY].value.amount) ||
        isStateLoad
      ) {
        if (!isStateLoad) {
          subtractResource(RESOURCE.MONEY, this.alchemist.cost.value);
        }
        this.alchemist.numberOfWorkers = this.alchemist.numberOfWorkers.plus(1);
        this.alchemist.cost.value = this.alchemist.cost.value.pow(1.15).round();
      }
    },

    upgradeAlchemists() {
      const { resources, subtractResource } = useResource();
      if (this.alchemist.cost.value.lte(resources[RESOURCE.MONEY].value.amount)) {
        subtractResource(RESOURCE.MONEY, this.alchemist.cost.value);
        this.alchemist.upgrade();
      }
    },

    infusionProduction(deltaTime: number) {
      for (const infusion of this.infusions) {
        infusion.contribute(
          infusion.workersAllocated
            .times(this.alchemist.efficiency)
            .times(deltaTime)
        );
      }
    },

    upgradeAlchemyEfficiency(multiplier: number = 1.1) {
      this.alchemist.upgrade(multiplier);
    }
  }
});