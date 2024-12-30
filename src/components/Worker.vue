<template>
    <div class="worker-tab">
      <div class="worker-tab-header">
        <span class="worker-tab-title">Workers</span>
      </div>
      <section class="worker-list">
        <div class="worker" v-for="worker in workerStations" :key="worker.name">
          <p class="worker-name">{{ worker.name }}</p>
          <p class="worker-rate">Rate: {{ worker.rate }}$/s</p>
          <p class="worker-count">Count: {{ worker.numberOfWorkers }}</p>
          <p class="worker-count">Cost: {{ worker.cost }}$</p>
          <div class="worker-actions">
            <button @click="addWorker(worker.name)" class="worker-button">+ Add</button>
            <button @click="removeWorker(worker.name)" class="worker-button" :disabled="worker.numberOfWorkers === 0">
              - Remove
            </button>
          </div>
        </div>
      </section>
    </div>
  </template>

<script setup lang="ts">
import { useWorkers } from "../composable/useWorkers";

const {
  workerStations,
  addWorker,
  removeWorker
} = useWorkers();

</script>

<style scoped>
.worker-tab {
  background-color: #1a1a1a;
  border: 3px solid #242424;
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  width: 300px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  margin-top: 16px;
}

.worker-tab-header {
  margin-bottom: 16px;
}

.worker-tab-title {
  display: block;
  font-size: 18px;
  color: #ffcc00; /* Retro gold color */
  text-shadow: 1px 1px 2px #000;
}

.worker {
  border: 2px solid #ffcc00;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.87);
  text-align: left;
}

.worker-name {
  font-size: 1empx;
  color: #ffcc00;
  text-shadow: 1px 1px 2px #000;
  margin: 4px 0;
}

.worker-rate,
.worker-count {
  font-size: .8em;
  color: #00ff00;
  text-shadow: 1px 1px 2px #000;
  margin: 4px 0;
}

.worker-actions {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}

.worker-button {
  background-color: #ffcc00;
  color: #1a1a1a;
  border: 2px solid #242424;
  border-radius: 4px;
  padding: .5rem 1rem;
  font-size: .8em;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.worker-button:hover {
  transform: scale(1.05);
}

.worker-button:disabled {
  background-color: #555555;
  color: #999999;
  cursor: not-allowed;
}
</style>