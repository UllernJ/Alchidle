import type { Armor, Weapon } from "../composable/useGear";
import type { SessionState } from "./localStorage";
import type { Building } from "../models/Building";
import type { Worker } from "../models/Worker";
import type { Research } from "../models/research/Research";

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
      remainingMonsters: state.adventure.remainingMonsters,
      map: state.adventure.map,
    },
    research: state.research.map((research: Research) => {
      return { name: research.name, unlocked: research.unlocked };
    }),
    workerStations: state.workerStations.map((worker: Worker) => {
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
    timestamp: Date.now(),
  };
};
