import { ref } from "vue";
import { MonsterFactory } from "../factories/MonsterFactory";
import type { Monster } from "../models/Monster";

const DEFAULT_INCREASE = 1.1;
const DEFAULT_MONSTERS = 10;

const difficulty = ref<number>(1);
const zone = ref<number>(1);
const map = ref<number>(0);
const monsters = ref<Monster[]>([]);

export function useMonsters() {
  const getNextMonsters = () => {
    map.value += 1;
    if (map.value % 10 === 0) {
      difficulty.value *= 1.5; //We increase difficulty even more every 10 maps
      zone.value += 1; // Increase zone every 10 maps
    } else {
      difficulty.value *= DEFAULT_INCREASE;
    }
    monsters.value = MonsterFactory.getMonsters(
      DEFAULT_MONSTERS,
      difficulty.value,
      zone.value
    );
  };

  const goBack = () => {
    map.value -= 1;
    if (map.value % 10 === 0) {
      difficulty.value /= 1.5;
      zone.value -= 1;
    } else {
      difficulty.value /= DEFAULT_INCREASE;
    }
    monsters.value = MonsterFactory.getMonsters(
      DEFAULT_MONSTERS,
      difficulty.value,
      zone.value
    );
  };
  return { monsters, getNextMonsters, goBack, difficulty, zone, map };
}
