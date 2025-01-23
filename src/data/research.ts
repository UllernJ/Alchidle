import { ref } from "vue";
import { UpgradeableResearch } from "../models/research/UpgradeableResearch";
import { isDev } from "../utils/dev";
import { RESEARCH_INTERVAL } from "../models/research/ResearchInterval";
import { useAlchemy } from "../composable/useAlchemy";
import { useMonsters } from "../composable/useMonsters";
import { Research } from "../models/research/Research";
import { usePlayer } from "../composable/usePlayer";
import { BANKER, MINER, SCIENTIST } from "./workers";
import { useActionLog } from "../composable/useActionLog";
import { MessageType } from "../composable/useMessage";

const { map } = useMonsters();

export const scienceResearch = ref(
  new UpgradeableResearch(
    "Science",
    "Improves your scientists, doubling their efficiency (2x).",
    1000,
    () =>
      mathematicsResearch.value.level >= 1 && miningResearch.value.level >= 1,
    4,
    RESEARCH_INTERVAL.EVERY_SECOND,
    () => {
      SCIENTIST.value.upgradeRate(2);
    }
  )
);

export const blacksmithingResearch = ref(
  new Research(
    "Blacksmithing",
    "Unlocks the ability buy miners and craft weapons and armor.",
    50,
    () => explortationResearch.value.unlocked
  )
);

export const explortationResearch = ref(
  new Research(
    "Exploration",
    "Unlocks the ability to explore the world.",
    25,
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
    500,
    () => explortationResearch.value.unlocked && map.value >= 3
  )
);

export const mathematicsResearch = ref(
  new UpgradeableResearch(
    "Mathematics",
    "Improves your bankers, doubling their efficiency (2x).",
    100,
    () => efficiencyResearch.value.level >= 1,
    3,
    RESEARCH_INTERVAL.EVERY,
    () => {
      BANKER.value.upgradeRate(2);
    }
  )
);

export const miningResearch = ref(
  new UpgradeableResearch(
    "Mining",
    "Improves your miners, doubling their efficiency (2x).",
    100,
    () => efficiencyResearch.value.level >= 1,
    3,
    RESEARCH_INTERVAL.EVERY,
    () => {
      MINER.value.upgradeRate(2);
    }
  )
);

export const efficiencyResearch = ref(
  new UpgradeableResearch(
    "Efficiency",
    "Improves your own efficiency, doubling production rate (2x).",
    100,
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
    "Increases your attack power by 10%.",
    10000,
    () => map.value >= 3,
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
    10000,
    () => combatTrainingResearch.value.level >= 1,
    10,
    RESEARCH_INTERVAL.EVERY_THIRD,
    () => {
      const { upgradeDefensePower } = usePlayer();
      upgradeDefensePower();
    }
  )
);


export const workerHutBlueprintResearch = ref(new Research(
    "Blueprint: Worker Hut",
    "Unlocks the ability to build worker huts, boosting their life qualities and production.",
    isDev ? 0 : 50000,
    () => {
        const {map} = useMonsters();
        return map.value >= 10 || isDev;
    }
));

export const unlockAlchemyResearch = ref(
  new Research(
    "Alchemy",
    "Unlock the secrets of alchemy. Enchant every aspect of your life.",
    isDev ? 0 : 1000,
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
    25000,
    () => unlockAlchemyResearch.value.unlocked && map.value >= 10,
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
    isDev ? 0 : 25000,
    () => {
      const { map } = useMonsters();
      return map.value >= 4 || isDev;
    }
  )
);



export const researchList = [
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
  hostpitalBlueprintResearch.value
].sort((a, b) => a.cost - b.cost);