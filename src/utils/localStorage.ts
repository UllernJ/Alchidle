import { ref } from "vue";
import Decimal from "break_eternity.js";
import { useActionLog } from "../composable/useActionLog";
import { useAlchemy } from "../composable/useAlchemy";
import { useBuildings } from "../composable/useBuildings";
import { useGear, type Armor, type Weapon } from "../composable/useGear";
import { MessageType } from "../composable/useMessage";
import { useMonsters } from "../composable/useMonsters";
import { usePlayer } from "../composable/usePlayer";
import { useResearch } from "../composable/useResearch";
import { useResource } from "../composable/useResource";
import { useWorkers } from "../composable/useWorkers";
import { WORKERS } from "../data/workers";
import type { Building } from "../models/Building";
import type { Infusion } from "../models/Infusion";
import { Monster } from "../models/Monster";
import type { Research } from "../models/research/Research";
import { UpgradeableResearch } from "../models/research/UpgradeableResearch";
import type { BaseWorker } from "../models/worker/BaseWorker";
import type { Worker } from "../models/worker/Worker";
import type { RESOURCE } from "../types";
import { serializeState } from "./stateSerializer";
import { useMap } from "@/composable/useMap";
import { talentNodes } from "@/data/talent";
import type { TalentNode } from "@/models/talents/TalentNode";

const KEY = "session";
export const isLoadingFromSave = ref(false);

export type SessionState = {
  armors: Armor[];
  weapons: Weapon[];
  buildings: Building[];
  research: (Research | UpgradeableResearch)[];
  workerStations: Worker[] | BaseWorker[];
  resources: Record<string, Record<string, string>>;
  alchemy: {
    infusions: Infusion[];
    alchemyWorkers: Decimal;
  };
  adventure: {
    map: number;
    remainingMonsters: Monster[];
  };
  health: {
    amount: string;
    maxAmount: string;
  };
  maps: {
    name: string;
    unlocked: boolean;
    cleared: boolean;
  }[];
  talents: Record<string, TalentNode>;
};

export const saveSession = () => {
  const { armors, weapons } = useGear();
  const { buildings } = useBuildings();
  const { infusions, alchemyWorkers } = useAlchemy();
  const { researchList } = useResearch();
  const { workerStations } = useWorkers();
  const { resources } = useResource();
  const { map, monsters } = useMonsters();
  const { health, maxHealth } = usePlayer();
  const { maps } = useMap();
  const talents = talentNodes;

  const state: SessionState = {
    armors: armors.value,
    weapons: weapons.value,
    buildings: buildings.value,
    research: researchList.value,
    workerStations: workerStations.value,
    resources: {
      Money: {
        amount: resources.Money.value.amount.toString(),
      },
      Mining: {
        amount: resources.Mining.value.amount.toString(),
      },
      Science: {
        amount: resources.Science.value.amount.toString(),
      },
    },
    alchemy: {
      alchemyWorkers: alchemyWorkers.value.numberOfWorkers,
      infusions: infusions.value,
    },
    adventure: {
      map: map.value,
      remainingMonsters: monsters.value,
    },
    health: {
      amount: health.value.toString(),
      maxAmount: maxHealth.value.toString(),
    },
    maps: maps.value.map((map) => ({
      name: map.name,
      unlocked: map.unlocked,
      cleared: map.cleared,
    })),
    talents: talents,
  };

  const serializedState = serializeState(state);
  const encodedState = btoa(JSON.stringify(serializedState));
  localStorage.setItem(KEY, encodedState);
  const { logMessage } = useActionLog();
  logMessage("Game was saved", MessageType.SUCCESS);
};

export const loadState = () => {
  const state = localStorage.getItem(KEY);
  if (!state) {
    return;
  }
  isLoadingFromSave.value = true;
  let data;
  try {
    data = JSON.parse(atob(state))
    initWorkers(data.workerStations);
    initResearch(data.research);
    initBuildings(data.buildings);
    initWeapons(data.weapons);
    initArmors(data.armors);
    initAdventure(data.adventure);
    initInfusions(data.alchemy.infusions, data.alchemy.alchemyWorkers);
    initResources(data.resources);
    initHealth(data.health);
    initMaps(data.maps);
    initTalents(data.talents);
  } catch (e: unknown) {
    isLoadingFromSave.value = false;
    const { logMessage } = useActionLog();
    logMessage("Failed to load game", MessageType.ERROR);
    if (e instanceof Error) {
      logMessage(
        "Save file is corrupted. Starting a new game...",
        MessageType.ERROR
      );
      clearSession(); //todo the user should be able to save the session string
      window.location.reload();
    }
  } finally {
    isLoadingFromSave.value = false;
  }
  return data?.timestamp ?? 0;
};

export const isFirstTime = () => {
  return localStorage.getItem(KEY) === null;
};

