import { ref } from "vue";
import { RESOURCE } from "../types";
import { bankIcon, hospitalIcon, mineIcon, scienceLabIcon } from "../icons/icons";
import { isDev } from "../utils/dev";
import { Building } from "../models/Building";
import { useResource } from "../composable/useResource";
import { usePlayer } from "../composable/usePlayer";

const { upgradeStorage } = useResource();

const BANK = new Building(
  "Bank",
  [
    {
      key: RESOURCE.MONEY,
      value: isDev ? 1 : 100,
    },
  ],
  2,
  "Increases your money storage by 100%.",
  () => {
    upgradeStorage(RESOURCE.MONEY);
  },
  0,
  bankIcon
);
const MINE = new Building(
  "Mine",
  [
    {
      key: RESOURCE.MINING,
      value: 100,
    },
  ],
  2,
  "Increases your mining storage by 100%.",
  () => {
    upgradeStorage(RESOURCE.MINING);
  },
  0,
  mineIcon
);
const SCIENCE_LAB = new Building(
  "Science Lab",
  [
    {
      key: RESOURCE.SCIENCE,
      value: 100,
    },
  ],
  2,
  "Increases your science storage by 100%.",
  () => {
    upgradeStorage(RESOURCE.SCIENCE);
  },
  0,
  scienceLabIcon
);

const HOSPITAL = new Building(
  "Hospital",
  [
    {
      key: RESOURCE.MONEY,
      value: 200,
    },
    {
      key: RESOURCE.MINING,
      value: 100,
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
    return true;
  }
);

export const getBuildings = () => {
  return ref<Building[]>([BANK, MINE, SCIENCE_LAB, HOSPITAL]);
};
