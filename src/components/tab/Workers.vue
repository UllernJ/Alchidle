<template>
  <div class="worker-tab">
    <section class="worker-list">
      <template v-for="worker in workerStations" :key="worker.name">
        <v-tooltip location="top" v-if="!worker.requirement">
          <template v-slot:activator="{ props }">
            <button
              class="worker"
              @click="addWorker(worker.name)"
              :disabled="!canAfford(worker)"
              v-bind="props"
            >
              <Icon :path="worker.icon" :size="80" />
              <div class="worker-description">
                <h2>{{ worker.name }} ({{ worker.numberOfWorkers }})</h2>
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
      <v-tooltip location="top" v-if="alchemyWorkers.required()">
        <template v-slot:activator="{ props }">
          <button
            class="worker"
            @click="buyAlchemist"
            :disabled="!canAffordAlchemist"
            v-bind="props"
          >
            <Icon :path="alchemistIcon" :size="80" />
            <div class="worker-description">
              <h2>
                {{ alchemyWorkers.name }} ({{ alchemyWorkers.numberOfWorkers }})
              </h2>
            </div>
          </button>
        </template>
        <div class="worker-cost">
          <p class="worker-count">Costs: {{ alchemyWorkers.cost.value }}</p>
          <Icon :path="moneyIcon" :size="20" />
        </div>
      </v-tooltip>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "../../composable/useResource";
import { useWorkers } from "../../composable/useWorkers";
import { RESOURCE, type WorkerStation } from "../../types";
import Icon from "../Icon.vue";
import { alchemistIcon, moneyIcon } from "../../icons/icons";
import { getResourceIcon } from "../../utils/resourceUtil";
import { useAlchemy } from "../../composable/useAlchemy";

const { workerStations, addWorker } = useWorkers();
const { alchemyWorkers, buyAlchemist } = useAlchemy();

const { resources } = useResource();

const canAfford = computed(() => {
  return (worker: WorkerStation) => {
    return resources[RESOURCE.MONEY].value >= worker.cost;
  };
});

const canAffordAlchemist = computed(() => {
  return resources[RESOURCE.MONEY].value >= alchemyWorkers.value.cost.value;
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
