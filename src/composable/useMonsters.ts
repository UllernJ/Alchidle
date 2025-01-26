import { computed, ref } from "vue";
import { MonsterFactory } from "../factories/MonsterFactory";
import type { Monster } from "../models/Monster";
import { useActionLog } from "./useActionLog";
import { MessageType } from "./useMessage";

const MONSTERS_PER_MAP = 30;

const difficulty = ref<number>(1);
const map = ref<number>(0);
const monsters = ref<Monster[]>([]);
const BASE_HEALTH = ref<number>(30);
const BASE_DAMAGE = ref<number>(4);
const currentMonster = computed(
  () => monsters.value.find((monster) => monster.health > 0) || null
);

export function useMonsters() {
  const getNextMonsters = () => {
    log();
    map.value += 1;
    const listOfMonsters = MonsterFactory.getMonsters(
      MONSTERS_PER_MAP,
      BASE_HEALTH.value,
      BASE_DAMAGE.value,
      map.value
    );
    BASE_DAMAGE.value = listOfMonsters[listOfMonsters.length - 1].attack * 0.7;
    BASE_HEALTH.value = BASE_DAMAGE.value * 10;
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

  const log = () => {
    if (map.value !== 0) {
    const { logMessage } = useActionLog();
    logMessage("That was a though one, but you made it!", MessageType.INFO);
    logMessage("Maybe you unlocked new research?", MessageType.INFO);
    }
  }

  return {
    monsters,
    getNextMonsters,
    difficulty,
    map,
    currentMonster,
    isEveryMonsterDefeated: computed(() =>
      monsters.value.every((monster) => monster.health <= 0)
    ),
    BASE_DAMAGE,
    BASE_HEALTH,
  };
}
