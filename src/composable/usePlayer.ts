import { computed, ref } from "vue";
import { RESOURCE } from "../types";
import { useGear } from "./useGear";
import Decimal from "break_eternity.js";
import { isDev } from "@/utils/dev";
import { useWorkersStore } from "@/stores/useWorkerStore";

//!multipliers
const attackMultiplier = ref<Decimal>(new Decimal(1));
const blockingMultiplier = ref<Decimal>(new Decimal(1));
const healthMultiplier = ref<Decimal>(new Decimal(1));
const regenMultiplier = ref<Decimal>(new Decimal(1));
const productionMultiplier = ref<Decimal>(new Decimal(1));
const productionRate = computed(() =>
  new Decimal(isDev ? 2000000000 : 1).times(productionMultiplier.value)
);
const attackSpeedMultiplier = ref<Decimal>(new Decimal(1));

//!player stats
const health = ref<Decimal>(new Decimal(100));
const baseMaxHealth = ref<Decimal>(new Decimal(100));

//!player controls
const currentFocus = ref<RESOURCE | null>(null);
const amountToBuy = ref<number>(1);

export const usePlayer = () => {
  const store = useWorkersStore();
  
  const regen = computed(() =>
    new Decimal(1).plus(store.priest.getProduction()).times(regenMultiplier.value)
  );



  const { armors, weapons } = useGear();
  const setFocus = (type: RESOURCE) => {
    currentFocus.value = type;
  };

  const attackPower = computed(() => {
    const weaponPower = weapons.value.reduce(
      (acc, weapon) => acc.plus(weapon.damage.times(weapon.quantity)),
      new Decimal(1)
    );
    return attackMultiplier.value.times(weaponPower);
  });

  const defencePower = computed(() => {
    return blockingMultiplier.value.times(store.trainer.getProduction());
  });

  const maxHealth = computed(() => {
    const armor = armors.value.reduce(
      (acc, armor) => acc.plus(armor.defense.times(armor.quantity)),
      new Decimal(0)
    );
    return baseMaxHealth.value.plus(armor).times(healthMultiplier.value);
  });

  const regenHealth = (deltaTime: number) => {
    health.value = health.value.plus(regen.value.times(deltaTime));
    if (health.value.greaterThan(maxHealth.value)) {
      health.value = maxHealth.value;
    }
  };

  const upgradeAttackPower = (multiplier: number = 1.1) => {
    attackMultiplier.value = attackMultiplier.value.times(multiplier);
  };

  const upgradeDefensePower = (multiplier: number = 1.1) => {
    blockingMultiplier.value =
    blockingMultiplier.value.times(multiplier);
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

  const upgradeAttackSpeed = (multiplier: number = 1.1) => {
    attackSpeedMultiplier.value = attackSpeedMultiplier.value.times(multiplier);
  }

  const resetMultipliers = () => {
    attackMultiplier.value = new Decimal(1);
    blockingMultiplier.value = new Decimal(1);
    healthMultiplier.value = new Decimal(1);
    regenMultiplier.value = new Decimal(1);
    productionMultiplier.value = new Decimal(1);
    attackSpeedMultiplier.value = new Decimal(1);
  };

  return {
    amountToBuy,
    currentFocus,
    productionRate: computed(() => productionRate.value),
    attackPower,
    defencePower,
    health,
    maxHealth,
    regen,
    attackMultiplier,
    blockingMultiplier,
    healthMultiplier,
    regenMultiplier,
    attackSpeedMultiplier,
    setFocus,
    upgradeProductionRate,
    regenHealth,
    upgradeAttackPower,
    upgradeDefensePower,
    upgradeHealthMultiplier,
    upgradeRegen,
    upgradeAttackSpeed,
    resetMultipliers,
  };
};