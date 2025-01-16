<template>
  <div class="progress-container">
    <span class="map-info">Map: {{ map }}</span>
    <div class="progress-grid">
      <div
        v-for="monster, index in monsters"
        :key="index"
        :class="['progress-box', { defeated: monster.health <= 0 }]"
      >
        <div class="icon-container">
          <Icon
            v-if="monster.drop.amount > 0"
            class="icon"
            :path="getResourceIcon(monster.drop.resource)"
            :size="24"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import { getResourceIcon } from "../../utils/resourceUtil";

const { monsters, map } = useMonsters();

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 100%;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 4px;
  position: relative;
}

.progress-box.defeated {
  background-color: green;
}

.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-info {
  width: 100%;
  font-size: 1em;
  font-weight: bold;
}
</style>