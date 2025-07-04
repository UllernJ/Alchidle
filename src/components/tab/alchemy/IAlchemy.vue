<template>
  <div class="alchemy-container">
    <section class="top-container">
      <i-alchemist />
      <i-alchemy-worker />
    </section>
    <section class="infusion-list">
      <div
        v-for="(infusion, index) in store.infusions"
        :key="index"
        class="infusion-item"
        :style="{
          backgroundColor: getColorFromName(infusion.name),
        }"
      >
        <span class="infusion-name">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon
                :icon="mdiInformationBoxOutline"
                v-bind="props"
              />
            </template>
            <span>{{ infusion.description }}</span>
          </v-tooltip>
          {{ `${infusion.name} (${infusion.level})` }}
        </span>
        <section class="progress-bar-container">
          <div class="progress-bar">
            <div
              class="progress-bar-inner"
              :style="{ width: infusionProgress(infusion) + '%' }"
            />
            <span class="progress-text">
              {{ formatNumber(infusion.contribution) }} /
              {{ formatNumber(infusion.cost) }}
            </span>
          </div>
        </section>
        <p class="infusion-workers">
          Workers: {{ formatNumber(infusion.workersAllocated) }}
        </p>
        <section class="infusion-buttons">
          <v-btn
            :disabled="infusion.workersAllocated.lte(0)"
            class="infusion-button"
            @click="store.deallocateAlchemist(index)"
          >
            -
          </v-btn>
          <v-btn
            :disabled="store.employedAlchemists >= store.alchemist.numberOfWorkers.toNumber()"
            class="infusion-button"
            @click="store.allocateAlchemist(index)"
          >
            +
          </v-btn>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import IAlchemist from "./IAlchemist.vue";
import IAlchemyWorker from "./IAlchemyWorker.vue";
import type { Infusion } from "../../../models/Infusion";
import { formatNumber } from "../../../utils/number";
import { mdiInformationBoxOutline } from "@mdi/js";
import { useAlchemyStore } from "@/stores/useAlchemyStore";

const store = useAlchemyStore();

const infusionProgress = (infusion: Infusion) => {
  return (infusion.contribution.div(infusion.cost).toNumber() * 100) % 100;
};


const getColorFromName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 2) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substring(value.toString(16).length);
  }
  // Increase contrast by adjusting the color brightness
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  // Increase brightness by 30%
  r = Math.min(255, Math.floor(r * 0.75));
  g = Math.min(255, Math.floor(g * 0.5));
  b = Math.min(255, Math.floor(b * 1.1));

  return `rgb(${r}, ${g}, ${b})`;
};
</script>

<style scoped>
.alchemy-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  padding: 1rem;
}

.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  gap: 5rem;
  padding: 1rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  padding: 0.5rem;
  & > span {
    font-size: 1.5em;
    font-weight: bold;
  }
}

.infusion-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.infusion-item {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f1f1f1;
  padding: 1rem;
  width: 100%;
}

.infusion-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1em;
  font-weight: bold;
  width: 100%;
  max-width: 15%;
}

.progress-bar-container {
  max-width: 60%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  width: 100%;
  height: 1.4rem;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar-inner {
  height: 100%;
  background-color: green;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-text {
  position: absolute;
  width: 100%;
  color: #fff;
  font-weight: bold;
  z-index: 1;
  font-size: 0.8em;
  text-align: center;
}

.infusion-buttons {
  display: flex;
  gap: 0.5rem;
}

.infusion-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  border: 1px solid #f1f1f1;
  padding: 0.5rem;
  min-width: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.infusion-button:hover {
  background-color: #3a3939;
}

.infusion-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
