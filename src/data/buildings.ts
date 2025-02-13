import { ref } from "vue";
import Decimal from "break_eternity.js";
import { RESOURCE } from "@/types";
import {
  bankIcon,
  barracksIcon,
  hospitalIcon,
  hutIcon,
  mineIcon,
  scienceLabIcon,
} from "@/icons/icons";
import { isDev } from "@/utils/dev";
import { Building } from "@/models/Building";
import { useResource } from "@/composable/useResource";
import {
  blacksmithingResearch,
  hostpitalBlueprintResearch,
  workerHutBlueprintResearch,
} from "./research";
import { useWorkersStore } from "@/stores/useWorkerStore";
import { tenthMap } from "@/data/items/map";
import { usePlayerStore } from "@/stores/usePlayerStore";

const BANK = () =>
  new Building(
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
      const { upgradeStorage } = useResource();
      upgradeStorage(RESOURCE.MONEY);
    },
    new Decimal(0),
    bankIcon
  );

const MINE = () =>
  new Building(
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
      const { upgradeStorage } = useResource();
      upgradeStorage(RESOURCE.MINING);
    },
    new Decimal(0),
    mineIcon,
    () => {
      return blacksmithingResearch.value.unlocked;
    }
  );

const SCIENCE_LAB = () =>
  new Building(
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
      const { upgradeStorage } = useResource();
      upgradeStorage(RESOURCE.SCIENCE);
    },
    new Decimal(0),
    scienceLabIcon
  );

const HOSPITAL = () =>
  new Building(
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
      const { upgradeRegen } = usePlayerStore();
      upgradeRegen(1.1);
    },
    new Decimal(0),
    hospitalIcon,
    () => {
      return hostpitalBlueprintResearch.value.unlocked;
    }
  );

const WORKER_HUT = () =>
  new Building(
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
      const workerStore = useWorkersStore()
      workerStore.resourceWorkersList.miner.upgradeRate(1.01);
      workerStore.resourceWorkersList.banker.upgradeRate(1.01);
      workerStore.resourceWorkersList.scientist.upgradeRate(1.01);
    },
    new Decimal(0),
    hutIcon,
    () => {
      return workerHutBlueprintResearch.value.unlocked;
    }
  );

  const BARRACKS = () => {
    return new Building(
      "Barracks",
      [
        {
          key: RESOURCE.MONEY,
          value: new Decimal(2500),
        },
        {
          key: RESOURCE.MINING,
          value: new Decimal(2500),
        },
        {
          key: RESOURCE.SCIENCE,
          value: new Decimal(2000),
        }
      ],
      4,
      "Increases attack, defence, health and regen by 1%.",
      () => {
        const { upgradeAttackPower, upgradeDefensePower, upgradeRegen, upgradeHealthMultiplier } = usePlayerStore();
        upgradeAttackPower(1.01);
        upgradeDefensePower(1.01);
        upgradeRegen(1.01);
        upgradeHealthMultiplier(1.01);
      },
      new Decimal(0),
      barracksIcon,
      () => {
        return tenthMap.value.cleared || isDev;
      }
    );
  }

export const getBuildings = () => {
  return ref<Building[]>([
    BANK(),
    MINE(),
    SCIENCE_LAB(),
    HOSPITAL(),
    WORKER_HUT(),
    BARRACKS()
  ]);
};
