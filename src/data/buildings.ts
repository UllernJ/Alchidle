import { ref } from "vue";
import { RESOURCE } from "../types";
import {
  bankIcon,
  hospitalIcon,
  hutIcon,
  mineIcon,
  scienceLabIcon,
} from "../icons/icons";
import { Building } from "../models/Building";
import { usePlayer } from "../composable/usePlayer";
import { BANKER, MINER, SCIENTIST } from "./workers";
import {
  hostpitalBlueprintResearch,
  workerHutBlueprintResearch,
} from "./research";
import { BigNumber } from "../models/BigNumber";
import { MINING, MONEY, SCIENCE } from "../composable/useResource";

const BANK = new Building(
  "Bank",
  [
    {
      key: RESOURCE.MONEY,
      value: BigNumber.fromString("100"),
    },
  ],
  2,
  "Increases your money storage by 100%.",
  () => {
    MONEY.value.upgradeMaxAmount(2);
  },
  0,
  bankIcon
);
const MINE = new Building(
  "Mine",
  [
    {
      key: RESOURCE.MINING,
      value: BigNumber.fromString("100"),
    },
  ],
  2,
  "Increases your mining storage by 100%.",
  () => {
    MINING.value.upgradeMaxAmount(2);
  },
  0,
  mineIcon
);
const SCIENCE_LAB = new Building(
  "Science Lab",
  [
    {
      key: RESOURCE.SCIENCE,
      value: BigNumber.fromString("100"),
    },
  ],
  2,
  "Increases your science storage by 100%.",
  () => {
    SCIENCE.value.upgradeMaxAmount(2);
  },
  0,
  scienceLabIcon
);

const HOSPITAL = new Building(
  "Hospital",
  [
    {
      key: RESOURCE.MONEY,
      value: BigNumber.fromString("200"),
    },
    {
      key: RESOURCE.MINING,
      value: BigNumber.fromString("100"),
    },
  ],
  2.5,
  "Increases regeneration rate by 10%.",
  () => {
    const { upgradeRegen } = usePlayer();
    upgradeRegen(1.1);
  },
  0,
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
      value: BigNumber.fromString("1500"),
    },
    {
      key: RESOURCE.MINING,
      value: BigNumber.fromString("3000"),
    },
  ],
  4,
  "Increases workers production by 1%.",
  () => {
    MINER.value.upgradeRate(1.01);
    BANKER.value.upgradeRate(1.01);
    SCIENTIST.value.upgradeRate(1.01);
  },
  0,
  hutIcon,
  () => {
    return workerHutBlueprintResearch.value.unlocked;
  }
);

export const getBuildings = () => {
  return ref<Building[]>([BANK, MINE, SCIENCE_LAB, HOSPITAL, WORKER_HUT]);
};
