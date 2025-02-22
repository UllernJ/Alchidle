import { ref } from "vue";
import { Infusion } from "@/models/Infusion";
import Decimal from "break_eternity.js";
import { Alchemist } from "@/models/worker/Alchemist";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useGearStore } from "@/stores/useGearStore";

const defaultInfusePower = () => new Infusion(
  "Power Infusion",
  new Decimal(100),
  new Decimal(0),
  () => {
    const { upgradeAttackPower } = usePlayerStore();
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
    const { upgradeDefensePower } = usePlayerStore();
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
    const { upgradeProductionRate } = usePlayerStore();
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
    const { upgradeHealthMultiplier } = usePlayerStore();
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
    const { upgradeRegen } = usePlayerStore();
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
    const { upgradeWeapons } = useGearStore();
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
    const { upgradeArmors } = useGearStore();
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
