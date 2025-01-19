import { ref } from "vue";
import { Research } from "../../models/research/Research";
import { useMonsters } from "../../composable/useMonsters";
import { isDev } from "../../utils/dev";
import { useAlchemy } from "../../composable/useAlchemy";
import { UpgradeableResearch } from "../../models/research/UpgradeableResearch";
import { RESEARCH_INTERVAL } from "../../models/research/ResearchInterval";

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
    () => unlockAlchemyResearch.value.unlocked,
    4,
    RESEARCH_INTERVAL.EVERY_TENTH,
    () => {
      const { upgradeAlchemists } = useAlchemy();
      upgradeAlchemists();
    }
  )
);
