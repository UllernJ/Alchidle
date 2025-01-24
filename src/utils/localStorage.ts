import { ref } from "vue";
import { useActionLog } from "../composable/useActionLog";
import { useAlchemy } from "../composable/useAlchemy";
import { useBuildings } from "../composable/useBuildings";
import { useGear, type Armor, type Weapon } from "../composable/useGear";
import { MessageType } from "../composable/useMessage";
import { useMonsters } from "../composable/useMonsters";
import { useMultipliers } from "../composable/useMultipliers";
import { usePlayer } from "../composable/usePlayer";
import { useResearch } from "../composable/useResearch";
import { useResource } from "../composable/useResource";
import { useWorkers } from "../composable/useWorkers";
import { WORKERS } from "../data/workers";
import type { Building } from "../models/Building";
import type { Infusion } from "../models/Infusion";
import type { Monster } from "../models/Monster";
import type { Research } from "../models/research/Research";
import { UpgradeableResearch } from "../models/research/UpgradeableResearch";
import type { BaseWorker } from "../models/worker/BaseWorker";
import type { Worker } from "../models/worker/Worker";
import type { RESOURCE } from "../types";
import { serializeState } from "./stateSerializer";

const KEY = "session";
export const isLoadingFromSave = ref(false);

export type SessionState = {
  armors: Armor[];
  weapons: Weapon[];
  buildings: Building[];
  research: (Research | UpgradeableResearch)[];
  workerStations: Worker[] | BaseWorker[];
  resources: Record<string, number>;
  alchemy: {
    infusions: Infusion[];
    alchemyWorkers: number;
  };
  adventure: {
    map: number;
    remainingMonsters: Monster[];
  };
  multipliers: {
    attackPowerMultiplier: number;
    defencePowerMultiplier: number;
    healthMultiplier: number;
    productionRate: number;
    regenMultiplier: number;
  };
};

export const saveSession = () => {
  const { armors, weapons } = useGear();
  const { buildings } = useBuildings();
  const { infusions, alchemyWorkers } = useAlchemy();
  const { researchList } = useResearch();
  const { workerStations } = useWorkers();
  const { resources } = useResource();
  const { map, monsters } = useMonsters();
  const { getMultipliers } = useMultipliers();
  const multipliers = getMultipliers();
  const state: SessionState = {
    armors: armors.value,
    weapons: weapons.value,
    buildings: buildings.value,
    research: researchList.value,
    workerStations: workerStations.value,
    resources: {
      Money: resources.Money.value,
      Mining: resources.Mining.value,
      Science: resources.Science.value,
    },
    alchemy: {
      alchemyWorkers: alchemyWorkers.value.numberOfWorkers,
      infusions: infusions.value,
    },
    adventure: {
      map: map.value,
      remainingMonsters: monsters.value,
    },
    multipliers: {
      attackPowerMultiplier: multipliers.attackPowerMultiplier.value,
      defencePowerMultiplier: multipliers.defencePowerMultiplier.value,
      healthMultiplier: multipliers.healthMultiplier.value,
      productionRate: multipliers.productionRate.value,
      regenMultiplier: multipliers.regenMultiplier.value,
    },
  };

  const serializedState = serializeState(state);
  localStorage.setItem(KEY, JSON.stringify(serializedState));
  const { logMessage } = useActionLog();
  logMessage("Game was saved", MessageType.SUCCESS);
};

export const loadState = () => {
  const state = localStorage.getItem(KEY);
  if (!state) {
    return;
  }
  isLoadingFromSave.value = true
  const data = JSON.parse(state);
  initWorkers(data.workerStations);
  initResearch(data.research);
  initBuildings(data.buildings);
  initWeapons(data.weapons);
  initArmors(data.armors);
  initAdventure(data.adventure);
  initInfusions(data.alchemy.infusions, data.alchemy.alchemyWorkers);
  initResources(data.resources);
  initMultipliers(data.multipliers);
  isLoadingFromSave.value = false;
  return data.timestamp;
};

