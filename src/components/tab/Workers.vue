<template>
  <div class="worker-tab">
    <section class="worker-list">
      <button
        class="worker"
        v-for="worker in workerStations"
        :key="worker.name"
        @click="addWorker(worker.name)"
        :disabled="!canAfford(worker)"
      >
        <Icon :path="worker.icon" :size="100" />
        <div class="worker-description">
          <p class="worker-name">
            {{ worker.name }} ({{ worker.numberOfWorkers }})
          </p>
          <div class="worker-cost">
            <p class="worker-count">{{ worker.cost }}</p>
            <Icon :path="moneyIcon" :size="20" />
          </div>
        </div>
      </button>
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
  gap: 1rem;
  border: 1px solid white;
  padding: 1rem;
  background-color: #292727;
  text-align: center;
  width: 15%;

  &:hover {
    cursor: pointer;
    background-color: #3a3939;
  }
}

.worker-name {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}

.worker-count {
  font-size: 0.9em;
}

.worker-cost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}
</style>
