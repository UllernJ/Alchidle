<template>
  <section class="fight-cube">
    <section class="monster" v-if="currentMonster">
      <span class="monster-name">{{ currentMonster.name }}</span>
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
        @click="attack"
        :disabled="isAttackOnCooldown"
      >
        Attack
      </button>
      <button class="attack-button" @click="autoAttack">
        {{ autoAttackInterval ? "Stop" : "Auto Attack" }}
      </button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePlayer } from "../../composable/usePlayer";
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import type { Monster } from "../../factories/MonsterFactory";
import { attackIcon } from "../../icons/icons";
import { useResource } from "../../composable/useResource";
import { MessageType } from "../../composable/useMessage";
import { getResourceDropMessage } from "../../utils/resourceUtil";
import { useActionLog } from "../../composable/useActionLog";

const { attackPower, health: playerHealth, defencePower } = usePlayer();
const { monsters } = useMonsters();
const { addLog } = useActionLog();

const isAttackOnCooldown = ref(false);
const currentMonster = ref<Monster | null>(monsters.value[0]);
let initalHealth = currentMonster.value ? currentMonster.value.health : 0;
const autoAttackInterval = ref<number | null>(null);

const monsterHealthPercentage = computed(() => {
  if (!currentMonster.value) return 0;
  return initalHealth
    ? Math.floor((currentMonster.value.health / initalHealth) * 100)
    : 0;
});

const attack = () => {
  if (isAttackOnCooldown.value) return;
  if (!currentMonster.value) return;
  if (playerHealth.value <= 0) {
    addLog("You need to rest.", MessageType.WARNING);
    return;
  }

  isAttackOnCooldown.value = true;
  currentMonster.value.health -= attackPower.value;

  setTimeout(() => {
    isAttackOnCooldown.value = false;
  }, 1000);

  if (currentMonster.value.health <= 0) {
    //reward player
    const { addResource } = useResource();
    const { resource, amount } = currentMonster.value.drop;
    addResource(resource, amount);
    addLog(getResourceDropMessage(resource, amount), MessageType.INFO);
    //next monster
    const index = monsters.value.indexOf(currentMonster.value);
    currentMonster.value = monsters.value[index + 1];
    initalHealth = currentMonster.value ? currentMonster.value.health : 0;

    if (!currentMonster.value) {
      addLog(
        "You have defeated all monsters in this zone!",
        MessageType.SUCCESS
      );
    }
    //if no more monsters, stop auto attack
    if (!currentMonster.value && autoAttackInterval.value) {
      clearInterval(autoAttackInterval.value);
      autoAttackInterval.value = null;
    }
    return;
  }

  //monster attack
  playerHealth.value -= Math.max(
    0,
    currentMonster.value.attack - defencePower.value
  );
  if (playerHealth.value <= 0) {
    addLog("You have been defeated. You should rest now.", MessageType.ERROR);
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
</script>

<style scoped>
.fight-cube {
  background-color: #2b2b2b;
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
