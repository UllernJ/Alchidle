<template>
  <div class="alchemy-container">
    <section class="title-container">
      <span class="title">Alchemy</span>
      <Icon :path="infoIcon" :size="24" />
    </section>
    <section class="infusion-list">
      <div
        v-for="(infusion, index) in infusions"
        :key="index"
        class="infusion-item"
        :style="{
          backgroundColor: getColorFromName(infusion.name),
        }"
      >
        <p class="infusion-name">{{ infusion.name }}</p>
        <section class="progress-bar-container">
          <div class="progress-bar">
            <div
              class="progress-bar-inner"
              :style="{ width: infusionProgress(infusion) + '%' }"
            ></div>
          </div>
        </section>
        <p class="infusion-progress">
          {{ formatNumber(infusion.contribution) }} /
          {{ formatNumber(infusion.cost) }}
        </p>
        <p class="infusion-workers">Workers: {{ infusion.workersAllocated }}</p>
        <section class="infusion-buttons">
          <button
            @click="allocateAlchemist(index)"
            :disabled="employedAlchemists >= alchemistCount"
            class="infusion-button"
          >
            +
          </button>
          <button
            @click="deallocateAlchemist(index)"
            :disabled="infusion.workersAllocated === 0"
            class="infusion-button"
          >
            -
          </button>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAlchemy } from "../../composable/useAlchemy";
import { infoIcon } from "../../icons/icons";
import type { Infusion } from "../../models/Infusion";
import { formatNumber } from "../../utils/number";
import Icon from "../Icon.vue";

const {
  infusions,
  alchemistCount,
  employedAlchemists,
  allocateAlchemist,
  deallocateAlchemist,
} = useAlchemy();

const infusionProgress = (infusion: Infusion) => {
  return (infusion.contribution / infusion.cost) * 100;
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
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  padding: 1rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  margin-bottom: 1rem;
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
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0.5rem;
  min-width: 10rem;
}

.progress-bar-container {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  width: 100%;
  height: 1.25rem;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 0.5rem;
  margin: 0;
}

.progress-bar-inner {
  height: 100%;
  background-color: green;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
}

.infusion-progress,
.infusion-workers {
  flex: 1;
  font-size: 1rem;
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
  margin-top: 0.5rem;
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
