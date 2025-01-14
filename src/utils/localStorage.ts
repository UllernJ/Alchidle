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
import type { Building } from "../models/Building";
import type { Infusion } from "../models/Infusion";
import type { Monster } from "../models/Monster";
import type { Worker } from "../models/Worker";
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
  timestamp: number;
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
    },
    timestamp: Date.now(),
  };

  const serializedState = serializeState(state);
  localStorage.setItem(KEY, JSON.stringify(serializedState));
};

export const loadState = () => {
  return null;
};

export const isFirstTime = () => {
  return localStorage.getItem(KEY) === null;
};
