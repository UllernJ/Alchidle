import { computed, ref } from "vue";
import { RESOURCE } from "../types";
import { useGear } from "./useGear";

const currentFocus = ref<RESOURCE | null>(null);
const productionRate = ref<number>(1);
const baseAttackPower = 1;
const health = ref<number>(100);

export const usePlayer = () => {
  const { armors, weapons } = useGear();
  const setFocus = (type: RESOURCE) => {
    currentFocus.value = type;
  };
  const upgradeProductionRate = () => {
    productionRate.value *= 2;
  };

  const attackPower = computed(() => {
    const weaponPower = weapons.value.reduce(
      (acc, weapon) => acc + weapon.damage * weapon.quantity,
      0
    );
    return baseAttackPower + weaponPower;
  });

  const defencePower = computed(() => {
    return armors.value.reduce(
      (acc, armor) => acc + armor.defense * armor.quantity,
      0
    );
  });

  return {
    currentFocus,
    setFocus,
    productionRate,
    upgradeProductionRate,
    attackPower,
    defencePower,
    health,
  };
};
