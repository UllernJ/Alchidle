import type { Armor, Weapon } from "../composable/useGear";
import type { SessionState } from "./localStorage";
import type { Building } from "../models/Building";
import type { Research } from "../models/research/Research";
import { UpgradeableResearch } from "../models/research/UpgradeableResearch";
import type { BaseWorker } from "../models/worker/BaseWorker";
import type { Monster } from "@/models/Monster";

export const serializeState = (state: SessionState) => {
  return {
    buildings: state.buildings.map((building: Building) => {
      return { name: building.name, quantity: building.quantity };
    }),
    weapons: state.weapons.map((weapon: Weapon) => {
      return { name: weapon.name, quantity: weapon.quantity };
    }),
    armors: state.armors.map((armor: Armor) => {
      return { name: armor.name, quantity: armor.quantity };
    }),
    adventure: {
      remainingMonsters: state.adventure.remainingMonsters.map(getMonsterObjectWithoutIcon),
      map: state.adventure.map,
    },
    research: state.research.map((research: Research | UpgradeableResearch) => {
      const baseData = {
        name: research.name,
        unlocked: research.unlocked,
      };
      if (research instanceof UpgradeableResearch) {
        return {
          ...baseData,
          level: research.level,
          multiplier: research.multiplier,
        };
      }
      return baseData;
    }),
    workerStations: state.workerStations.map((worker: BaseWorker) => {
      return { name: worker.name, numberOfWorkers: worker.numberOfWorkers };
    }),
    alchemy: {
      infusions: state.alchemy.infusions.map((infusion) => {
        return {
          name: infusion.name,
          workersAllocated: infusion.workersAllocated,
          level: infusion.level,
          contribution: infusion.contribution,
        };
      }),
      alchemyWorkers: state.alchemy.alchemyWorkers,
    },
    multipliers: state.multipliers,
    resources: state.resources,
    health: state.health,
    maps: state.maps,
    timestamp: Date.now(),
  };
};

const getMonsterObjectWithoutIcon = (monster: Monster) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...monsterWithoutIcon } = monster;
  return monsterWithoutIcon;
}
