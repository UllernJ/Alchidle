<template>
  <div class="worker-tab">
    <section class="worker-list">
      <template v-for="worker in workerStations" :key="worker.name">
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <button
              class="worker"
              @click="addWorker(worker.name)"
              :disabled="!canAfford(worker)"
              v-bind="props"
            >
              <Icon :path="worker.icon" :size="80" />
              <div class="worker-description">
                <p class="worker-name">
                  {{ worker.name }} ({{ worker.numberOfWorkers }})
                </p>
                <div class="worker-rate">
                  <p>+{{ worker.rate }}/s</p>
                  <Icon :path="getResourceIcon(worker.resource)" :size="20" />
                </div>
              </div>
            </button>
          </template>
          <span>{{ worker.description }}</span>
          <div class="worker-cost">
            <p class="worker-count">Costs: {{ worker.cost }}</p>
            <Icon :path="moneyIcon" :size="20" />
          </div>
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "../../composable/useResource";
import { useWorkers } from "../../composable/useWorkers";
import { RESOURCE, type WorkerStation } from "../../types";
import Icon from "../Icon.vue";
import { moneyIcon } from "../../icons/icons";
import { getResourceIcon } from "../../utils/resourceUtil";

const { workerStations, addWorker } = useWorkers();

const { resources } = useResource();

const canAfford = computed(() => {
  return (worker: WorkerStation) => {
    return resources[RESOURCE.MONEY].value >= worker.cost;
  };
});
</script>

<style scoped>
.worker-tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin-left: 1rem;
}

.worker-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.worker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #f1f1f1;
  padding: 1rem;
  background-color: #2b2b2b;
  width: 15rem;
  &:hover {
    cursor: pointer;
    background-color: #3a3939;
  }
}

.worker-description {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.worker-name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0;
}

.worker-cost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.worker-rate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: 0.9em;
}

.p {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}
</style>
