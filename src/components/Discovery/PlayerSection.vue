<template>
  <section class="Player">
    <h2>Stats</h2>
    <div class="PlayerStats">
      <div class="Stat">
        <span>{{ Math.floor(attackPower) }}</span>
        <Icon :path="attackIcon" :size="24" />
      </div>
      <div class="Stat">
        <span>{{ Math.floor(defencePower) }}</span>
        <Icon :path="defenceIcon" :size="24" />
      </div>
      <div class="Stat-regen">
        <span> {{ health }} / {{ maxHealth }}</span>
        <Icon :path="healthIcon" :size="20" color="red" />
      </div>
      <div class="Stat-regen">
        <span>+ {{ regen }}</span>
        <Icon :path="healthIcon" :size="20" color="red" />
        <span>/s</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePlayer } from "../../composable/usePlayer";
import { attackIcon, defenceIcon, healthIcon } from "../../icons/icons";
import Icon from "../Icon.vue";

const { attackPower, defencePower, health, maxHealth, regen } = usePlayer();
</script>

<style scoped>
.Player {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-right: 1px solid #f1f1f1;
}

.icon-container {
  border-bottom: 1px solid #f1f1f1;
}

.PlayerStats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.Stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.Stat span {
  font-size: 1.25em;
  font-weight: bold;
}

.Stat-regen {
  font-size: 0.8em;
  display: flex;
  align-items: center;
  gap: 0.1rem;
}
</style>
