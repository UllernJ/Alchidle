import { Weapon } from "@/models/gear/Weapon";
import Decimal from "break_eternity.js";
import { defineStore } from "pinia";
import {
  axeIcon,
  bootsIcon,
  chestIcon,
  handsIcon,
  helmetIcon,
  knifeIcon,
  mightyBladeIcon,
  pantsIcon,
  stickIcon,
  swordIcon,
} from "@/icons/icons";
import { Armor } from "@/models/gear/Armor";
import { useResource } from "@/composable/useResource";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { computed } from "vue";

export const useGearStore = defineStore("gear", {
  state: () => {
    const weapons = [
      new Weapon(
        "Stick",
        new Decimal(1),
        new Decimal(50),
        new Decimal(0),
        stickIcon
      ),
      new Weapon(
        "Knife",
        new Decimal(2),
        new Decimal(100),
        new Decimal(0),
        knifeIcon
      ),
      new Weapon(
        "Axe",
        new Decimal(4),
        new Decimal(200),
        new Decimal(0),
        axeIcon
      ),
      new Weapon(
        "Sword",
        new Decimal(8),
        new Decimal(400),
        new Decimal(0),
        swordIcon
      ),
      new Weapon(
        "Mighty Blade",
        new Decimal(16),
        new Decimal(1000),
        new Decimal(0),
        mightyBladeIcon
      ),
    ];
    const armors = [
      new Armor(
        "Boots",
        new Decimal(5),
        new Decimal(50),
        new Decimal(0),
        bootsIcon
      ),
      new Armor(
        "Hands",
        new Decimal(10),
        new Decimal(100),
        new Decimal(0),
        handsIcon
      ),
      new Armor(
        "Pants",
        new Decimal(25),
        new Decimal(200),
        new Decimal(0),
        pantsIcon
      ),
      new Armor(
        "Helmet",
        new Decimal(50),
        new Decimal(400),
        new Decimal(0),
        helmetIcon
      ),
      new Armor(
        "Chestplate",
        new Decimal(100),
        new Decimal(1000),
        new Decimal(0),
        chestIcon
      ),
    ];
    return {
      weapons: weapons,
      armors: armors,
      costMultiplier: new Decimal(1),
    };
  },
  actions: {
    decreaseCostMultiplier(multiplier: number) {
      this.costMultiplier = this.costMultiplier.times(multiplier);
      this.weapons.forEach((weapon) =>
        weapon.decreaseCost(this.costMultiplier)
      );
      this.armors.forEach((armor) => armor.decreaseCost(this.costMultiplier));
    },
    upgradeWeapons(multiplier: number = 1.1) {
      this.weapons.forEach((weapon) => weapon.upgrade(multiplier));
    },
    upgradeArmors(multiplier: number = 1.1) {
      this.armors.forEach((armor) => armor.upgrade(multiplier));
    },
  },
  getters: {
    availableGear(state) {
        console.log("test")
      const { throttledMiningAmount } = useResource();
      const store = usePlayerStore();

      const getTotalPrice = (baseCost: Decimal, quantity: number): Decimal => {
        let total = new Decimal(0);
        let currentCost = baseCost;
        const multiplier = 1.15;

        for (let i = 0; i < quantity; i++) {
          total = total.add(currentCost);
          currentCost = currentCost.times(multiplier);
        }
        return total;
      };

      const weapons = computed(() =>
        state.weapons.map((weapon) => {
          const totalCost = getTotalPrice(weapon.cost, store.amountToBuy);
          return {
            item: weapon,
            isAffordable: throttledMiningAmount.value.gte(totalCost),
            totalCost,
          };
        })
      );

      const armors = computed(() =>
        state.armors.map((armor) => {
          const totalCost = getTotalPrice(armor.cost, store.amountToBuy);
          return {
            item: armor,
            isAffordable: throttledMiningAmount.value.gte(totalCost),
            totalCost,
          };
        })
      );

      return {
        weapons: weapons.value,
        armors: armors.value,
      };
    },
  },
});
