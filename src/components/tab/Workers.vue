<template>
    <div class="worker-tab">
      <section class="worker-list">
        <div class="worker" 
        v-for="worker in workerStations" 
        :key="worker.name"
        @click="addWorker(worker.name)"
        >
          <p class="worker-name">{{ worker.name }} ({{ worker.numberOfWorkers }})</p>
          <p class="worker-count">Cost: {{ worker.cost }}$</p>
        </div>
      </section>
    </div>
  </template>

<script setup lang="ts">
import { useWorkers } from '../../composable/useWorkers';

const {
  workerStations,
  addWorker
} = useWorkers();

</script>

<style scoped>
.worker-tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  color: #ffffff;
}

.worker-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 1rem;
  width: 100%;
  margin-left: 1.5rem;
}

.worker {
  border: 1px solid white;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #292727;
  text-align: center;
  width: 25%;
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
  margin-bottom: 0.3rem;
}

.worker-description {
  font-size: .8em;
  color: #b0b0b0;
  text-align: start;
}
</style>