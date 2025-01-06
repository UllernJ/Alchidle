<template>
  <div class="alchemy-container">
    <section class="infusion-list">
      <div
        v-for="(infusion, index) in infusions"
        :key="index"
        class="infusion-item"
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
          {{ infusion.contribution }} / {{ infusion.cost }}
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
import type { Infusion } from "../../data/alchemy";

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
  background-color: #2b2b2b;
  width: 100%;
}

.infusion-name {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 0.5rem;
  min-width: 12rem;
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
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-bar-inner {
  height: 100%;
  background-color: green;
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
}

.infusion-progress,
.infusion-workers {
  flex: 1;
  font-size: 1rem;
  margin-bottom: 0.5rem;
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
