import { ref } from "vue";
import { Research } from "../../models/research/Research";
import { mathematicsResearch, miningResearch } from "./research.resource";
import { SCIENTIST } from "../workers";
import { UpgradeableResearch } from "../../models/research/UpgradeableResearch";
import { RESEARCH_INTERVAL } from "../../models/research/ResearchInterval";
import { useActionLog } from "../../composable/useActionLog";
import { MessageType } from "../../composable/useMessage";

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
    () => explortationResearch.value.unlocked
  )
);
