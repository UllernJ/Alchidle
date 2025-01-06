import { ref } from "vue";
import { MonsterFactory } from "../factories/MonsterFactory";

const difficulty = ref<number>(1);
const monsters = ref(MonsterFactory.getMonsters(10, difficulty.value));

export function useMonsters() {
  return { monsters };
}
