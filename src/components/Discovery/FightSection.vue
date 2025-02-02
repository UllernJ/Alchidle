<template>
  <section class="fight-cube">
    <div
      v-if="isEmptyAndFirstTime"
      class="info"
    >
      <p>Explore the map to find monsters to fight!</p>
      <p>Click on the Explore button to find monsters and gather resources.</p>
    </div>
    <section
      v-if="currentMonster"
      class="monster"
    >
      <div class="header">
        <span class="monster-name">{{ currentMonster.name }}</span>
      </div>

      <Icon
        :path="currentMonster.icon"
        size="5.5em"
      />

      <div class="monster-description">
        <span>{{ formatNumber(currentMonster.attack) }}</span>
        <Icon
          :path="attackIcon"
          :size="20"
        />
      </div>
      <div class="health-bar">
        <div
          class="health-bar-inner"
          :style="{ width: monsterHealthPercentage + '%' }"
        >
          <span>{{ formatNumber(currentMonster.health) }} /
            {{ initialHealth ? formatNumber(initialHealth) : null }}</span>
        </div>
      </div>
    </section>
    <section class="attack">
      <v-btn
        class="attack-button"
        variant="outlined"
        color="white"
        :disabled="isAttackOnCooldown"
        @click="isEmpty ? fetchNextMonsters() : attack()"
      >
        {{ isEmpty ? "Explore" : "Attack" }}
      </v-btn>
      <v-btn
        v-if="!isEmpty"
        class="attack-button"
        variant="outlined"
        @click="autoAttack"
      >
        {{ autoAttackInterval ? "Stop" : "Auto Attack" }}
      </v-btn>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import { attackIcon } from "../../icons/icons";
import { useResource } from "../../composable/useResource";
import { MessageType } from "../../composable/useMessage";
import { getResourceDropMessage } from "../../utils/resourceUtil";
import { useActionLog } from "../../composable/useActionLog";
import { formatNumber } from "../../utils/number";
import { Monster } from "../../models/Monster";
import Decimal from "break_eternity.js";
import { MONSTER_STATE } from "@/types";
import { useInventory } from "@/composable/useInventory";

const { attackPower, health: playerHealth, defencePower } = usePlayer();
const { getNextMonsters, map, currentMonster, mapMonsters, monsters } =
  useMonsters();
const { logMessage } = useActionLog();
const { addResource } = useResource();

const isAttackOnCooldown = ref(false);
const initialHealth = ref<Decimal | null>(null);
const autoAttackInterval = ref<ReturnType<typeof setInterval> | null>(null);
const defeatedMonster = ref<Monster | null>(null);

const isEmpty = computed(() => !currentMonster.value);
const isEmptyAndFirstTime = computed(() => isEmpty.value && map.value === 0);

const monsterHealthPercentage = computed(() => {
  if (!currentMonster.value || !initialHealth.value) return 0;
  return currentMonster.value.health
    .dividedBy(initialHealth.value)
    .times(100)
    .toNumber();
});

const handleMonsterDefeat = (monster: Monster) => {
  if (!monster) return;

  const { resource, amount } = monster.drop;
  addResource(resource, amount);
  logMessage(
    getResourceDropMessage(resource, formatNumber(amount) || 0),
    MessageType.INFO
  );

  if (!currentMonster.value) {
    logMessage(
      "You have defeated all monsters in this map!",
      MessageType.SUCCESS
    );
    if (monsters.state === MONSTER_STATE.MAP) {
      const { activeMap } = useInventory();
      activeMap.value?.complete();
    } else {
      logMessage("Proceeding to the next map...", MessageType.WARNING);
      fetchNextMonsters();
    }
  }
};

const attack = () => {
  if (isAttackOnCooldown.value || !currentMonster.value) return;
  if (playerHealth.value.lessThanOrEqualTo(0)) {
    return;
  }

  isAttackOnCooldown.value = true;
  currentMonster.value.takeDamage(attackPower.value);

  setTimeout(() => {
    isAttackOnCooldown.value = false;
  }, 500); // cooldown .5s

  if (defeatedMonster.value && defeatedMonster.value.isDead()) {
    handleMonsterDefeat(defeatedMonster.value);
    defeatedMonster.value = currentMonster.value;
  } else {
    const damageTaken = currentMonster.value.attack.minus(defencePower.value);
    playerHealth.value = playerHealth.value.minus(damageTaken);
    playerHealth.value = playerHealth.value.lessThan(0)
      ? new Decimal(0)
      : playerHealth.value;
    if (playerHealth.value.lessThanOrEqualTo(0)) {
      logMessage(
        "You have been defeated. You need to rest.",
        MessageType.ERROR
      );
      clearAutoAttack();
    }
  }
};

const autoAttack = () => {
  if (autoAttackInterval.value) {
    clearAutoAttack();
  } else {
    logMessage("Auto Attack started.", MessageType.INFO);
    autoAttackInterval.value = setInterval(attack, 1000);
  }
};

const clearAutoAttack = () => {
  if (autoAttackInterval.value) {
    logMessage("Auto Attack stopped.", MessageType.WARNING);
    clearInterval(autoAttackInterval.value);
    autoAttackInterval.value = null;
  }
};

const fetchNextMonsters = () => {
  getNextMonsters();
  initialHealth.value = currentMonster.value
    ? currentMonster.value.health
    : null;
};

watch(currentMonster, (newMonster) => {
  initialHealth.value = newMonster ? newMonster.health : null;
  if (!defeatedMonster.value) {
    defeatedMonster.value = newMonster as Monster;
  }
  if (mapMonsters.value.length > 0) {
    defeatedMonster.value = newMonster as Monster;
  }
});

onMounted(() => {
  if (currentMonster.value) {
    initialHealth.value = currentMonster.value.health;
  }
  if (defeatedMonster.value === null) {
    defeatedMonster.value = currentMonster.value as Monster;
  }
});
</script>

<style scoped>
.fight-cube {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border-left: 1px solid #f1f1f1;
  padding: 0.5rem;
  height: 100%;
  width: 100%;
}

.monster {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
}

.monster-name {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 1rem;
}

.health-bar {
  position: relative;
  height: 12%;
  width: 100%;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 0.7em;
  }
}

.health-bar-inner {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: red;
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  text-align: center;
}

.attack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 0.75rem;
}

.attack-button {
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 100%;
  font-size: 0.9em;
}

.attack-button:hover {
  cursor: pointer;
  background-color: #3a3939;
}

.monster-description {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}

.info {
  font-size: 0.9em;
}
</style>
