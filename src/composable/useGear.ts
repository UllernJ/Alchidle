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

export type Weapon = {
  name: string;
  damage: number;
  path?: string;
  cost: number;
  quantity: number;
};

export type Armor = {
  name: string;
  defense: number;
  path?: string;
  cost: number;
  quantity: number;
};

const weapons = ref<Weapon[]>([
  { name: "Stick", damage: 1, cost: 50, path: stickIcon, quantity: 0 },
  { name: "Knife", damage: 2, cost: 100, path: knifeIcon, quantity: 0 },
  { name: "Axe", damage: 5, cost: 200, path: axeIcon, quantity: 0 },
  { name: "Sword", damage: 10, cost: 400, path: swordIcon, quantity: 0 },
  {
    name: "Mighty Blade",
    damage: 20,
    cost: 1000,
    path: mightyBladeIcon,
    quantity: 0,
  },
]);

const armors = ref<Armor[]>([
  { name: "Boots", defense: 1, cost: 50, path: bootsIcon, quantity: 0 },
  { name: "Hands", defense: 2, cost: 100, path: handsIcon, quantity: 0 },
  { name: "Pants", defense: 5, cost: 200, path: pantsIcon, quantity: 0 },
  { name: "Hjelmet", defense: 10, cost: 400, path: helmetIcon, quantity: 0 },
  { name: "Chestplate", defense: 20, cost: 1000, path: chestIcon, quantity: 0 },
]);

export const useGear = () => {
  const { subtractResource, resources } = useResource();

  const buyWeapon = (index: number) => {
    const weapon = weapons.value[index];
    if (resources[RESOURCE.MINING].value >= weapon.cost) {
      subtractResource(RESOURCE.MINING, weapon.cost);
      weapon.quantity++;
      weapon.cost = Math.round(weapon.cost * 1.07);
    }
  };

  const buyArmor = (index: number) => {
    const armor = armors.value[index];
    if (resources[RESOURCE.MINING].value >= armor.cost) {
      subtractResource(RESOURCE.MINING, armor.cost);
      armor.quantity++;
      armor.cost = Math.round(armor.cost * 1.07);
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
