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
      defenceMultiplier,
      healthMultiplier,
      productionRate,
      regenMultiplier
    } = usePlayer();

    return {
      attackMultiplier,
      defenceMultiplier,
      healthMultiplier,
      productionRate,
      regenMultiplier
    };
  };

  return { showMultipliers, toggleMultipliers, getMultipliers };
};
