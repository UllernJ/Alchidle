<template>
  <section class="fight-cube">
    <div class="info" v-if="isEmptyAndFirstTime">
      <p>Explore the map to find monsters to fight!</p>
      <p>Click on the Explore button to find monsters and gather resources.</p>
    </div>
    <section class="monster" v-if="currentMonster">
      <Icon class="icon" :path="mapIcon" :size="56" />
      <div class="header">
        <span class="monster-name">{{ currentMonster.name }}</span>
      </div>
      <Icon :path="currentMonster.icon" :size="124" />
      <div class="monster-description">
        <span>{{ currentMonster.attack }}</span>
        <Icon :path="attackIcon" :size="24" />
      </div>
      <div class="health-bar">
        <div
          class="health-bar-inner"
          :style="{ width: monsterHealthPercentage + '%' }"
        >
          <span>{{ monsterHealthPercentage }}%</span>
        </div>
      </div>
    </section>
    <section class="attack">
      <button
        class="attack-button"
        @click="isEmpty ? fetchNextMonsters() : attack()"
        :disabled="isAttackOnCooldown"
      >
        {{ isEmpty ? "Explore" : "Attack" }}
      </button>
      <button v-if="!isEmpty" class="attack-button" @click="autoAttack">
        {{ autoAttackInterval ? "Stop" : "Auto Attack" }}
      </button>
    </section>
    <div class="zone-map-info" v-if="!isEmpty && !isEmptyAndFirstTime">
      <span class="zone-info">Zone: {{ zone }}</span>
      <span class="map-info">Map: {{ map }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import { attackIcon, mapIcon } from "../../icons/icons";
import { useResource } from "../../composable/useResource";
import { MessageType } from "../../composable/useMessage";
import { getResourceDropMessage } from "../../utils/resourceUtil";
import { useActionLog } from "../../composable/useActionLog";

const { attackPower, health: playerHealth, defencePower } = usePlayer();
const { getNextMonsters, zone, map, currentMonster, defeatMonster } =
  useMonsters();
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

const handleMonsterDefeat = () => {
  if (!currentMonster.value) return;

  const { resource, amount } = currentMonster.value.drop;
  addResource(resource, amount);
  logMessage(
    getResourceDropMessage(resource, Math.floor(amount)),
    MessageType.INFO
  );

  defeatMonster();
  if (!currentMonster.value) {
    logMessage(
      "You have defeated all monsters in this zone!",
      MessageType.SUCCESS
    );
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
  currentMonster.value.health -= attackPower.value;

  setTimeout(() => {
    isAttackOnCooldown.value = false;
  }, 1000);

  if (currentMonster.value.health <= 0) {
    handleMonsterDefeat();
  } else {
    playerHealth.value -= Math.max(
      0,
      currentMonster.value.attack - defencePower.value
    );
    if (playerHealth.value <= 0) {
      logMessage(
        "You have been defeated. You should rest now.",
        MessageType.ERROR
      );
    }
  }
};

const autoAttack = () => {
  if (autoAttackInterval.value) {
    clearInterval(autoAttackInterval.value);
    autoAttackInterval.value = null;
  } else {
    autoAttackInterval.value = setInterval(attack, 1000);
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
  position: relative;
  box-sizing: border-box;
  border-left: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: 100%;
}

.zone-map-info {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.zone-info,
.map-info {
  font-size: 1rem;
  font-weight: bold;
}

.monster {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}

.monster-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.health-bar {
  height: 1.25rem;
  width: 100%;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
}

.health-bar-inner {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: red;
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
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
