import { ref } from "vue";
import { RESOURCE } from "../types";
import { useResource } from "./useResource";
import { bankIcon, mineIcon, scienceLabIcon } from "../icons/icons";

type Cost = {
  key: RESOURCE;
  value: number;
};

export type Building = {
  name: string;
  cost: Cost[];
  description: string;
  resource: RESOURCE;
  quantity: number;
  icon?: string;
  requirement?: () => boolean;
};

const buildings = ref<Building[]>([
  {
    name: "Bank",
    resource: RESOURCE.MONEY,
    cost: [
      {
        key: RESOURCE.MONEY,
        value: 100,
      },
    ],
    description: "Increases your money storage by 100%.",
    quantity: 0,
    icon: bankIcon,
  },
  {
    name: "Mine",
    resource: RESOURCE.MINING,
    cost: [
      {
        key: RESOURCE.MINING,
        value: 100,
      },
    ],
    description: "Increases your mining storage by 100%.",
    quantity: 0,
    icon: mineIcon,
  },
  {
    name: "Science Lab",
    resource: RESOURCE.SCIENCE,
    cost: [
      {
        key: RESOURCE.SCIENCE,
        value: 100,
      },
    ],
    description: "Increases your science storage by 100%.",
    quantity: 0,
    icon: scienceLabIcon,
  },
  // {
  //   name: "Alchemy Lab",
  //   resource: null,
  //   cost: [
  //     {
  //       key: RESOURCE.MONEY,
  //       value: 100,
  //     },
  //   ],
  //   description: "Increases your alchemy storage by 100%.",
  //   quantity: 0,
  //   icon: alchemyLabIcon,
  //   requirement: () => unlockAlchemyResearch.value.unlocked,
  // },
]);

export const useBuildings = () => {
  const { subtractResource, upgradeStorage, resources } = useResource();

  const buyBuilding = (index: number) => {
    const building = buildings.value[index];
    if (building.cost.some((cost) => resources[cost.key].value < cost.value)) {
      return;
    }
    building.quantity++;
    building.cost.forEach((cost) => {
      cost.value = Math.round(cost.value * 2);
      subtractResource(cost.key, cost.value);
    });
    upgradeStorage(buildings.value[index].resource);
  };
  return { buildings, buyBuilding };
};
