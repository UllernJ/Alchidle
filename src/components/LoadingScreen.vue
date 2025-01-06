<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-container">
      <div class="loading-spinner">
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
            stroke="#fff"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
  <div v-if="showWelcomeBack" class="welcome-back-screen">
    <div class="welcome-back-container">
      <h2>Welcome Back!</h2>
      <p>You were gone for {{ elapsedTime }} seconds.</p>
      <p>Resources generated while you were away:</p>
      <p>
        Note that resources generated while you are away are only 25% of the
        actual rate.
      </p>
      <ul>
        <li v-for="(amount, resource) in generatedResources" :key="resource">
          {{ resource }}: {{ amount }}
        </li>
      </ul>
      <button @click="closeWelcomeBack">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLoading } from "../composable/useLoading";
import { useResource } from "../composable/useResource";
import { loadState } from "../utils/localStorage";
import type { RESOURCE } from "../types";

const { isLoading, stopLoading } = useLoading();
const showWelcomeBack = ref(false);
const elapsedTime = ref(0);
const generatedResources = ref<Record<string, number>>({});

const { resources, addResource } = useResource();

const calculateGeneratedResources = (elapsedTime: number) => {
  const generated: Record<string, number> = {};
  Object.entries(resources).forEach(([key, resource]) => {
    if (key.startsWith("max")) return;
    const rate = resource.value / 60;
    generated[key] = Math.floor((rate * elapsedTime) / 4);
    addResource(key as RESOURCE, generated[key]);
  });
  return generated;
};

onMounted(() => {
  const timestamp = loadState();
  if (timestamp) {
    const now = Date.now();
    elapsedTime.value = Math.floor((now - timestamp) / 1000);
    generatedResources.value = calculateGeneratedResources(elapsedTime.value);
    showWelcomeBack.value = true;
  }
  stopLoading();
});

const closeWelcomeBack = () => {
  showWelcomeBack.value = false;
};
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.welcome-back-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.welcome-back-container {
  background-color: #2b2b2b;
  padding: 2rem;
  border: 1px solid #f1f1f1;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3a3939;
  border: 1px solid #f1f1f1;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4a4949;
}

li {
  list-style: none;
}

ul {
  padding: 0;
  margin: 0;
  text-align: center;
}
</style>
