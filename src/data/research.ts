import { ref } from "vue";
import { UpgradeableResearch } from "../models/research/UpgradeableResearch";
import { isDev } from "../utils/dev";
import { RESEARCH_INTERVAL } from "../models/research/ResearchInterval";
import { useAlchemy } from "../composable/useAlchemy";
import { useMonsters } from "../composable/useMonsters";
import { Research } from "../models/research/Research";
import { usePlayer } from "../composable/usePlayer";
import { useActionLog } from "../composable/useActionLog";
import { MessageType } from "../composable/useMessage";
import Decimal from "break_eternity.js";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { useWorkersStore } from "@/components/stores/useWorkerStore";

export function getDefaultCostByResearchName(name: string) {
  switch (name) {
    case "Science":
      return new Decimal(2000);
    case "Blacksmithing":
      return new Decimal(50);
    case "Exploration":
      return new Decimal(25);
    case "Blocking":
      return new Decimal(1250);
    case "Trainer Upgrade":
      return new Decimal(50000);
    case "Blocking Training":
      return new Decimal(100000);
    case "Mathematics":
      return new Decimal(400);
    case "Mining":
      return new Decimal(400);
    case "Efficiency":
      return new Decimal(200);
    case "Combat Training":
      return new Decimal(25000);
    case "Fortification":
      return new Decimal(25000);
    case "Blueprint: Worker Hut":
      return new Decimal(isDev ? 0 : 250000);
    case "Alchemy":
      return new Decimal(isDev ? 0 : 55000);
    case "Advanced Alchemy":
      return new Decimal(500000);
    case "Blueprint: Hospital":
      return new Decimal(isDev ? 0 : 40000);
    case "Upgrade Priest":
      return new Decimal(2500);
    case "Auto Attack":
      return new Decimal(1000);
    case "Reincarnation":
      return new Decimal(isDev ? 0 : 1000000);
    default:
      return new Decimal(100);
  }
}

export const scienceResearch = ref(
  new UpgradeableResearch(
    "Science",
    "Improves your scientists, doubling their efficiency (2x).",
    getDefaultCostByResearchName("Science"),
    () =>
      mathematicsResearch.value.level >= 1 && miningResearch.value.level >= 1,
    4,
    RESEARCH_INTERVAL.EVERY_SECOND,
    () => {
      const workerStore = useWorkersStore();
      workerStore.resourceWorkersList.scientist.upgradeRate(2);
    }
  )
);

export const blacksmithingResearch = ref(
  new Research(
    "Blacksmithing",
    "Unlocks the ability buy miners and craft weapons and armor.",
    getDefaultCostByResearchName("Blacksmithing"),
    () => explortationResearch.value.unlocked
  )
);

export const explortationResearch = ref(
  new Research(
    "Exploration",
    "Unlocks the ability to explore the world.",
    getDefaultCostByResearchName("Exploration"),
    () => true,
    () => {
      const { logMessage } = useActionLog();
      logMessage(
        "You have unlocked the ability to explore the world.",
        MessageType.INFO
      );
    }
  )
);

export const blockingResearch = ref(
  new Research(
    "Blocking",
    "Unlocks trainers, who can train your defence. Protects you from incoming damage.",
    getDefaultCostByResearchName("Blocking"),
    () => {
      const { map } = useMonsters();
      return explortationResearch.value.unlocked && map.value >= 3;
    }
  )
);

export const trainerUpgradeResearch = ref(
  new UpgradeableResearch(
    "Trainer Upgrade",
    "Improves your trainers, doubling their blocking.",
    getDefaultCostByResearchName("Trainer Upgrade"),
    () => blockingResearch.value.unlocked,
    5,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      const workerStore = useWorkersStore();
      workerStore.trainer.upgrade(2);
    }
  )
);

export const blockingTrainingResearch = ref(
  new UpgradeableResearch(
    "Blocking Training",
    "Increases your defense power by 100%.",
    getDefaultCostByResearchName("Blocking Training"),
    () =>
      blockingResearch.value.unlocked &&
      trainerUpgradeResearch.value.level >= 1,
    10,
    RESEARCH_INTERVAL.EVERY_FIFTH,
    () => {
      const { upgradeDefensePower } = usePlayer();
      upgradeDefensePower(2);
    }
  )
);

