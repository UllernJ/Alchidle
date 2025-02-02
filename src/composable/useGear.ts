import { ref } from "vue";
import { useResource } from "./useResource";
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
} from "../icons/icons";
import { RESOURCE } from "../types";
import Decimal from "break_eternity.js";

export type Weapon = {
  name: string;
  damage: Decimal;
  path?: string;
  cost: Decimal;
  quantity: Decimal;
};

export type Armor = {
  name: string;
  defense: Decimal;
  path?: string;
  cost: Decimal;
  quantity: Decimal;
};

const weapons = ref<Weapon[]>([
  { name: "Stick", damage: new Decimal(1), cost: new Decimal(50), path: stickIcon, quantity: new Decimal(0) },
  { name: "Knife", damage: new Decimal(2), cost: new Decimal(100), path: knifeIcon, quantity: new Decimal(0) },
  { name: "Axe", damage: new Decimal(4), cost: new Decimal(200), path: axeIcon, quantity: new Decimal(0) },
  { name: "Sword", damage: new Decimal(8), cost: new Decimal(400), path: swordIcon, quantity: new Decimal(0) },
  { name: "Mighty Blade", damage: new Decimal(16), cost: new Decimal(1000), path: mightyBladeIcon, quantity: new Decimal(0) },
]);

const armors = ref<Armor[]>([
  { name: "Boots", defense: new Decimal(1), cost: new Decimal(50), path: bootsIcon, quantity: new Decimal(0) },
  { name: "Hands", defense: new Decimal(2), cost: new Decimal(100), path: handsIcon, quantity: new Decimal(0) },
  { name: "Pants", defense: new Decimal(4), cost: new Decimal(200), path: pantsIcon, quantity: new Decimal(0) },
  { name: "Hjelmet", defense: new Decimal(8), cost: new Decimal(400), path: helmetIcon, quantity: new Decimal(0) },
  { name: "Chestplate", defense: new Decimal(16), cost: new Decimal(1000), path: chestIcon, quantity: new Decimal(0) },
]);

export const useGear = () => {
  const { subtractResource, resources } = useResource();

  const getTotalPrice = (baseCost: Decimal, quantity: number, multiplier: number = 1.15): Decimal => {
    let total = new Decimal(0);
    let currentCost = baseCost;

    for (let i = 0; i < quantity; i++) {
      total = total.add(currentCost);
      currentCost = currentCost.times(multiplier);
    }

    return total;
  };

  const buyWeapon = (index: number, quantity: number = 1) => {
    const weapon = weapons.value[index];
    const totalCost = getTotalPrice(weapon.cost, quantity);

    if (resources[RESOURCE.MINING].value.amount.gte(totalCost)) {
      subtractResource(RESOURCE.MINING, totalCost);
      weapon.quantity = weapon.quantity.plus(quantity);
      for (let i = 0; i < quantity; i++) {
        weapon.cost = weapon.cost.times(1.15).round();
      }
    }
  };

  const buyArmor = (index: number, quantity: number = 1) => {
    const armor = armors.value[index];
    const totalCost = getTotalPrice(armor.cost, quantity);

    if (resources[RESOURCE.MINING].value.amount.gte(totalCost)) {
      subtractResource(RESOURCE.MINING, totalCost);
      armor.quantity = armor.quantity.plus(quantity);
      for (let i = 0; i < quantity; i++) {
        armor.cost = armor.cost.times(1.15).round();
      }
    }
  };

  const upgradeWeapons = (multiplier: number = 1.1) => {
    weapons.value.forEach((weapon) => {
      weapon.damage = weapon.damage.times(multiplier);
    });
  };

  const upgradeArmors = (multiplier: number = 1.1) => {
    armors.value.forEach((armor) => {
      armor.defense = armor.defense.times(multiplier);
    });
  };

  return {
    weapons,
    armors,
    buyWeapon,
    buyArmor,
    upgradeWeapons,
    upgradeArmors,
  };
};