export const isFirstTime = () => {
  return localStorage.getItem(KEY) === null;
};

const initWorkers = (workers: { name: string; numberOfWorkers: number }[]) => {
  WORKERS.value.forEach((worker) => {
    const savedWorker = workers.find((w) => w.name === worker.name);
    if (savedWorker) {
      worker.restoreFromSave(savedWorker.numberOfWorkers);
    }
  });
};

const initResources = (resourcesData: Record<string, number>) => {
  const { resources } = useResource();
  Object.entries(resourcesData).forEach(([key, value]) => {
    const resource = resources[key as RESOURCE];
    if (resource) {
      resource.value = value;
    } else {
      console.warn(`Resource key ${key} not found in resources`);
    }
  });
};

const initResearch = (
  researchData: {
    name: string;
    unlocked: boolean;
    level?: number;
    multiplier?: number;
  }[]
) => {
  const { researchList } = useResearch();
  researchList.value.forEach((research) => {
    const savedResearch = researchData.find((r) => r.name === research.name);
    if (savedResearch) {
      research.unlocked = savedResearch.unlocked;
      if (
        research instanceof UpgradeableResearch &&
        savedResearch.level !== undefined
      ) {
        research.level = savedResearch.level;
        research.multiplier = savedResearch.multiplier!;
        research.setNextRequirement();
        for (let i = 0; i < research.level; i++) {
          research.cost = Math.round(research.cost * research.multiplier);
          if (research.effect) {
            research.effect();
          }
        }
      }
    }
    if (
      research.effect &&
      research.unlocked &&
      !(research instanceof UpgradeableResearch)
    ) {
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
          weapon.cost = Math.round(weapon.cost * 1.15);
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
          armor.cost = Math.round(armor.cost * 1.15);
        }
      }
    }
  });
};

const initAdventure = (data: { map: number; remainingMonsters: Monster[] }) => {
  const { map, monsters, BASE_DAMAGE, BASE_HEALTH } = useMonsters();
  map.value = data.map ?? 0;
  monsters.value = data.remainingMonsters;
  if (monsters.value.length > 0) {
    BASE_DAMAGE.value = monsters.value[monsters.value.length - 1].attack * 1.15;
    BASE_HEALTH.value = monsters.value[monsters.value.length - 1].health * 1.15;
  }
};

const initInfusions = (
  data: {
    name: string;
    workersAllocated: number;
    level: number;
    contribution: number;
  }[],
  numberOfWorkers: number
) => {
  const { infusions, buyAlchemist } = useAlchemy();
  data.forEach((infusion) => {
    const savedInfusion = infusions.value.find((i) => i.name === infusion.name);
    if (savedInfusion) {
      savedInfusion.workersAllocated = infusion.workersAllocated;
      savedInfusion.level = infusion.level;
      savedInfusion.contribution = infusion.contribution;
      for (let i = 1; i < infusion.level; i++) {
        savedInfusion.cost *= 2.5;
      }
    }
  });

  for (let i = 1; i <= numberOfWorkers; i++) {
    buyAlchemist(true);
  }
};

const initMultipliers = (data: {
  attackPowerMultiplier: number;
  defencePowerMultiplier: number;
  healthMultiplier: number;
  productionRate: number;
  regenMultiplier: number;
}) => {
  const { getMultipliers } = useMultipliers();
  const { setProductionRate } = usePlayer();
  const {
    attackPowerMultiplier,
    defencePowerMultiplier,
    healthMultiplier,
    regenMultiplier,
  } = getMultipliers();
  attackPowerMultiplier.value = data.attackPowerMultiplier;
  defencePowerMultiplier.value = data.defencePowerMultiplier;
  healthMultiplier.value = data.healthMultiplier;
  setProductionRate(data.productionRate);
  regenMultiplier.value = data.regenMultiplier;
};
