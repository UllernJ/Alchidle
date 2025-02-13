import { ref } from "vue";
import { UpgradeableResearch } from "@/models/research/UpgradeableResearch";
import { isDev } from "@/utils/dev";
import { RESEARCH_INTERVAL } from "@/models/research/ResearchInterval";
import { useMonsters } from "@/composable/useMonsters";
import { Research } from "@/models/research/Research";
import { usePlayer } from "@/composable/usePlayer";
import { useActionLog } from "@/composable/useActionLog";
import { MessageType } from "@/composable/useMessage";
import Decimal from "break_eternity.js";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { useWorkersStore } from "@/stores/useWorkerStore";
import { useAlchemyStore } from "@/stores/useAlchemyStore";

function createScienceResearch() {
  return new UpgradeableResearch(
    "Science",
    "Improves your scientists, doubling their efficiency (2x).",
    new Decimal(2000),
    () =>
      mathematicsResearch.value.level >= 1 && miningResearch.value.level >= 1,
    4,
    RESEARCH_INTERVAL.EVERY_SECOND,
    () => {
      const workerStore = useWorkersStore();
      workerStore.resourceWorkersList.scientist.upgradeRate(2);
    }
  );
}

function createBlacksmithingResearch() {
  return new Research(
    "Blacksmithing",
    "Unlocks the ability buy miners and craft weapons and armor.",
    new Decimal(50),
    () => explortationResearch.value.unlocked
  );
}

function createExplorationResearch() {
  return new Research(
    "Exploration",
    "Unlocks the ability to explore the world.",
    new Decimal(25),
    () => true,
    () => {
      const { logMessage } = useActionLog();
      logMessage(
        "You have unlocked the ability to explore the world.",
        MessageType.INFO
      );
    }
  );
}

function createBlockingResearch() {
  return new Research(
    "Blocking",
    "Unlocks trainers, who can train your defence. Protects you from incoming damage.",
    new Decimal(1250),
    () => {
      const { map } = useMonsters();
      return explortationResearch.value.unlocked && map.value >= 3;
    }
  );
}

function createTrainerUpgradeResearch() {
  return new UpgradeableResearch(
    "Trainer Upgrade",
    "Improves your trainers, doubling their blocking.",
    new Decimal(50000),
    () => blockingResearch.value.unlocked,
    5,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      const workerStore = useWorkersStore();
      workerStore.trainer.upgrade(2);
    }
  );
}

function createBlockingTrainingResearch() {
  return new UpgradeableResearch(
    "Blocking Training",
    "Increases your defense power by 100%.",
    new Decimal(100000),
    () =>
      blockingResearch.value.unlocked &&
      trainerUpgradeResearch.value.level >= 1,
    10,
    RESEARCH_INTERVAL.EVERY_FIFTH,
    () => {
      const { upgradeDefensePower } = usePlayer();
      upgradeDefensePower(2);
    }
  );
}

function createMathematicsResearch() {
  return new UpgradeableResearch(
    "Mathematics",
    "Improves your bankers, doubling their efficiency (2x).",
    new Decimal(400),
    () => efficiencyResearch.value.level >= 1,
    3,
    RESEARCH_INTERVAL.EVERY,
    () => {
      const workerStore = useWorkersStore();
      workerStore.resourceWorkersList.banker.upgradeRate(2);
    }
  );
}

function createMiningResearch() {
  return new UpgradeableResearch(
    "Mining",
    "Improves your miners, doubling their efficiency (2x).",
    new Decimal(400),
    () => efficiencyResearch.value.level >= 1,
    3,
    RESEARCH_INTERVAL.EVERY,
    () => {
      const workerStore = useWorkersStore();
      workerStore.resourceWorkersList.miner.upgradeRate(2);
    }
  );
}

function createEfficiencyResearch() {
  return new UpgradeableResearch(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    new Decimal(200),
    () => blacksmithingResearch.value.unlocked,
    2.5,
    RESEARCH_INTERVAL.EVERY,
    () => {
      const { upgradeProductionRate } = usePlayer();
      upgradeProductionRate(2);
    }
  );
}

function createCombatTrainingResearch() {
  return new UpgradeableResearch(
    "Combat Training",
    "Increases your attack by 10%.",
    new Decimal(25000),
    () => {
      const { map } = useMonsters();
      return map.value >= 3;
    },
    10,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      const { upgradeAttackPower } = usePlayer();
      upgradeAttackPower();
    }
  );
}

function createFortificationResearch() {
  return new UpgradeableResearch(
    "Fortification",
    "Increases your defense power by 10%.",
    new Decimal(25000),
    () => combatTrainingResearch.value.level >= 1,
    10,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      const { upgradeDefensePower } = usePlayer();
      upgradeDefensePower();
    }
  );
}

function createWorkerHutBlueprintResearch() {
  return new Research(
    "Blueprint: Worker Hut",
    "Unlocks the ability to build worker huts, boosting their life qualities and production.",
    new Decimal(isDev ? 0 : 250000),
    () => {
      const { map } = useMonsters();
      return map.value >= 10 || isDev;
    }
  );
}

function createUnlockAlchemyResearch() {
  return new Research(
    "Alchemy",
    "Unlock the secrets of alchemy. Enchant every aspect of your life.",
    new Decimal(isDev ? 0 : 55000),
    () => {
      const { map } = useMonsters();
      return map.value >= 5 || isDev;
    }
  );
}

