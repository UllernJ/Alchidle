import { computed, reactive, ref, watchEffect } from "vue";
import { MonsterFactory } from "../factories/MonsterFactory";
import type { Monster } from "../models/Monster";
import { useActionLog } from "./useActionLog";
import { MessageType } from "./useMessage";
import Decimal from "break_eternity.js";
import { MONSTER_STATE, type MonsterState } from "@/types";
import { fifthMap, tenthMap } from "@/data/items/map";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";

const MONSTERS_PER_MAP = 30;

const difficulty = ref<number>(1);
const map = ref<number>(0);

const monsters = reactive<MonsterState>({
  value: [] as Monster[],
  state: MONSTER_STATE.MONSTERS,
});
const BASE_HEALTH = ref<Decimal>(new Decimal(32));
const monsterHealthMultiplier = ref<Decimal>(new Decimal(1));
const monsterHealth = computed(() => BASE_HEALTH.value.times(monsterHealthMultiplier.value));

const BASE_DAMAGE = ref<Decimal>(new Decimal(3.5));
const monsterDamageMultiplier = ref<Decimal>(new Decimal(1));
const monsterDamage = computed(() => BASE_DAMAGE.value.times(monsterDamageMultiplier.value));

// drop
const BASE_DROP = ref<Decimal>(new Decimal(5));
const dropMultiplier = ref<Decimal>(new Decimal(1));
const dropRate = computed(() => BASE_DROP.value.times(dropMultiplier.value));

const mapMonsters = ref<Monster[]>([]);

const currentMonster = computed(() => {
  if (monsters.state === MONSTER_STATE.MAP) {
    return mapMonsters.value.find((monster) =>
      monster.health.current.greaterThan(0)
    );
  }
  return monsters.value.find((monster) =>
    monster.health.current.greaterThan(0)
  );
});

export function useMonsters() {
  const getNextMonsters = () => {
    if (map.value >= 10) {
      const { onCompleteMap } = useReincarnation();
      onCompleteMap();
    }
    log();
    map.value += 1;
    const listOfMonsters = MonsterFactory.getMonsters(
      MONSTERS_PER_MAP,
      monsterHealth.value,
      monsterDamage.value,
      dropRate.value,
      map.value
    );
    BASE_DAMAGE.value =
      listOfMonsters[listOfMonsters.length - 1].attack.times(0.7);
    BASE_HEALTH.value = BASE_DAMAGE.value.times(3).dividedBy(2.25).times(10);
    BASE_DROP.value = BASE_DROP.value.times(3);
    monsters.value = listOfMonsters;
  };

  const log = () => {
    if (map.value !== 0) {
      const { logMessage } = useActionLog();
      logMessage("That was a tough one, but you made it!", MessageType.INFO);
    }
  };

  const setState = (state: MONSTER_STATE) => {
    monsters.state = state;
  };

  const numberOfDeadMonsters = computed(
    () =>
      (map.value - 1) * MONSTERS_PER_MAP +
      monsters.value.filter((monster) =>
        monster.health.current.lessThanOrEqualTo(0)
      ).length
  );

  const resetMonsters = () => {
    map.value = 0;
    monsters.value = [];
    BASE_HEALTH.value = new Decimal(30);
    BASE_DAMAGE.value = new Decimal(4);
    BASE_DROP.value = new Decimal(5);
    monsterHealthMultiplier.value = new Decimal(1);
    monsterDamageMultiplier.value = new Decimal(1);
    dropMultiplier.value = new Decimal(1);
  };

  const decreaseMonsterDamage = (multiplier: number) => {
    monsterDamageMultiplier.value = monsterDamageMultiplier.value.times(multiplier);
  };

  const decreaseMonsterHealth = (multiplier: number) => {
    monsterHealthMultiplier.value = monsterHealthMultiplier.value.times(multiplier);
  };

  const upgradeMonsterDrop = (multiplier: number) => {
    dropMultiplier.value = dropMultiplier.value.times(multiplier);
  };

  return {
    monsters,
    mapMonsters,
    getNextMonsters,
    setState,
    difficulty,
    numberOfDeadMonsters,
    map,
    currentMonster,
    isEveryMonsterDefeated: computed(() =>
      monsters.value.every((monster) =>
        monster.health.current.lessThanOrEqualTo(0)
      )
    ),
    BASE_DAMAGE,
    BASE_HEALTH,
    BASE_DROP,
    dropMultiplier,
    monsterHealthMultiplier,
    monsterDamageMultiplier,
    resetMonsters,
    decreaseMonsterDamage,
    decreaseMonsterHealth,
    upgradeMonsterDrop,
  };
}

//find a way to avoid logging messages when loading from a save
watchEffect(() => {
  if (map.value === 5 && !fifthMap.value.unlocked) {
    const { logMessage } = useActionLog();
    fifthMap.value.unlocked = true;
    logMessage(
      "You have found a map leading to a unknown temple, wonder what secrets you'll find there...",
      MessageType.INFO
    );
  } else if (map.value === 10 && !tenthMap.value.unlocked) {
    const { logMessage } = useActionLog();
    tenthMap.value.unlocked = true;
    logMessage(
      "You have found a map leading to a forgotten city, wonder what secrets you'll find there...",
      MessageType.INFO
    );
  }
});
