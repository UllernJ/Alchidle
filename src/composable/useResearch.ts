import type { Ref } from "vue";
import type { Research } from "../models/research/Research";
import { getResearchList } from "../data/research";

const researchList: Ref<Research[]> = getResearchList();

export const useResearch = () => {
  return { researchList };
};
