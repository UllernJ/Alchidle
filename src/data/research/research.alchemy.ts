import { ref } from "vue";
import type { Research } from "../research";
import { useMonsters } from "../../composable/useMonsters";
import { isDev } from "../../utils/dev";
import { useAlchemy } from "../../composable/useAlchemy";

export const unlockAlchemyResearch = ref<Research>({
  name: "Alchemy",
  description:
    "Unlock the secrets of alchemy. Enchant every aspect of your life.",
  cost: isDev ? 0 : 1000,
  unlocked: false,
  requirement: () => {
    const { map } = useMonsters();
    return map.value >= 5;
  },
});

export const alchemyResearch = ref<Research>({
  name: "Alchemy enchantment",
  description: "Improves your alchemists, doubling their efficiency (2x).",
  cost: 5000,
  unlocked: false,
  effect: () => {
    const { upgradeAlchemists } = useAlchemy();
    upgradeAlchemists();
  },
  requirement: () => unlockAlchemyResearch.value.unlocked,
});

export const advancedAlchemyResearch = ref<Research>({
  name: "Advanced Alchemy",
  description:
"Further improves your alchemists, doubling their efficiency (2x).",
  cost: 25000,
  unlocked: false,
  effect: () => {
    const { upgradeAlchemists } = useAlchemy();
    upgradeAlchemists();
  },
  requirement: () => alchemyResearch.value.unlocked,
});
