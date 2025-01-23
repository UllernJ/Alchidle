import { ref } from "vue";
import { researchList } from "../data/research";

export const useResearch = () => {
  return { researchList: ref(researchList) };
};
