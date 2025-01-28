import { ref } from "vue";
import { MONEY } from "./useResource";
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
import { BigNumber } from "../models/BigNumber";

export type Weapon = {
  name: string;
  damage: number;
  path?: string;
  cost: BigNumber;
  quantity: number;
};

export type Armor = {
  name: string;
  defense: number;
  path?: string;
  cost: BigNumber;
  quantity: number;
};

const weapons = ref<Weapon[]>([
  {
    name: "Stick",
    damage: 1,
    cost: BigNumber.fromString("50"),
    path: stickIcon,
    quantity: 0,
  },
  {
    name: "Knife",
    damage: 2,
    cost: BigNumber.fromString("100"),
    path: knifeIcon,
    quantity: 0,
  },
  {
    name: "Axe",
    damage: 4,
    cost: BigNumber.fromString("200"),
    path: axeIcon,
    quantity: 0,
  },
  {
    name: "Sword",
    damage: 8,
    cost: BigNumber.fromString("400"),
    path: swordIcon,
    quantity: 0,
  },
  {
    name: "Mighty Blade",
    damage: 16,
    cost: BigNumber.fromString("1000"),
    path: mightyBladeIcon,
    quantity: 0,
  },
]);

const armors = ref<Armor[]>([
  { name: "Boots", defense: 1, cost: BigNumber.fromString("50"), path: bootsIcon, quantity: 0 },
  { name: "Hands", defense: 2, cost: BigNumber.fromString("100"), path: handsIcon, quantity: 0 },
  { name: "Pants", defense: 4, cost: BigNumber.fromString("200"), path: pantsIcon, quantity: 0 },
  { name: "Hjelmet", defense: 8, cost: BigNumber.fromString("400"), path: helmetIcon, quantity: 0 },
  { name: "Chestplate", defense: 16, cost: BigNumber.fromString("1000"), path: chestIcon, quantity: 0 },
]);

export const useGear = () => {
  const buyWeapon = (index: number) => {
    const weapon = weapons.value[index];
    if (MONEY.value.canAfford(weapon.cost)) {
      MONEY.value.deductAmount(weapon.cost);
      weapon.quantity++;
      weapon.cost.multiply([1.15]);
    }
  };

  const buyArmor = (index: number) => {
    const armor = armors.value[index];
    if (MONEY.value.canAfford(armor.cost)) {
      MONEY.value.deductAmount(armor.cost);
      armor.quantity++;
      armor.cost.multiply([1.15]);
    }
  };

  const upgradeWeapons = (multiplier: number = 1.1) => {
    weapons.value.forEach((weapon) => {
      weapon.damage *= multiplier;
    });
  };

  const upgradeArmors = (multiplier: number = 1.1) => {
    armors.value.forEach((armor) => {
      armor.defense *= multiplier;
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
