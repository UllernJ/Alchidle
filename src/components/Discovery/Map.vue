<template>
  <div class="map-container">
    <h2>Zone: {{ zone }}</h2>
    <div class="maps">
      <template :key="mapIndex" v-for="mapIndex in 25">
        <button
          class="map-button"
          v-if="mapIndex <= highestUnlockedZone"
          :class="{ active: map === mapIndex - 1 }"
          @click="navigateToMap(mapIndex - 1)"
        >
          Map {{ mapIndex + zoneMultiplier }}
        </button>
      </template>
    </div>
    <div class="navigation">
      <button @click="zone--" :disabled="zone === 1">Previous</button>
      <button @click="zone++" :disabled="zone >= highestUnlockedZone">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMonsters } from "../../composable/useMonsters";

const { map, zone, highestUnlockedZone, getNextMonsters, goBack } =
  useMonsters();
const zoneMultiplier = computed(() => {
  if (zone.value === 1) return 1;
  return zone.value * 10;
});

const navigateToMap = (mapIndex: number) => {
  if (mapIndex < map.value) {
    goBack();
  } else {
    getNextMonsters();
  }
};
</script>

<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
}

.maps {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
}

.map-button {
  padding: 0.5rem 1.5rem;
  background-color: #2b2b2b;
  border: 1px solid #f1f1f1;
  color: #ffffff;
  cursor: pointer;
}

.map-button.active {
  background-color: cyan;
}

.map-button:hover {
  background-color: #3a3939;
}

.navigation {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2b2b2b;
  border: 1px solid #f1f1f1;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3a3939;
}

button:disabled {
  background-color: #444;
  cursor: not-allowed;
}
</style>
