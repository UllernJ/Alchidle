import { defaultAlchemist, getInfusions } from "@/data/alchemy";
import { defineStore } from "pinia";

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
    }
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

    infusionProduction(deltaTime: number) {
      for (const infusion of this.infusions) {
        infusion.contribute(
          infusion.workersAllocated
            .times(this.alchemist.efficiency)
            .times(deltaTime)
        );
      }
    },
  }
});