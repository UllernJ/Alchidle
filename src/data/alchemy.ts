import { ref } from "vue";
import { usePlayer } from "../composable/usePlayer";
import { Infusion } from "../models/Infusion";
import { useGear } from "../composable/useGear";

const {
  upgradeAttackPower,
  upgradeDefensePower,
  upgradeProductionRate,
  upgradeRegen,
  upgradeHealth,
} = usePlayer();

const { upgradeWeapons, upgradeArmors } = useGear();

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
    upgradeProductionRate();
  },
  1
);

const infuseHealth = new Infusion(
  "Health Infusion",
  100,
  0,
  () => {
    upgradeHealth();
  },
  1
);

const infuseRegen = new Infusion(
  "Regen Infusion",
  100,
  0,
  () => {
    upgradeRegen();
  },
  1
);

const infuseWeapon = new Infusion(
  "Weapon Infusion",
  100,
  0,
  () => {
    upgradeWeapons();
  },
  1
);

const infuseArmor = new Infusion(
  "Armor Infusion",
  100,
  0,
  () => {
    upgradeArmors();
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
