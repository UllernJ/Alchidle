import { ref } from "vue";
import { RESOURCE } from "../types";

const currentFocus = ref<RESOURCE | null>(null);
export const usePlayer = () => {
  const setFocus = (type: RESOURCE) => {
    currentFocus.value = type;
  };
  return { currentFocus, setFocus };
};
