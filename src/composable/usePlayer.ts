import { computed, ref } from "vue";
import { RESOURCE } from "../types";
import { useGear } from "./useGear";
import { isDev } from "../utils/dev";
import { useResource } from "./useResource";
import { PRIEST, TRAINER } from "../data/workers";

//!multipliers
const attackPowerMultiplier = ref<number>(isDev ? 1000 : 1);
const defencePowerMultiplier = ref<number>(isDev ? 1000 : 1);
const healthMultiplier = ref<number>(isDev ? 1000 : 1);
const regenMultiplier = ref<number>(isDev ? 1000 : 1);
const productionRate = ref<number>(isDev ? 100 : 1);

//!player stats
const health = ref<number>(100);
const baseMaxHealth = ref<number>(100);
const regen = computed(() => (1 + 1 * PRIEST.value.numberOfWorkers) * regenMultiplier.value);

//!player controls
const currentFocus = ref<RESOURCE | null>(null);
const amountToBuy = ref<number>(1);

export const usePlayer = () => {
  const { armors, weapons } = useGear();
  const setFocus = (type: RESOURCE) => {
    currentFocus.value = type;
  };

  const attackPower = computed(() => {
    const weaponPower = weapons.value.reduce(
      (acc, weapon) => acc + weapon.damage * weapon.quantity,
      1
    );
    return attackPowerMultiplier.value * weaponPower;
  });

  const defencePower = computed(() => {
    return defencePowerMultiplier.value * (TRAINER.value.numberOfWorkers * 5);
  });

  const maxHealth = computed(() => {
    const armor = armors.value.reduce(
      (acc, armor) => acc + armor.defense * armor.quantity,
      0
    );
    return (baseMaxHealth.value + armor) * healthMultiplier.value;
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

  const upgradeProductionRate = (multiplier: number = 1.1) => {
    productionRate.value *= multiplier;
  };

  const upgradeHealth = (multiplier: number = 1.1) => {
    healthMultiplier.value *= multiplier;
  };

  const upgradeRegen = (multiplier: number = 1.1) => {
    regenMultiplier.value *= multiplier;
  };

  const setProductionRate = (value: number) => {
    productionRate.value = value;
  };

  const faint = () => {
    const { subtractResource, resources } = useResource();
    Object.values(RESOURCE).forEach((key) => {
      const resource = resources[key as RESOURCE].value;
      subtractResource(key as RESOURCE, resource * 0.1);
    });
  };

  return {
    amountToBuy,
    currentFocus,
    productionRate: computed(() => Math.round(productionRate.value)),
    attackPower,
    defencePower,
    health,
    maxHealth,
    regen,
    attackPowerMultiplier,
    defencePowerMultiplier,
    healthMultiplier,
    regenMultiplier,
    setFocus,
    upgradeProductionRate,
    regenHealth,
    upgradeAttackPower,
    upgradeDefensePower,
    upgradeHealth,
    upgradeRegen,
    faint,
    setProductionRate,
  };
};
