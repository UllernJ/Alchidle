import { ref } from "vue";
import type { Research } from "../research";
import { useMonsters } from "../../composable/useMonsters";

export const unlockAlchemyResearch = ref<Research>({
  name: "Alchemy",
  description:
    "Unlock the secrets of alchemy. Enchant every aspect of your life.",
  cost: 0,
  unlocked: false,
  requirement: () => {
    const { map } = useMonsters();
    return map.value >= 0;
  },
});

export const alchemyResearch = ref<Research>({
  name: "Alchemy",
  description: "Improves your alchemists, doubling their efficiency (2x).",
  cost: 100,
  unlocked: false,
  effect: () => {},
  requirement: () => unlockAlchemyResearch.value.unlocked,
});

export const advancedAlchemyResearch = ref<Research>({
  name: "Advanced Alchemy",
  description:
    "Further improves your alchemists, doubling their efficiency (2x).",
  cost: 200,
  unlocked: false,
  effect: () => {},
  requirement: () => alchemyResearch.value.unlocked,
});
