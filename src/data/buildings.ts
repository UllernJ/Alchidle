import { ref } from "vue";
import Decimal from "break_eternity.js";
import { RESOURCE } from "../types";
import { bankIcon, hospitalIcon, hutIcon, mineIcon, scienceLabIcon } from "../icons/icons";
import { isDev } from "../utils/dev";
import { Building } from "../models/Building";
import { useResource } from "../composable/useResource";
import { usePlayer } from "../composable/usePlayer";
import { BANKER, MINER, SCIENTIST } from "./workers";
import { hostpitalBlueprintResearch, workerHutBlueprintResearch } from "./research";

const { upgradeStorage } = useResource();

const BANK = new Building(
  "Bank",
  [
    {
      key: RESOURCE.MONEY,
      value: new Decimal(isDev ? 1 : 100),
    },
  ],
  2,
  "Increases your money storage by 100%.",
  () => {
    upgradeStorage(RESOURCE.MONEY);
  },
  new Decimal(0),
  bankIcon
);

const MINE = new Building(
  "Mine",
  [
    {
      key: RESOURCE.MINING,
      value: new Decimal(100),
    },
  ],
  2,
  "Increases your mining storage by 100%.",
  () => {
    upgradeStorage(RESOURCE.MINING);
  },
  new Decimal(0),
  mineIcon
);

const SCIENCE_LAB = new Building(
  "Science Lab",
  [
    {
      key: RESOURCE.SCIENCE,
      value: new Decimal(100),
    },
  ],
  2,
  "Increases your science storage by 100%.",
  () => {
    upgradeStorage(RESOURCE.SCIENCE);
  },
  new Decimal(0),
  scienceLabIcon
);

const HOSPITAL = new Building(
  "Hospital",
  [
    {
      key: RESOURCE.MONEY,
      value: new Decimal(200),
    },
    {
      key: RESOURCE.MINING,
      value: new Decimal(100),
    },
  ],
  2.5,
  "Increases regeneration rate by 10%.",
  () => {
    const { upgradeRegen } = usePlayer();
    upgradeRegen(1.1);
  },
  new Decimal(0),
  hospitalIcon,
  () => {
    return hostpitalBlueprintResearch.value.unlocked;
  }
);

const WORKER_HUT = new Building(
  "Worker Hut",
  [
    {
      key: RESOURCE.MONEY,
      value: new Decimal(isDev ? 1 : 1500),
    },
    {
      key: RESOURCE.MINING,
      value: new Decimal(isDev ? 1 : 3000),
    },
  ],
  4,
  "Increases workers production by 1%.",
  () => {
    MINER.value.upgradeRate(1.01);
    BANKER.value.upgradeRate(1.01);
    SCIENTIST.value.upgradeRate(1.01);
  },
  new Decimal(0),
  hutIcon,
  () => {
    return workerHutBlueprintResearch.value.unlocked;
  }
);

export const getBuildings = () => {
  return ref<Building[]>([BANK, MINE, SCIENCE_LAB, HOSPITAL, WORKER_HUT]);
};