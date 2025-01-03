import { ref } from "vue";

export enum TAB_STATE {
  ALL = "All",
  BUILDINGS = "Buildings",
  WORKERS = "Workers",
  RESEARCH = "Research",
  EQUIPMENT = "Equipment",
  ALCHEMY = "Alchemy",
}
const currentState = ref<TAB_STATE>(TAB_STATE.WORKERS);

export const useTab = () => {
  const setState = (val: TAB_STATE) => {
    currentState.value = val;
  };
  const getStates = () => {
    return Object.values(TAB_STATE);
  };
  return { currentState, setState, getStates };
};
