<template>
  <div class="progress-container">
    <span class="map-info">Map: {{ map }}</span>
    <div class="progress-grid">
      <div
        v-for="index in MONSTERS_PER_MAP"
        :key="index"
        :class="['progress-box', { defeated: index <= monstersDefeated }]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMonsters } from "../../composable/useMonsters";

const { monsters, MONSTERS_PER_MAP, map } = useMonsters();

const monstersDefeated = computed(() => {
  return MONSTERS_PER_MAP - monsters.value.length;
});
</script>

<style scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-left: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.progress-box {
  width: 100%;
  padding-top: 100%;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 4px;
}

.progress-box.defeated {
  background-color: green;
}

.map-info {
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}

.icon-active {
  opacity: 0.5;
}
</style>
