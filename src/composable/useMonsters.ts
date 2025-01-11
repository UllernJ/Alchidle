import { computed, ref } from "vue";
import { MonsterFactory } from "../factories/MonsterFactory";
import type { Monster } from "../models/Monster";

const DEFAULT_INCREASE = 1.15;
const MONSTERS_PER_MAP = 40;
const MAP_PER_ZONE = 25;

const difficulty = ref<number>(1);
const map = ref<number>(0);
const monsters = ref<Monster[]>([]);
const currentMonster = computed(() => monsters.value[0] || null);

export function useMonsters() {
  const getNextMonsters = () => {
    map.value += 1;
    difficulty.value *= DEFAULT_INCREASE;
    monsters.value = MonsterFactory.getMonsters(
      MONSTERS_PER_MAP,
      difficulty.value
    );
  };

  const goBack = () => {
    map.value -= 1;
    difficulty.value /= DEFAULT_INCREASE;
    monsters.value = MonsterFactory.getMonsters(
      MONSTERS_PER_MAP,
      difficulty.value
    );
  };

  const defeatMonster = () => {
    monsters.value.shift();
  };

  return {
    MONSTERS_PER_MAP,
    monsters,
    getNextMonsters,
    goBack,
    difficulty,
    map,
    currentMonster,
    defeatMonster,
  };
}
