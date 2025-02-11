import { ref } from "vue";
import { usePlayer } from "./usePlayer";

const showMultipliers = ref(false);

export const useMultipliers = () => {
  const toggleMultipliers = () => {
    showMultipliers.value = !showMultipliers.value;
  };

  const getMultipliers = () => {
    const {
      attackMultiplier,
      blockingMultiplier,
      healthMultiplier,
      productionRate,
      regenMultiplier,
      attackSpeedMultiplier
    } = usePlayer();

    return {
      attackMultiplier,
      healthMultiplier,
      blockingMultiplier,
      productionMultiplier: productionRate,
      regenMultiplier,
      attackSpeedMultiplier
    };
  };

  return { showMultipliers, toggleMultipliers, getMultipliers };
};
