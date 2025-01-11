import { ref, type Ref } from "vue";
import { unlockAlchemy } from "../data/research";

export enum TAB_STATE {
  ALL = "All",
  BUILDINGS = "Buildings",
  WORKERS = "Workers",
  RESEARCH = "Research",
  GEAR = "Gear",
  ALCHEMY = "Alchemy",
}

type Tab = {
  name: TAB_STATE;
  unlocked?: () => boolean;
};

const ALL = ref<Tab>({ name: TAB_STATE.ALL });
const BUILDINGS = ref<Tab>({ name: TAB_STATE.BUILDINGS });
const WORKERS = ref<Tab>({ name: TAB_STATE.WORKERS });
const RESEARCH = ref<Tab>({ name: TAB_STATE.RESEARCH });
const GEAR = ref<Tab>({ name: TAB_STATE.GEAR });
const ALCHEMY = ref<Tab>({
  name: TAB_STATE.ALCHEMY,
  unlocked: () => unlockAlchemy.value.unlocked,
});

const currentState = ref<TAB_STATE>(TAB_STATE.ALL);

export const useTab = () => {
  const setState = (val: TAB_STATE) => {
    currentState.value = val;
  };
  const getStates = (): Ref<Tab[]> => {
    return ref([
      ALL.value,
      BUILDINGS.value,
      WORKERS.value,
      RESEARCH.value,
      GEAR.value,
      ALCHEMY.value,
    ]);
  };
  return { currentState, setState, getStates };
};
