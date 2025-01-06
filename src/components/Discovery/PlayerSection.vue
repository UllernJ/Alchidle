<template>
  <section class="Player">
    <h2>Player</h2>
    <section class="icon-container">
      <Icon :path="playerIcon" :size="100" />
    </section>
    <div class="PlayerStats">
      <div class="Stat">
        <span>{{ attackPower }}</span>
        <Icon :path="attackIcon" :size="24" />
      </div>
      <div class="Stat">
        <span>{{ defencePower }}</span>
        <Icon :path="defenceIcon" :size="24" />
      </div>
    </div>
    <div class="health-bar">
      <div
        class="health-bar-inner"
        :style="{ width: playerHealthPercentage + '%' }"
      >
        <span>{{
          playerHealthPercentage > 0
            ? Math.floor(playerHealthPercentage) + "%"
            : null
        }}</span>
      </div>
    </div>
    <div class="Stat-regen">
      <span>+ {{ regen }}</span>
      <Icon :path="healthIcon" :size="24" color="red" />
      <span>/s</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePlayer } from "../../composable/usePlayer";
import {
  attackIcon,
  defenceIcon,
  healthIcon,
  playerIcon,
} from "../../icons/icons";
import Icon from "../Icon.vue";

const { attackPower, defencePower, health, maxHealth, regen } = usePlayer();

const playerHealthPercentage = computed(() => {
  return (health.value / maxHealth.value) * 100;
});
</script>

<style scoped>
.Player {
  background-color: #2b2b2b;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-right: 1px solid #f1f1f1;
  min-width: 15rem;
}

.icon-container {
  border-bottom: 1px solid #f1f1f1;
}

.PlayerStats {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  padding: 0.5rem 2rem;
}

.Stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.Stat span {
  font-size: 1.5em;
  font-weight: bold;
}

.health-bar {
  height: 1.25rem;
  width: 80%;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem;
}

.health-bar-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: red;
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
  color: white;
  font-weight: bold;
}

.Stat-regen {
  font-size: 1em;
  display: flex;
  align-items: center;
  gap: 0.1rem;
}
</style>
