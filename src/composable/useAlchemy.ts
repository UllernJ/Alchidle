import { computed, ref } from "vue";
import { useWorkers } from "./useWorkers";
import { getInfusions } from "../data/alchemy";

const { alchemists } = useWorkers();
const alchemistCount = computed(() => alchemists.value?.numberOfWorkers || 0);
const employedAlchemists = ref<number>(0);
const infusions = getInfusions();

export const useAlchemy = () => {
  const allocateAlchemist = (index: number) => {
    if (
      employedAlchemists.value < alchemistCount.value &&
      infusions.value[index]
    ) {
      employedAlchemists.value++;
      infusions.value[index].workersAllocated++;
    }
  };
  const deallocateAlchemist = (index: number) => {
    if (employedAlchemists.value > 0 && infusions.value[index]) {
      employedAlchemists.value--;
      infusions.value[index].workersAllocated--;
    }
  };

  return {
    infusions,
    alchemistCount,
    employedAlchemists,
    allocateAlchemist,
    deallocateAlchemist,
  };
};
