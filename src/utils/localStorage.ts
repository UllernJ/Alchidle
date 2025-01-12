import { useAlchemy } from "../composable/useAlchemy";
import { useBuildings } from "../composable/useBuildings";
import { useGear, type Armor, type Weapon } from "../composable/useGear";
import { useMonsters } from "../composable/useMonsters";
import { usePlayer } from "../composable/usePlayer";
import { useResearch } from "../composable/useResearch";
import { useResource } from "../composable/useResource";
import { useWorkers } from "../composable/useWorkers";
import type { Research } from "../data/research";
import type { Building } from "../models/Building";
import type { Infusion } from "../models/Infusion";
import type { Monster } from "../models/Monster";
import type { RESOURCE, WorkerStation } from "../types";
import { serializeState, deserializeState } from "./stateSerializer";

const KEY = "session";

export type SessionState = {
  currentFocus: RESOURCE | null;
  productionRate: number;
  attackPowerMultiplier: number;
  defencePowerMultiplier: number;
  health: number;
  maxHealth: number;
  regen: number;
  armors: Armor[];
  weapons: Weapon[];
  buildings: Building[];
  infusions: Infusion[];
  research: Research[];
  workerStations: WorkerStation[];
  resources: Record<string, number>;
  timestamp: number;
  adventure: {
    map: number;
    remainingMonsters: Monster[];
    difficulty: number;
  };
};

export const saveSession = () => {
  console.info("Auto saving...");
  const {
    currentFocus,
    productionRate,
    attackPowerMultiplier,
    defencePowerMultiplier,
    health,
    maxHealth,
    regen,
  } = usePlayer();

  const { armors, weapons } = useGear();
  const { buildings } = useBuildings();
  const { infusions } = useAlchemy();
  const { researchList } = useResearch();
  const { workerStations } = useWorkers();
  const { resources } = useResource();
  const { map, monsters, difficulty } = useMonsters();

  const state: SessionState = {
    currentFocus: currentFocus.value,
    productionRate: productionRate.value,
    attackPowerMultiplier: attackPowerMultiplier.value,
    defencePowerMultiplier: defencePowerMultiplier.value,
    health: health.value,
    maxHealth: maxHealth.value,
    regen: regen.value,
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
      difficulty: difficulty.value,
    },
    timestamp: Date.now(), // todo calculate time played
  };

  const serializedState = serializeState(state);
  localStorage.setItem(KEY, JSON.stringify(serializedState));
};

export const loadState = () => {
  const state = localStorage.getItem(KEY);
  const data = state ? (JSON.parse(state) as SessionState) : null;
  if (!data) return;
  const {
    currentFocus,
    productionRate,
    attackPowerMultiplier,
    defencePowerMultiplier,
    health,
    maxHealth,
    regen,
  } = usePlayer();

  const { armors, weapons } = useGear();
  const { buildings } = useBuildings();
  const { workerStations } = useWorkers();
  const { resources } = useResource();
  const { map, monsters, difficulty } = useMonsters();

  const deserializedState = deserializeState(data);

  currentFocus.value = deserializedState.currentFocus;
  productionRate.value = deserializedState.productionRate;
  health.value = deserializedState.health;
  maxHealth.value = deserializedState.maxHealth;
  attackPowerMultiplier.value = deserializedState.attackPowerMultiplier;
  defencePowerMultiplier.value = deserializedState.defencePowerMultiplier;
  regen.value = deserializedState.regen;
  armors.value = deserializedState.armors;
  weapons.value = deserializedState.weapons;
  buildings.value = deserializedState.buildings;
  workerStations.value = deserializedState.workerStations;
  Object.entries(deserializedState.resources).forEach(([key, value]) => {
    if (resources[key as RESOURCE]) {
      resources[key as RESOURCE].value = value as number;
    }
  });
  unlockResearch(deserializedState.research);
  setInfusionEffect(deserializedState.infusions);
  map.value = deserializedState.adventure?.map ?? 1;
  monsters.value = deserializedState.adventure?.remainingMonsters ?? [];
  difficulty.value = deserializedState.adventure?.difficulty ?? 1;
  return deserializedState.timestamp;
};

const unlockResearch = (researchs: Research[]) => {
  const { researchList } = useResearch();
  for (const research of researchs) {
    const found = researchList.value.find((r) => r.name === research.name);
    if (found) {
      found.unlocked = research.unlocked;
    }
  }
};

const setInfusionEffect = (data: Infusion[]) => {
  const { infusions } = useAlchemy();
  for (const infusion of data) {
    const found = infusions.value.find((i) => i.name === infusion.name);
    if (found) {
      found.level = infusion.level;
      found.contribution = infusion.contribution;
      found.workersAllocated = infusion.workersAllocated;
    }
  }
};
