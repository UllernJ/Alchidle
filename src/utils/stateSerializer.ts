import type { Building } from "../composable/useBuildings";
import type { Armor, Weapon } from "../composable/useGear";
import type { Monster } from "../models/Monster";
import {
  alchemyLabIcon,
  bankIcon,
  mineIcon,
  scienceLabIcon,
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
  alchemistIcon,
  bankerIcon,
  minerIcon,
  scientistIcon,
  badGnomeIcon,
  trollIcon,
  vampireIcon,
} from "../icons/icons";
import type { WorkerStation } from "../types";
import type { SessionState } from "./localStorage";

const iconMap: { [key: string]: string } = {
  Mine: mineIcon,
  "Alchemy Lab": alchemyLabIcon,
  "Science Lab": scienceLabIcon,
  Bank: bankIcon,
  Stick: stickIcon,
  Knife: knifeIcon,
  Axe: axeIcon,
  Sword: swordIcon,
  "Mighty Blade": mightyBladeIcon,
  Boots: bootsIcon,
  Hands: handsIcon,
  Pants: pantsIcon,
  Hjelmet: helmetIcon,
  Chestplate: chestIcon,
  Banker: bankerIcon,
  Miner: minerIcon,
  Alchemist: alchemistIcon,
  Scientist: scientistIcon,
  Gnome: badGnomeIcon,
  Troll: trollIcon,
  Vampire: vampireIcon,
};

export const serializeState = (state: SessionState) => {
  const serializedState = JSON.parse(JSON.stringify(state));
  serializedState.buildings.forEach((building: Building) => {
    delete building.icon;
  });
  serializedState.weapons.forEach((weapon: Weapon) => {
    delete weapon.path;
  });
  serializedState.armors.forEach((armor: Armor) => {
    delete armor.path;
  });
  serializedState.workerStations.forEach((station: WorkerStation) => {
    delete station.icon;
  });
  serializedState.adventure.remainingMonsters.forEach((monster: Monster) => {
    delete monster.icon;
  });
  return serializedState;
};

export const deserializeState = (state: SessionState) => {
  state.buildings.forEach((building: Building) => {
    building.icon = iconMap[building.name];
  });
  state.weapons.forEach((weapon: Weapon) => {
    weapon.path = iconMap[weapon.name];
  });
  state.armors.forEach((armor: Armor) => {
    armor.path = iconMap[armor.name];
  });
  state.workerStations.forEach((station: WorkerStation) => {
    station.icon = iconMap[station.name];
  });
  state.adventure.remainingMonsters.forEach((monster: Monster) => {
    monster.icon = iconMap[monster.name];
  });
  return state;
};
