import { computed, ref } from "vue";
import { RESOURCE } from "../types";
import { useGear } from "./useGear";
import { PRIEST, TRAINER } from "../data/workers";
import Decimal from "break_eternity.js";

//!multipliers
const attackPowerMultiplier = ref<Decimal>(new Decimal(1));
const defencePowerMultiplier = ref<Decimal>(new Decimal(1));
const healthMultiplier = ref<Decimal>(new Decimal(1));
const regenMultiplier = ref<Decimal>(new Decimal(1));
const productionMultiplier = ref<Decimal>(new Decimal(1));
const productionRate = computed(() => new Decimal(200).times(productionMultiplier.value));

//!player stats
const health = ref<Decimal>(new Decimal(100));
const baseMaxHealth = ref<Decimal>(new Decimal(100));
const regen = computed(() => new Decimal(1).plus(PRIEST.value.getProduction()).times(regenMultiplier.value));

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
      (acc, weapon) => acc.plus(weapon.damage.times(weapon.quantity)),
      new Decimal(1)
    );
    return attackPowerMultiplier.value.times(weaponPower);
  });

  const defencePower = computed(() => {
    return defencePowerMultiplier.value.times(TRAINER.value.getProduction());
  });

  const maxHealth = computed(() => {
    const armor = armors.value.reduce(
      (acc, armor) => acc.plus(armor.defense.times(armor.quantity)),
      new Decimal(0)
    );
    return baseMaxHealth.value.plus(armor).times(healthMultiplier.value);
  });

  const regenHealth = (ticksPerSecond: number = 1) => {
    health.value = health.value.plus(regen.value.div(ticksPerSecond));
    if (health.value.greaterThan(maxHealth.value)) {
      health.value = maxHealth.value;
    }
  };

  const upgradeAttackPower = (multiplier: number = 1.1) => {
    attackPowerMultiplier.value = attackPowerMultiplier.value.times(multiplier);
  };

  const upgradeDefensePower = (multiplier: number = 1.1) => {
    defencePowerMultiplier.value = defencePowerMultiplier.value.times(multiplier);
  };

  const upgradeProductionRate = (multiplier: number = 1.1) => {
    productionMultiplier.value = productionMultiplier.value.times(multiplier);
  };

  const upgradeHealthMultiplier = (multiplier: number = 1.1) => {
    healthMultiplier.value = healthMultiplier.value.times(multiplier);
  };

  const upgradeRegen = (multiplier: number = 1.1) => {
    regenMultiplier.value = regenMultiplier.value.times(multiplier);
  };


  const resetMultipliers = () => {
    attackPowerMultiplier.value = new Decimal(1);
    defencePowerMultiplier.value = new Decimal(1);
    healthMultiplier.value = new Decimal(1);
    regenMultiplier.value = new Decimal(1);
    productionMultiplier.value = new Decimal(1);
  }

  return {
    amountToBuy,
    currentFocus,
    productionRate: computed(() => productionRate.value),
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
    upgradeHealthMultiplier,
    upgradeRegen,
    resetMultipliers
  };
};