import { computed, ref } from "vue";
import { MonsterFactory } from "../factories/MonsterFactory";
import type { Monster } from "../models/Monster";

const MONSTERS_PER_MAP = 30;

const difficulty = ref<number>(1);
const map = ref<number>(0);
const monsters = ref<Monster[]>([]);
const BASE_HEALTH = ref<number>(30);
const BASE_DAMAGE = ref<number>(2);
const currentMonster = computed(
  () => monsters.value.find((monster) => monster.health > 0) || null
);

export function useMonsters() {
  const getNextMonsters = () => {
    map.value += 1;
    const listOfMonsters = MonsterFactory.getMonsters(
      MONSTERS_PER_MAP,
      BASE_HEALTH.value,
      BASE_DAMAGE.value,
      map.value
    );
    BASE_DAMAGE.value = listOfMonsters[listOfMonsters.length - 1].attack * 0.75;
    BASE_HEALTH.value = listOfMonsters[listOfMonsters.length - 1].health * 0.75;
    monsters.value = listOfMonsters;
    const consolData = monsters.value.map((monster) => {
      return {
        health: monster.health,
        attack: monster.attack,
        drop: monster.drop.amount,
      };
    })
    console.log(consolData);
  };

  return {
    monsters,
    getNextMonsters,
    difficulty,
    map,
    currentMonster,
  };
}
