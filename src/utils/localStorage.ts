import { useActionLog } from "../composable/useActionLog";
import { useAlchemy } from "../composable/useAlchemy";
import { useBuildings } from "../composable/useBuildings";
import { useGear, type Armor, type Weapon } from "../composable/useGear";
import { MessageType } from "../composable/useMessage";
import { useMonsters } from "../composable/useMonsters";
import { useResearch } from "../composable/useResearch";
import { useResource } from "../composable/useResource";
import { useWorkers } from "../composable/useWorkers";
import type { Research } from "../data/research";
import { WORKERS } from "../data/workers";
import type { Building } from "../models/Building";
import type { Infusion } from "../models/Infusion";
import type { Monster } from "../models/Monster";
import type { Worker } from "../models/Worker";
import type { RESOURCE } from "../types";
import { serializeState } from "./stateSerializer";

const KEY = "session";

export type SessionState = {
  armors: Armor[];
  weapons: Weapon[];
  buildings: Building[];
  infusions: Infusion[];
  research: Research[];
  workerStations: Worker[];
  resources: Record<string, number>;
  adventure: {
    map: number;
    remainingMonsters: Monster[];
  };
};

export const saveSession = () => {
  const { logMessage } = useActionLog();
  logMessage("Saving game...", MessageType.INFO);

  const { armors, weapons } = useGear();
  const { buildings } = useBuildings();
  const { infusions } = useAlchemy();
  const { researchList } = useResearch();
  const { workerStations } = useWorkers();
  const { resources } = useResource();
  const { map, monsters } = useMonsters();

  const state: SessionState = {
    armors: armors.value,
    weapons: weapons.value,
    buildings: buildings.value,
    infusions: infusions.value,
    research: researchList.value,
    workerStations: workerStations.value,
    resources: Object.fromEntries(
      Object.entries(resources).map(([key, ref]) => [key, ref.value])
    ),
    adventure: {
      map: map.value,
      remainingMonsters: monsters.value,
    }
  };

  const serializedState = serializeState(state);
  localStorage.setItem(KEY, JSON.stringify(serializedState));
};

export const loadState = () => {
  const state = localStorage.getItem(KEY);
  if (!state) {
    return;
  }
  const data = JSON.parse(state);
  initResources(data.resources);
  initWorkers(data.workerStations);
  initResearch(data.research);
  initBuildings(data.buildings);
  initWeapons(data.weapons);
  initArmors(data.armors);
  initAdventure(data.adventure);
  //todo: init infusions
  return data.timestamp;
};

export const isFirstTime = () => {
  return localStorage.getItem(KEY) === null;
};

const initWorkers = (workers: { name: string; numberOfWorkers: number }[]) => {
  WORKERS.value.forEach((worker) => {
    const savedWorker = workers.find((w) => w.name === worker.name);
    if (savedWorker) {
      worker.numberOfWorkers = savedWorker.numberOfWorkers;
      worker.restoreFromSave(savedWorker.numberOfWorkers);
    }
  });
};

const initResources = (resourcesData: Record<string, number>) => {
  const { resources } = useResource();
  Object.entries(resourcesData).forEach(([key, value]) => {
    const resource = resources[key as RESOURCE];
    resource.value = value;
  });
};

const initResearch = (researchData: { name: string; unlocked: boolean }[]) => {
  const { researchList } = useResearch();
  researchList.value.forEach((research) => {
    const savedResearch = researchData.find((r) => r.name === research.name);
    if (savedResearch) {
      research.unlocked = savedResearch.unlocked;
    }
    if (research.effect && research.unlocked) {
      research.effect();
    }
  });
};

const initBuildings = (buildingsData: { name: string; quantity: number }[]) => {
  const { buildings } = useBuildings();
  buildingsData.forEach((buildingData) => {
    const building = buildings.value.find((b) => b.name === buildingData.name);
    if (building) {
      building.quantity = buildingData.quantity;
      building.restoreFromSave(buildingData.quantity);
    }
  });
};

const initWeapons = (weaponsData: { name: string; quantity: number }[]) => {
  const { weapons } = useGear();
  weaponsData.forEach((weaponData) => {
    const weapon = weapons.value.find((w) => w.name === weaponData.name);
    if (weapon) {
      weapon.quantity = weaponData.quantity;
      if (weapon.quantity > 0) {
        for (let i = 0; i < weapon.quantity; i++) {
          weapon.cost = Math.round(weapon.cost * 1.07);
        }
      }
    }
  });
};

const initArmors = (armorsData: { name: string; quantity: number }[]) => {
  const { armors } = useGear();
  armorsData.forEach((armorData) => {
    const armor = armors.value.find((a) => a.name === armorData.name);
    if (armor) {
      armor.quantity = armorData.quantity;
      if (armor.quantity > 0) {
        for (let i = 0; i < armor.quantity; i++) {
          armor.cost = Math.round(armor.cost * 1.07);
        }
      }
    }
  });
};

const initAdventure = (data: { map: number; remainingMonsters: Monster[] }) => {
  const { map, monsters } = useMonsters();
  map.value = data.map ?? 0;
  monsters.value = data.remainingMonsters;
};