export const mathematicsResearch = ref(
  new UpgradeableResearch(
    "Mathematics",
    "Improves your bankers, doubling their efficiency (2x).",
    getDefaultCostByResearchName("Mathematics"),
    () => efficiencyResearch.value.level >= 1,
    3,
    RESEARCH_INTERVAL.EVERY,
    () => {
      const workerStore = useWorkersStore();
      workerStore.resourceWorkersList.banker.upgradeRate(2);
    }
  )
);

export const miningResearch = ref(
  new UpgradeableResearch(
    "Mining",
    "Improves your miners, doubling their efficiency (2x).",
    getDefaultCostByResearchName("Mining"),
    () => efficiencyResearch.value.level >= 1,
    3,
    RESEARCH_INTERVAL.EVERY,
    () => {
      const workerStore = useWorkersStore();
      workerStore.resourceWorkersList.miner.upgradeRate(2);
    }
  )
);

export const efficiencyResearch = ref(
  new UpgradeableResearch(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    getDefaultCostByResearchName("Efficiency"),
    () => blacksmithingResearch.value.unlocked,
    2.5,
    RESEARCH_INTERVAL.EVERY,
    () => {
      const { upgradeProductionRate } = usePlayer();
      upgradeProductionRate(2);
    }
  )
);

export const combatTrainingResearch = ref(
  new UpgradeableResearch(
    "Combat Training",
    "Increases your attack by 10%.",
    getDefaultCostByResearchName("Combat Training"),
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
  )
);

export const fortificationResearch = ref(
  new UpgradeableResearch(
    "Fortification",
    "Increases your defense power by 10%.",
    getDefaultCostByResearchName("Fortification"),
    () => combatTrainingResearch.value.level >= 1,
    10,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      const { upgradeDefensePower } = usePlayer();
      upgradeDefensePower();
    }
  )
);

export const workerHutBlueprintResearch = ref(
  new Research(
    "Blueprint: Worker Hut",
    "Unlocks the ability to build worker huts, boosting their life qualities and production.",
    getDefaultCostByResearchName("Blueprint: Worker Hut"),
    () => {
      const { map } = useMonsters();
      return map.value >= 10 || isDev;
    }
  )
);

export const unlockAlchemyResearch = ref(
  new Research(
    "Alchemy",
    "Unlock the secrets of alchemy. Enchant every aspect of your life.",
    getDefaultCostByResearchName("Alchemy"),
    () => {
      const { map } = useMonsters();
      return map.value >= 5 || isDev;
    }
  )
);

export const advancedAlchemyResearch = ref(
  new UpgradeableResearch(
    "Advanced Alchemy",
    "Further improves your alchemists, doubling their efficiency (2x).",
    getDefaultCostByResearchName("Advanced Alchemy"),
    () => {
      const { map } = useMonsters();
      return unlockAlchemyResearch.value.unlocked && map.value >= 10;
    },
    20,
    RESEARCH_INTERVAL.EVERY_TENTH,
    () => {
      const { upgradeAlchemists } = useAlchemy();
      upgradeAlchemists();
    }
  )
);

export const hostpitalBlueprintResearch = ref(
  new Research(
    "Blueprint: Hospital",
    "Unlocks the ability to build hospitals, increasing your health regen.",
    getDefaultCostByResearchName("Blueprint: Hospital"),
    () => {
      const { map } = useMonsters();
      return map.value >= 4 || isDev;
    }
  )
);

export const upgradePriestResearch = ref(
  new UpgradeableResearch(
    "Upgrade Priest",
    "Improves your priests, doubling their healing power.",
    getDefaultCostByResearchName("Upgrade Priest"),
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
  )
);

export const autoAttackResearch = ref(
  new Research(
    "Auto Attack",
    "Unlocks the ability to automatically attack monsters.",
    getDefaultCostByResearchName("Auto Attack"),
    () => {
      const { numberOfDeadMonsters } = useMonsters();
      return numberOfDeadMonsters.value >= 10;
    }
  )
);

export const reincarnationResearch = ref(
  new Research(
    "Reincarnation",
    "Unlocks the ability to reincarnate. Reset your progress and gain a bonus.",
    getDefaultCostByResearchName("Reincarnation"),
    () => {
      const { map } = useMonsters();
      return map.value >= 10 || isDev;
    },
    () => {
      const { unlockReincarnation } = useReincarnation();
      unlockReincarnation();
    }
  )
);

export const researchs = ref<Research[]>([
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
].sort((a, b) => a.name.localeCompare(b.name)));
