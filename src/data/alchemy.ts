import { ref } from "vue";
import { usePlayer } from "../composable/usePlayer";
import { Infusion } from "../models/Infusion";
import { useGear } from "../composable/useGear";
import Decimal from "break_eternity.js";
import { Alchemist } from "@/models/worker/Alchemist";

const defaultInfusePower = () => new Infusion(
  "Power Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeAttackPower } = usePlayer();
    upgradeAttackPower();
  },
  new Decimal(1),
  "Increases attack by 1.1x"
);

const defaultInfuseDefense = () => new Infusion(
  "Block Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeDefensePower } = usePlayer();
    upgradeDefensePower();
  },
  new Decimal(1),
  "Increases blocking multiplier by 1.1x"
);

const defaultInfuseEfficiency = () => new Infusion(
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

const defaultInfuseHealth = () => new Infusion(
  "Health Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeHealthMultiplier } = usePlayer();
    upgradeHealthMultiplier();
  },
  new Decimal(1),
  "Increases health by 1.1x"
);

const defaultInfuseRegen = () => new Infusion(
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

const defaultInfuseWeapon = () => new Infusion(
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

const defaultInfuseArmor = () => new Infusion(
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

export const defaultAlchemist = () => new Alchemist();


export const getInfusions = () => {
  return ref([
    defaultInfusePower(),
    defaultInfuseDefense(),
    defaultInfuseEfficiency(),
    defaultInfuseHealth(),
    defaultInfuseRegen(),
    defaultInfuseWeapon(),
    defaultInfuseArmor(),
  ]);
};
