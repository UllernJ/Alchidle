<template>
  <div class="alchemy-container">
    <section class="infusion-list">
      <div
        v-for="(infusion, index) in infusions"
        :key="index"
        class="infusion-item"
      >
        <p class="infusion-name">{{ infusion.name }}</p>
        <div class="progress-bar">
          <div
            class="progress-bar-inner"
            :style="{ width: infusionProgress(infusion) + '%' }"
          ></div>
        </div>
        <p class="infusion-progress">
          {{ infusion.contribution }} / {{ infusion.cost }}
        </p>
        <p class="infusion-workers">
          Workers Allocated: {{ infusion.workersAllocated }}
        </p>
        <button
          @click="allocateAlchemist(index)"
          :disabled="employedAlchemists >= alchemistCount"
          class="infusion-button"
        >
          <Icon :path="plusIcon" :size="20" />
        </button>
        <button
          @click="deallocateAlchemist(index)"
          :disabled="infusion.workersAllocated === 0"
          class="infusion-button"
        >
          <Icon :path="minusIcon" :size="20" />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAlchemy } from "../../composable/useAlchemy";
import Icon from "../Icon.vue";
import { plusIcon, minusIcon } from "../../icons/icons";
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin-left: 1rem;
  margin-top: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.infusion-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.infusion-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f1f1f1;
  padding: 1rem;
  background-color: #2b2b2b;
  width: 50%;
  text-align: center;
}

.infusion-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
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
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.infusion-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  border: 1px solid #f1f1f1;
  padding: 0.5rem;
  margin-top: 0.5rem;
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
