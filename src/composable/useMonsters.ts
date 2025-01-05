import { ref } from "vue";
import { MonsterFactory } from "../factories/monsterFactory";

const difficulty = ref<number>(1);
const monsters = ref(MonsterFactory.getMonsters(5, difficulty.value));

export function useMonsters() {
  return { monsters };
}
