import { getBuildings } from "@/data/buildings";
import { defineStore } from "pinia";

export const useBuildingsStore = defineStore("buildings", {
  state: () => {
    const buildings = getBuildings();
    return {
      buildings: buildings.value,
    };
  },
});
