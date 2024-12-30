import { ref } from "vue";

const state = ref<TAB_STATE | null>(null)

export enum TAB_STATE {
    BUILDINGS = "Buildings",
    WORKERS = "Workers",
    RESEARCH = "Research",
    GEAR = "Gear"
}

export const useTab = () => {
    const setState = (val: TAB_STATE) => {
        state.value = val
    } 
    const getStates = () => {
        return Object.values(TAB_STATE)
    }
    return {state, setState, getStates}
}