import { ref, type Ref } from "vue";
import { blacksmithingResearch, unlockAlchemyResearch } from "../data/research";

export enum TAB_STATE {
  ALL = "All",
  WORKERS = "Workers",
  BUILDINGS = "Buildings",
  RESEARCH = "Research",
  GEAR = "Gear",
  ALCHEMY = "Alchemy",
}

type Tab = {
  name: TAB_STATE;
  unlocked?: () => boolean;
  alert?: boolean;
};

const ALL = ref<Tab>({ name: TAB_STATE.ALL });
const BUILDINGS = ref<Tab>({ name: TAB_STATE.BUILDINGS });
const WORKERS = ref<Tab>({ name: TAB_STATE.WORKERS });
const RESEARCH = ref<Tab>({ name: TAB_STATE.RESEARCH });
export const GEAR = ref<Tab>({
  name: TAB_STATE.GEAR,
  unlocked: () => blacksmithingResearch.value.unlocked,
  alert: true,
});
export const ALCHEMY = ref<Tab>({
  name: TAB_STATE.ALCHEMY,
  unlocked: () => unlockAlchemyResearch.value.unlocked,
  alert: true,
});

const currentState = ref<TAB_STATE>(TAB_STATE.ALL);

export const useTab = () => {
  const setState = (val: Tab) => {
    currentState.value = val.name;
    if (val.alert) {
      val.alert = false;
    }
  };
  const getStates = (): Ref<Tab[]> => {
    return ref([
      ALL.value,
      WORKERS.value,
      BUILDINGS.value,
      RESEARCH.value,
      GEAR.value,
      ALCHEMY.value,
    ]);
  };
  return { currentState, setState, getStates };
};