const initWorkers = (workers: { name: string; numberOfWorkers: Decimal }[]) => {
  WORKERS.value.forEach((worker) => {
    const savedWorker = workers.find((w) => w.name === worker.name);
    if (savedWorker) {
      worker.restoreFromSave(new Decimal(savedWorker.numberOfWorkers));
    }
  });
};

const initResources = (
  resourcesData: Record<string, { amount: string }>
) => {
  const { resources } = useResource();
  Object.entries(resourcesData).forEach(([key, value]) => {
    const resource = resources[key as RESOURCE];
    if (resource) {
      resource.value.amount = new Decimal(value.amount);
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
          research.cost = research.cost.times(research.multiplier).round();
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

const initBuildings = (
  buildingsData: { name: string; quantity: Decimal }[]
) => {
  const { buildings } = useBuildings();
  buildingsData.forEach((buildingData) => {
    const building = buildings.value.find((b) => b.name === buildingData.name);
    if (building) {
      building.quantity = new Decimal(buildingData.quantity);
      building.restoreFromSave(new Decimal(buildingData.quantity).toNumber());
    }
  });
};

const initWeapons = (weaponsData: { name: string; quantity: Decimal }[]) => {
  const { weapons } = useGear();
  weaponsData.forEach((weaponData) => {
    const weapon = weapons.value.find((w) => w.name === weaponData.name);
    if (weapon) {
      weapon.quantity = new Decimal(weaponData.quantity);
      if (weapon.quantity.greaterThan(0)) {
        for (let i = 0; i < weapon.quantity.toNumber(); i++) {
          weapon.cost = weapon.cost.times(1.15).round();
        }
      }
    }
  });
};

const initArmors = (armorsData: { name: string; quantity: Decimal }[]) => {
  const { armors } = useGear();
  armorsData.forEach((armorData) => {
    const armor = armors.value.find((a) => a.name === armorData.name);
    if (armor) {
      armor.quantity = new Decimal(armorData.quantity);
      if (armor.quantity.greaterThan(0)) {
        for (let i = 0; i < armor.quantity.toNumber(); i++) {
          armor.cost = armor.cost.times(1.15).round();
        }
      }
    }
  });
};

const initAdventure = (data: { map: number; remainingMonsters: Monster[] }) => {
  const { map, monsters, BASE_DAMAGE, BASE_HEALTH } = useMonsters();
  map.value = data.map ?? 0;
  monsters.value = data.remainingMonsters.map((monster) => {
    return Monster.fromObject(monster);
  });
  if (monsters.value.length > 0) {
    BASE_DAMAGE.value = new Decimal(
      monsters.value[monsters.value.length - 1].attack
    ).times(1.15);
    BASE_HEALTH.value = new Decimal(
      monsters.value[monsters.value.length - 1].health
    ).times(1.15);
  }
};

const initInfusions = (
  data: {
    name: string;
    workersAllocated: Decimal;
    level: Decimal;
    contribution: Decimal;
  }[],
  numberOfWorkers: Decimal
) => {
  const { infusions, buyAlchemist } = useAlchemy();
  data.forEach((infusion) => {
    const savedInfusion = infusions.value.find((i) => i.name === infusion.name);
    if (savedInfusion) {
      savedInfusion.workersAllocated = new Decimal(infusion.workersAllocated);
      savedInfusion.level = new Decimal(infusion.level);
      savedInfusion.contribution = new Decimal(infusion.contribution);
      for (let i = 1; i < savedInfusion.level.toNumber(); i++) {
        savedInfusion.cost = savedInfusion.cost.times(1.15).round();
        savedInfusion.effect();
      }
    }
  });

  for (let i = 1; i <= Number(numberOfWorkers); i++) {
    buyAlchemist(true);
  }
};

const initHealth = (data: { amount: string; maxAmount: string }) => {
  const { health, maxHealth } = usePlayer();
  if (new Decimal(data.amount).greaterThan(maxHealth.value)) {
    health.value = maxHealth.value;
  } else {
    health.value = new Decimal(data.amount);
  }
};

const initMaps = (
  maps: { name: string; unlocked: boolean; cleared: boolean }[]
) => {
  const { listOfMaps } = useMap();
  maps.forEach((map) => {
    const mapItem = listOfMaps.value.find((m) => m.name === map.name);
    if (mapItem) {
      mapItem.unlocked = map.unlocked;
      mapItem.cleared = map.cleared;
    }
  });
};

const initTalents = (talents: {key: string, level: string}[]) => {
  talents.forEach((talent) => {
    const talentNode = talentNodes[talent.key];
    if (talentNode) {
      talentNode.restoreFromSave(talent.level);
    }
  });
}

const clearSession = () => {
  localStorage.removeItem(KEY);
};
