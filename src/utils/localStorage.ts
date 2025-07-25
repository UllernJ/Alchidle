import { ref } from "vue";
import Decimal from "break_eternity.js";
import { useActionLog } from "@/composable/useActionLog";
import { MessageType } from "@/composable/useMessage";
import { useMonsters } from "@/composable/useMonsters";
import { useResource } from "@/composable/useResource";
import type { Building } from "@/models/Building";
import type { Infusion } from "@/models/Infusion";
import { Monster } from "@/models/Monster";
import type { Research } from "@/models/research/Research";
import { UpgradeableResearch } from "@/models/research/UpgradeableResearch";
import type { BaseWorker } from "@/models/worker/BaseWorker";
import type { Worker } from "@/models/worker/Worker";
import type { RESOURCE } from "@/types";
import { serializeState } from "./stateSerializer";
import { useMap } from "@/composable/useMap";
import { talentNodes } from "@/data/talent";
import type { TalentNode } from "@/models/talents/TalentNode";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { useWorkersStore } from "@/stores/useWorkerStore";
import { useResearchStore } from "@/stores/useResearchStore";
import { useBuildingsStore } from "@/stores/useBuildingsStore";
import { useAlchemyStore } from "@/stores/useAlchemyStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useGearStore } from "@/stores/useGearStore";
import type { Armor } from "@/models/gear/Armor";
import type { Weapon } from "@/models/gear/Weapon";

const KEY = "session";
export const isLoadingFromSave = ref(false);
const hasBeenInitialized = ref(false);

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
  const { armors, weapons } = useGearStore();
  const { buildings } = useBuildingsStore();
  const { infusions, alchemist } = useAlchemyStore();
  const researchStore = useResearchStore();
  const { workers } = useWorkersStore();
  const { resources } = useResource();
  const { map, monsters } = useMonsters();
  const { health, maxHealth } = usePlayerStore();
  const { maps } = useMap();
  const talents = talentNodes;

  const state: SessionState = {
    armors: armors as Armor[],
    weapons: weapons as Weapon[],
    buildings: buildings,
    research: researchStore.researchList,
    workerStations: workers as Worker[] | BaseWorker[],
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
      alchemyWorkers: alchemist.numberOfWorkers,
      infusions: infusions,
    },
    adventure: {
      map: map.value,
      remainingMonsters: monsters.value,
    },
    health: {
      amount: health.toString(),
      maxAmount: maxHealth.toString(),
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
  if (hasBeenInitialized.value) {
    return;
  }
  const state = localStorage.getItem(KEY);
  if (!state) {
    return;
  }
  isLoadingFromSave.value = true;
  let data;
  try {
    data = JSON.parse(atob(state));
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
    initWorkers(data.workerStations);
  } catch (e: unknown) {
    isLoadingFromSave.value = false;
    const { logMessage } = useActionLog();
    logMessage("Failed to load game", MessageType.ERROR);
    if (e instanceof Error) {
      logMessage(
        "Save file is corrupted. Starting a new game...",
        MessageType.ERROR
      );
      clearSession();
      window.location.reload();
    }
  } finally {
    isLoadingFromSave.value = false;
  }
  hasBeenInitialized.value = true;
  return data?.timestamp ?? 0;
};

export const isFirstTime = () => {
  return localStorage.getItem(KEY) === null;
};

const initWorkers = (workers: { name: string; numberOfWorkers: Decimal }[]) => {
  const workerStore = useWorkersStore();
  workerStore.workers.forEach((worker) => {
    const savedWorker = workers.find((w) => w.name === worker.name);
    if (savedWorker) {
      worker.restoreFromSave(new Decimal(savedWorker.numberOfWorkers));
    }
  });
};

const initResources = (resourcesData: Record<string, { amount: string }>) => {
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
  const researchStore = useResearchStore();
  researchStore.researchList.forEach((research) => {
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
  const { buildings } = useBuildingsStore();
  buildingsData.forEach((buildingData) => {
    const building = buildings.find((b) => b.name === buildingData.name);
    if (building) {
      building.quantity = new Decimal(buildingData.quantity);
      building.restoreFromSave(new Decimal(buildingData.quantity).toNumber());
    }
  });
};

const initWeapons = (weaponsData: { name: string; quantity: Decimal }[]) => {
  const { weapons } = useGearStore();
  weaponsData.forEach((weaponData) => {
    const weapon = weapons.find((w) => w.name === weaponData.name);
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
  const { armors } = useGearStore();
  armorsData.forEach((armorData) => {
    const armor = armors.find((a) => a.name === armorData.name);
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
  const {
    map,
    monsters,
    BASE_DAMAGE,
    BASE_HEALTH,
    BASE_DROP,
    getNextMonsters,
  } = useMonsters();
  map.value = data.map ?? 0;

  for (let i = 0; i < map.value; i++) {
    BASE_DROP.value = BASE_DROP.value.times(3);
  }

  if (
    data.remainingMonsters.length > 0 &&
    typeof data.remainingMonsters[0].health !== "object"
  ) {
    map.value = map.value - 1;
    BASE_DAMAGE.value = new Decimal(
      data.remainingMonsters[data.remainingMonsters.length - 1].attack
    );
    BASE_HEALTH.value = BASE_DAMAGE.value.times(3).dividedBy(2.25).times(10);
    getNextMonsters();
  } else {
    monsters.value = data.remainingMonsters.map((monster) => {
      return Monster.fromObject(monster);
    });
    if (monsters.value.length > 0) {
      BASE_DAMAGE.value = new Decimal(
        monsters.value[monsters.value.length - 1].attack
      ).times(1.15);
      BASE_HEALTH.value = new Decimal(
        monsters.value[monsters.value.length - 1].health.maxHealth
      ).times(1.15);
    }
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
  const { infusions, alchemist } = useAlchemyStore();
  data.forEach((infusion) => {
    const savedInfusion = infusions.find((i) => i.name === infusion.name);
    if (savedInfusion) {
      savedInfusion.workersAllocated = new Decimal(infusion.workersAllocated);
      savedInfusion.level = new Decimal(infusion.level);
      savedInfusion.contribution = new Decimal(infusion.contribution);
      for (let i = 1; i < savedInfusion.level.toNumber(); i++) {
        savedInfusion.cost = savedInfusion.cost.times(1.5).round();
        savedInfusion.effect();
      }
    }
  });
  alchemist.restoreFromSave(new Decimal(numberOfWorkers));
};

const initHealth = (data: { amount: string; maxAmount: string }) => {
  const store = usePlayerStore();
  if (new Decimal(data.amount).greaterThan(store.maxHealth)) {
    store.health = store.maxHealth;
  } else {
    store.health = new Decimal(data.amount);
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

const initTalents = (talents: { key: string; level: string }[]) => {
  talents.forEach((talent) => {
    const talentNode = talentNodes[talent.key];
    if (talentNode) {
      talentNode.restoreFromSave(talent.level);
    }
  });
  const { map } = useMonsters();
  const { points } = useReincarnation();
  if (map.value > 10) {
    const temp = map.value - 10;
    for (let i = 1; i <= temp; i++) {
      points.value = points.value.plus(i * 2);
    }
  }
};

const clearSession = () => {
  localStorage.removeItem(KEY);
};
