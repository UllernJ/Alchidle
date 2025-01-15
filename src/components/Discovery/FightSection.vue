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
        :size="124"
      />
      
      <div class="monster-description">
        <span>{{ currentMonster.attack }}</span>
        <Icon
          :path="attackIcon"
          :size="24"
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
      <button
        class="attack-button"
        :disabled="isAttackOnCooldown"
        @click="isEmpty ? fetchNextMonsters() : attack()"
      >
        {{ isEmpty ? "Explore" : "Attack" }}
      </button>
      <button
        v-if="!isEmpty"
        class="attack-button"
        @click="autoAttack"
      >
        {{ autoAttackInterval ? "Stop" : "Auto Attack" }}
      </button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import { attackIcon } from "../../icons/icons";
import { useResource } from "../../composable/useResource";
import { MessageType } from "../../composable/useMessage";
import { getResourceDropMessage } from "../../utils/resourceUtil";
import { useActionLog } from "../../composable/useActionLog";
import { formatNumber } from "../../utils/number";
import { deeepClone } from "../../utils/object";
import type { Monster } from "../../models/Monster";

const { attackPower, health: playerHealth, defencePower, faint } = usePlayer();
const { getNextMonsters, map, currentMonster } = useMonsters();
const { logMessage } = useActionLog();
const { addResource } = useResource();

const isAttackOnCooldown = ref(false);
const initialHealth = ref<number | null>(null);
const autoAttackInterval = ref<number | null>(null);

watch(currentMonster, (newMonster) => {
  initialHealth.value = newMonster ? newMonster.health : null;
});

const isEmpty = computed(() => !currentMonster.value);
const isEmptyAndFirstTime = computed(() => isEmpty.value && map.value === 0);

const monsterHealthPercentage = computed(() => {
  if (!currentMonster.value || !initialHealth.value) return 0;
  return Math.floor((currentMonster.value.health / initialHealth.value) * 100);
});

const handleMonsterDefeat = (monster: Monster) => {
  if (!monster) return;

  const { resource, amount } = monster.drop;
  addResource(resource, amount);
  logMessage(
    getResourceDropMessage(resource, formatNumber(amount)),
    MessageType.INFO
  );

  if (!currentMonster.value) {
    logMessage(
      "You have defeated all monsters in this map!",
      MessageType.SUCCESS
    );
    logMessage("Proceeding to the next map...", MessageType.WARNING);
    fetchNextMonsters();
  }
};

const attack = () => {
  if (isAttackOnCooldown.value || !currentMonster.value) return;
  if (playerHealth.value <= 0) {
    logMessage("You need to rest.", MessageType.WARNING);
    return;
  }

  isAttackOnCooldown.value = true;
  const trueCurrentMonster = deeepClone(currentMonster.value) as Monster;
  const didMonsterDie = (currentMonster.value.health -= attackPower.value) <= 0;

  setTimeout(() => {
    isAttackOnCooldown.value = false;
  }, 1000);

  if (didMonsterDie) {
    handleMonsterDefeat(trueCurrentMonster);
  } else {
    playerHealth.value -= Math.max(
      0,
      currentMonster.value.attack - defencePower.value
    );
    playerHealth.value = Math.max(playerHealth.value, 0);
    if (playerHealth.value <= 0) {
      faint();
      logMessage(
        "You have been defeated. The monsters looted you for 10% of your resources.",
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
</script>

<style scoped>
.fight-cube {
  box-sizing: border-box;
  border-left: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: 100%;
}

.monster {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  width: 100%;
}

.monster-name {
  font-size: 1.5rem;
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
  font-size: 1em;
  text-align: center;
}

.attack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
}

.attack-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2b2b;
  width: fit-content;
  height: 100%;
  padding: 1rem;
  border: 1px solid #f1f1f1;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 100%;
  font-size: 0.75em;
}

.attack-button:hover {
  cursor: pointer;
  background-color: #3a3939;
}

.player-health {
  margin-top: 1rem;
}

.monster-description {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}
</style>
