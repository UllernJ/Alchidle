import { ref } from "vue";
import { usePlayer } from "../composable/usePlayer";
import { Infusion } from "../models/Infusion";

const { upgradeAttackPower, upgradeDefensePower } = usePlayer();

const infusePower = new Infusion(
  "Power Infusion",
  100,
  0,
  () => {
    upgradeAttackPower();
  },
  1
);

const infuseDefense = new Infusion(
  "Defense Infusion",
  100,
  0,
  () => {
    upgradeDefensePower();
  },
  1
);

const infuseEfficiency = new Infusion(
  "Efficiency Infusion",
  100,
  0,
  () => {
    console.log("Efficiency Infusion applied");
  },
  1
);

const infuseHealth = new Infusion(
  "Health Infusion",
  100,
  0,
  () => {
    console.log("Health Infusion applied");
  },
  1
);

const infuseRegen = new Infusion(
  "Regen Infusion",
  100,
  0,
  () => {
    console.log("Regen Infusion applied");
  },
  1
);

const infuseWeapon = new Infusion(
  "Weapon Infusion",
  100,
  0,
  () => {
    console.log("Gear Infusion applied");
  },
  1
);

const infuseArmor = new Infusion(
  "Armor Infusion",
  100,
  0,
  () => {
    console.log("Armor Infusion applied");
  },
  1
);

export const getInfusions = () => {
  return ref([
    infusePower,
    infuseDefense,
    infuseEfficiency,
    infuseHealth,
    infuseRegen,
    infuseWeapon,
    infuseArmor,
  ]);
};
