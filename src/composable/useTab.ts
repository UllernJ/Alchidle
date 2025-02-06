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
    saveTabState();
  };

  const states: Ref<Tab[]> = ref([
    ALL.value,
    WORKERS.value,
    BUILDINGS.value,
    RESEARCH.value,
    GEAR.value,
    ALCHEMY.value,
  ]);

  const saveTabState = () => {
    const stateToSave = {
      currentState: currentState.value,
      states: states.value.map((tab) => ({
        name: tab.name,
        alert: tab.alert,
      })),
    };
    localStorage.setItem("tabState", JSON.stringify(stateToSave));
  };

  const loadTabState = () => {
    const savedState = localStorage.getItem("tabState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      currentState.value = parsedState.currentState;
      parsedState.states.forEach((savedTab: Tab) => {
        const tab = states.value.find((t) => t.name === savedTab.name);
        if (tab) {
          tab.alert = savedTab.alert;
        }
      });
    }
  };

  const clearTabState = () => {
    localStorage.removeItem("tabState");
  }

  const resetTabState = () => {
    currentState.value = TAB_STATE.ALL;
    GEAR.value.alert = true;
    ALCHEMY.value.alert = true;
    clearTabState();
    saveTabState();
  }

  return { currentState, setState, states, loadTabState, resetTabState };
};