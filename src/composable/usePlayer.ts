import { computed, ref } from "vue";
import { RESOURCE } from "../types";
import { useGear } from "./useGear";

const currentFocus = ref<RESOURCE | null>(null);
const productionRate = ref<number>(1);
const attackPowerMultiplier = ref<number>(1);
const defencePowerMultiplier = ref<number>(1);
const health = ref<number>(100);
const maxHealth = ref<number>(100);
const regen = ref<number>(1);

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
    return attackPowerMultiplier.value * weaponPower;
  });

  const defencePower = computed(() => {
    const armor = armors.value.reduce(
      (acc, armor) => acc + armor.defense * armor.quantity,
      0
    );
    return defencePowerMultiplier.value * armor;
  });

  const regenHealth = () => {
    health.value += regen.value;
    if (health.value > maxHealth.value) {
      health.value = maxHealth.value;
    }
  };

  const upgradeAttackPower = (multiplier: number = 1.1) => {
    attackPowerMultiplier.value *= multiplier;
  };

  const upgradeDefensePower = (multiplier: number = 1.1) => {
    defencePowerMultiplier.value *= multiplier;
  };

  return {
    currentFocus,
    setFocus,
    productionRate,
    upgradeProductionRate,
    attackPower,
    defencePower,
    health,
    maxHealth,
    regen,
    regenHealth,
    upgradeAttackPower,
    upgradeDefensePower,
  };
};
