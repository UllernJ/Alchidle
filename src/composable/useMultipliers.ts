import { ref } from "vue";
import { usePlayer } from "./usePlayer";
import { useMonsters } from "./useMonsters";

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

    const { dropMultiplier, monsterDamageMultiplier, monsterHealthMultiplier }  = useMonsters()

    return {
      attackMultiplier,
      healthMultiplier,
      blockingMultiplier,
      productionMultiplier: productionRate,
      regenMultiplier,
      attackSpeedMultiplier,
      dropMultiplier,
      monsterDamageMultiplier,
      monsterHealthMultiplier
    };
  };

  return { showMultipliers, toggleMultipliers, getMultipliers };
};
