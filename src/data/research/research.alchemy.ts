import { ref } from "vue";
import { Research } from "../../models/research/Research";
import { useMonsters } from "../../composable/useMonsters";
import { isDev } from "../../utils/dev";
import { useAlchemy } from "../../composable/useAlchemy";

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

export const alchemyResearch = ref(
  new Research(
    "Alchemy enchantment",
    "Improves your alchemists, doubling their efficiency (2x).",
    5000,
    () => unlockAlchemyResearch.value.unlocked,
    () => {
      const { upgradeAlchemists } = useAlchemy();
      upgradeAlchemists();
    }
  )
);

export const advancedAlchemyResearch = ref(
  new Research(
    "Advanced Alchemy",
    "Further improves your alchemists, doubling their efficiency (2x).",
    25000,
    () => alchemyResearch.value.unlocked,
    () => {
      const { upgradeAlchemists } = useAlchemy();
      upgradeAlchemists();
    }
  )
);
