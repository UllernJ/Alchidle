import { getResearchs } from "@/data/research";
import { defineStore } from "pinia";

export const useResearchStore = defineStore("research", {
  state: () => {
    const researchs = getResearchs();
    return {
        researchList: researchs
    }
  }
});