function createAdvancedAlchemyResearch() {
  return new UpgradeableResearch(
    "Advanced Alchemy",
    "Further improves your alchemists, doubling their efficiency (2x).",
    new Decimal(500000),
    () => {
      const { map } = useMonsters();
      return unlockAlchemyResearch.value.unlocked && map.value >= 10;
    },
    20,
    RESEARCH_INTERVAL.EVERY_TENTH,
    () => {
      const { alchemist } = useAlchemyStore();
      alchemist.upgrade(2);
    }
  );
}

function createHospitalBlueprintResearch() {
  return new Research(
    "Blueprint: Hospital",
    "Unlocks the ability to build hospitals, increasing your health regen.",
    new Decimal(isDev ? 0 : 40000),
    () => {
      const { map } = useMonsters();
      return map.value >= 4 || isDev;
    }
  );
}

function createUpgradePriestResearch() {
  return new UpgradeableResearch(
    "Upgrade Priest",
    "Improves your priests, doubling their healing power.",
    new Decimal(2500),
    () => {
      const { map } = useMonsters();
      return map.value >= 2;
    },
    2,
    RESEARCH_INTERVAL.EVERY_FIFTH,
    () => {
      const workerStore = useWorkersStore();
      workerStore.priest.upgrade(2);
    }
  );
}

function createAutoAttackResearch() {
  return new Research(
    "Auto Attack",
    "Unlocks the ability to automatically attack monsters.",
    new Decimal(1000),
    () => {
      const { numberOfDeadMonsters } = useMonsters();
      return numberOfDeadMonsters.value >= 10;
    }
  );
}

function createReincarnationResearch() {
  return new Research(
    "Reincarnation",
    "Unlocks the ability to reincarnate. Reset your progress and gain a bonus.",
    new Decimal(isDev ? 0 : 1000000),
    () => {
      const { map } = useMonsters();
      return map.value >= 10 || isDev;
    },
    () => {
      const { unlockReincarnation } = useReincarnation();
      unlockReincarnation();
    }
  );
}

export const scienceResearch = ref(createScienceResearch());
export const blacksmithingResearch = ref(createBlacksmithingResearch());
export const explortationResearch = ref(createExplorationResearch());
export const blockingResearch = ref(createBlockingResearch());
export const trainerUpgradeResearch = ref(createTrainerUpgradeResearch());
export const blockingTrainingResearch = ref(createBlockingTrainingResearch());
export const mathematicsResearch = ref(createMathematicsResearch());
export const miningResearch = ref(createMiningResearch());
export const efficiencyResearch = ref(createEfficiencyResearch());
export const combatTrainingResearch = ref(createCombatTrainingResearch());
export const fortificationResearch = ref(createFortificationResearch());
export const workerHutBlueprintResearch = ref(
  createWorkerHutBlueprintResearch()
);
export const unlockAlchemyResearch = ref(createUnlockAlchemyResearch());
export const advancedAlchemyResearch = ref(createAdvancedAlchemyResearch());
export const hostpitalBlueprintResearch = ref(
  createHospitalBlueprintResearch()
);
export const upgradePriestResearch = ref(createUpgradePriestResearch());
export const autoAttackResearch = ref(createAutoAttackResearch());
export const reincarnationResearch = ref(createReincarnationResearch());

export const getResearchs = () => {
  scienceResearch.value = createScienceResearch();
  blacksmithingResearch.value = createBlacksmithingResearch();
  explortationResearch.value = createExplorationResearch();
  blockingResearch.value = createBlockingResearch();
  trainerUpgradeResearch.value = createTrainerUpgradeResearch();
  blockingTrainingResearch.value = createBlockingTrainingResearch();
  mathematicsResearch.value = createMathematicsResearch();
  miningResearch.value = createMiningResearch();
  efficiencyResearch.value = createEfficiencyResearch();
  combatTrainingResearch.value = createCombatTrainingResearch();
  fortificationResearch.value = createFortificationResearch();
  workerHutBlueprintResearch.value = createWorkerHutBlueprintResearch();
  unlockAlchemyResearch.value = createUnlockAlchemyResearch();
  advancedAlchemyResearch.value = createAdvancedAlchemyResearch();
  hostpitalBlueprintResearch.value = createHospitalBlueprintResearch();
  upgradePriestResearch.value = createUpgradePriestResearch();
  autoAttackResearch.value = createAutoAttackResearch();
  reincarnationResearch.value = createReincarnationResearch();
  return [
    efficiencyResearch.value,
    mathematicsResearch.value,
    miningResearch.value,
    unlockAlchemyResearch.value,
    scienceResearch.value,
    combatTrainingResearch.value,
    fortificationResearch.value,
    advancedAlchemyResearch.value,
    blacksmithingResearch.value,
    explortationResearch.value,
    workerHutBlueprintResearch.value,
    blockingResearch.value,
    hostpitalBlueprintResearch.value,
    blockingTrainingResearch.value,
    trainerUpgradeResearch.value,
    upgradePriestResearch.value,
    autoAttackResearch.value,
    reincarnationResearch.value,
  ].sort((a, b) => a.name.localeCompare(b.name));
};
