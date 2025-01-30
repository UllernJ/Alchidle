import { ref } from "vue";
import { usePlayer } from "../composable/usePlayer";
import { Infusion } from "../models/Infusion";
import { useGear } from "../composable/useGear";
import Decimal from "break_eternity.js";

const infusePower = new Infusion(
  "Power Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeAttackPower } = usePlayer();
    upgradeAttackPower();
  },
  new Decimal(1),
  "Increases attack power by 1.1x"
);

const infuseDefense = new Infusion(
  "Defense Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeDefensePower } = usePlayer();
    upgradeDefensePower();
  },
  new Decimal(1),
  "Increases defense by 1.1x"
);

const infuseEfficiency = new Infusion(
  "Efficiency Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeProductionRate } = usePlayer();
    upgradeProductionRate();
  },
  new Decimal(1),
  "Increases production rate by 1.1x"
);

const infuseHealth = new Infusion(
  "Health Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeHealth } = usePlayer();
    upgradeHealth();
  },
  new Decimal(1),
  "Increases health by 1.1x"
);

const infuseRegen = new Infusion(
  "Regen Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeRegen } = usePlayer();
    upgradeRegen();
  },
  new Decimal(1),
  "Increases health regeneration rate by 1.1x"
);

const infuseWeapon = new Infusion(
  "Weapon Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeWeapons } = useGear();
    upgradeWeapons();
  },
  new Decimal(1),
  "Increases all weapons damage by 1.1x"
);

const infuseArmor = new Infusion(
  "Armor Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeArmors } = useGear();
    upgradeArmors();
  },
  new Decimal(1),
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
