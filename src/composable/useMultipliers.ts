import { ref } from "vue";
import { useMonsters } from "@/composable/useMonsters";
import { usePlayerStore } from "@/stores/usePlayerStore";
import type Decimal from "break_eternity.js";

const showMultipliers = ref(false);

export const useMultipliers = () => {
  const toggleMultipliers = () => {
    showMultipliers.value = !showMultipliers.value;
  };

  const getMultipliers = (): Record<string, Decimal> => {
    const store = usePlayerStore();

    const { dropMultiplier, monsterDamageMultiplier, monsterHealthMultiplier }  = useMonsters()

    return {
      attackMultiplier: store.attackMultiplier,
      healthMultiplier: store.healthMultiplier,
      blockingMultiplier: store.blockingMultiplier,
      productionMultiplier: store.productionRate,
      regenMultiplier: store.regenMultiplier,
      attackSpeedMultiplier: store.attackSpeedMultiplier,
      dropMultiplier: dropMultiplier.value,
      monsterDamageMultiplier: monsterDamageMultiplier.value,
      monsterHealthMultiplier: monsterHealthMultiplier.value
    };
  };

  return { showMultipliers, toggleMultipliers, getMultipliers };
};
