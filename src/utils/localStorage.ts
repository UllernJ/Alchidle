import { useAlchemy } from "../composable/useAlchemy";
import { useBuildings, type Building } from "../composable/useBuildings";
import { useGear, type Armor, type Weapon } from "../composable/useGear";
import { usePlayer } from "../composable/usePlayer";
import { useResearch } from "../composable/useResearch";
import { useResource } from "../composable/useResource";
import { useWorkers } from "../composable/useWorkers";
import type { Infusion } from "../data/alchemy";
import type { Research } from "../data/research";
import type { RESOURCE, WorkerStation } from "../types";

const KEY = "session";

type SessionState = {
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
    timestamp: Date.now(), // todo calculate time played
  };

  localStorage.setItem(KEY, JSON.stringify(state));
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

  currentFocus.value = data.currentFocus;
  productionRate.value = data.productionRate;
  health.value = data.health;
  maxHealth.value = data.maxHealth;
  attackPowerMultiplier.value = data.attackPowerMultiplier;
  defencePowerMultiplier.value = data.defencePowerMultiplier;
  regen.value = data.regen;
  armors.value = data.armors;
  weapons.value = data.weapons;
  buildings.value = data.buildings;
  workerStations.value = data.workerStations;
  Object.entries(data.resources).forEach(([key, value]) => {
    if (resources[key as RESOURCE]) {
      resources[key as RESOURCE].value = value;
    }
  });
  unlockResearch(data.research);
  setInfusionEffect(data.infusions);
  return data.timestamp;
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
