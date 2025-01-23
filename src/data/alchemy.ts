import { ref } from "vue";
import { usePlayer } from "../composable/usePlayer";
import { Infusion } from "../models/Infusion";
import { useGear } from "../composable/useGear";

const { upgradeWeapons, upgradeArmors } = useGear();

const infusePower = new Infusion(
  "Power Infusion",
  100,
  0,
  () => {
    const { upgradeAttackPower } = usePlayer();
    upgradeAttackPower();
  },
  1,
  "Increases attack power by 1.1x"
);

const infuseDefense = new Infusion(
  "Defense Infusion",
  100,
  0,
  () => {
    const { upgradeDefensePower } = usePlayer();
    upgradeDefensePower();
  },
  1,
  "Increases defense by 1.1x"
);

const infuseEfficiency = new Infusion(
  "Efficiency Infusion",
  100,
  0,
  () => {
    const { upgradeProductionRate } = usePlayer();
    upgradeProductionRate();
  },
  1,
  "Increases production rate by 1.1x"
);

const infuseHealth = new Infusion(
  "Health Infusion",
  100,
  0,
  () => {
    const { upgradeHealth } = usePlayer();
    upgradeHealth();
  },
  1,
  "Increases health by 1.1x"
);

const infuseRegen = new Infusion(
  "Regen Infusion",
  100,
  0,
  () => {
    const { upgradeRegen } = usePlayer();
    upgradeRegen();
  },
  1,
  "Increases health regeneration rate by 1.1x"
);

const infuseWeapon = new Infusion(
  "Weapon Infusion",
  100,
  0,
  () => {
    upgradeWeapons();
  },
  1,
  "Increases all weapons damage by 1.1x"
);

const infuseArmor = new Infusion(
  "Armor Infusion",
  100,
  0,
  () => {
    upgradeArmors();
  },
  1,
  "Increases all armors defense by 1.1x"
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
