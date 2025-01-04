import { ref } from "vue";
import { RESOURCE } from "../types";

const currentFocus = ref<RESOURCE | null>(null);
const productionRate = ref<number>(1);

export const usePlayer = () => {
  const setFocus = (type: RESOURCE) => {
    currentFocus.value = type;
  };
  const upgradeProductionRate = () => {
    productionRate.value *= 2;
  };
  return { currentFocus, setFocus, productionRate, upgradeProductionRate };
};
