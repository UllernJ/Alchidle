import { ref } from "vue";
import { RESOURCE } from "../types";
import { useResource } from "./useResource";
import {
  alchemyLabIcon,
  bankIcon,
  mineIcon,
  scienceLabIcon,
} from "../icons/icons";

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
};

const buildings = ref<Building[]>([
  {
    name: "Mine",
    resource: RESOURCE.MINING,
    cost: [
      {
        key: RESOURCE.MINING,
        value: 100,
      },
      {
        key: RESOURCE.MONEY,
        value: 50,
      },
    ],
    description: "A mine to gather resources",
    quantity: 0,
    icon: mineIcon,
  },
  {
    name: "Alchemy Lab",
    resource: RESOURCE.ALCHEMY,
    cost: [
      {
        key: RESOURCE.ALCHEMY,
        value: 100,
      },
      {
        key: RESOURCE.MONEY,
        value: 50,
      },
    ],
    description: "An alchemy lab to transmute resources",
    quantity: 0,
    icon: alchemyLabIcon,
  },
  {
    name: "Science Lab",
    resource: RESOURCE.SCIENCE,
    cost: [
      {
        key: RESOURCE.SCIENCE,
        value: 100,
      },
      {
        key: RESOURCE.MONEY,
        value: 50,
      },
    ],
    description: "A science lab to research new technologies",
    quantity: 0,
    icon: scienceLabIcon,
  },
  {
    name: "Bank",
    resource: RESOURCE.MONEY,
    cost: [
      {
        key: RESOURCE.MONEY,
        value: 100,
      },
      {
        key: RESOURCE.MINING,
        value: 50,
      },
    ],
    description: "A bank to store your money",
    quantity: 0,
    icon: bankIcon,
  },
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
