import { defineStore } from "pinia";
import { RESOURCE } from "../types";
import { useGear } from "@/composable/useGear";
import Decimal from "break_eternity.js";
import { isDev } from "@/utils/dev";
import { useWorkersStore } from "@/stores/useWorkerStore";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    // Multipliers
    attackMultiplier: new Decimal(1),
    blockingMultiplier: new Decimal(1),
    healthMultiplier: new Decimal(1),
    regenMultiplier: new Decimal(1),
    productionMultiplier: new Decimal(1),
    attackSpeedMultiplier: new Decimal(1),

    // Player stats
    health: new Decimal(100),
    baseMaxHealth: new Decimal(100),

    // Player controls
    currentFocus: null as RESOURCE | null,
    amountToBuy: 1,
  }),

  getters: {
    productionRate: (state) => {
      return new Decimal(isDev ? 2000000000 : 1).times(
        state.productionMultiplier
      );
    },

    regen: (state) => {
      const store = useWorkersStore();
      return new Decimal(1)
        .plus(store.priest.getProduction())
        .times(state.regenMultiplier);
    },

    attackPower: (state) => {
      const { weapons } = useGear();
      const weaponPower = weapons.value.reduce(
        (acc, weapon) => acc.plus(weapon.damage.times(weapon.quantity)),
        new Decimal(1)
      );
      return state.attackMultiplier.times(weaponPower);
    },

    defencePower: (state) => {
      const store = useWorkersStore();
      return state.blockingMultiplier.times(store.trainer.getProduction());
    },

    maxHealth: (state) => {
      const { armors } = useGear();
      const armor = armors.value.reduce(
        (acc, armor) => acc.plus(armor.defense.times(armor.quantity)),
        new Decimal(0)
      );
      return state.baseMaxHealth.plus(armor).times(state.healthMultiplier);
    },
  },

  actions: {
    setFocus(type: RESOURCE) {
      this.currentFocus = type;
    },

    regenHealth(deltaTime: number) {
      this.health = this.health.plus(this.regen.times(deltaTime));
      if (this.health.greaterThan(this.maxHealth)) {
        this.health = this.maxHealth;
      }
    },

    upgradeAttackPower(multiplier: number = 1.1) {
      this.attackMultiplier = this.attackMultiplier.times(multiplier);
    },

    upgradeDefensePower(multiplier: number = 1.1) {
      this.blockingMultiplier = this.blockingMultiplier.times(multiplier);
    },

    upgradeProductionRate(multiplier: number = 1.1) {
      this.productionMultiplier = this.productionMultiplier.times(multiplier);
    },

    upgradeHealthMultiplier(multiplier: number = 1.1) {
      this.healthMultiplier = this.healthMultiplier.times(multiplier);
    },

    upgradeRegen(multiplier: number = 1.1) {
      this.regenMultiplier = this.regenMultiplier.times(multiplier);
    },

    upgradeAttackSpeed(multiplier: number = 1.1) {
      this.attackSpeedMultiplier = this.attackSpeedMultiplier.times(multiplier);
    },
    takeDamage(amount: Decimal) {
      this.health = this.health.minus(amount);
      if (this.health.lessThan(0)) {
        this.health = new Decimal(0);
      }
    },
  },
});
