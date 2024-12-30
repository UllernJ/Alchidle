<script setup lang="ts">
import { computed } from 'vue';
import { useResource } from '../../composable/useResource';
import type { RESOURCE } from '../../types';
import { useWorkers } from '../../composable/useWorkers';

const { resources, addResource } = useResource()
const { totalIncomePerSecond } = useWorkers()

const props = defineProps<{
  type: RESOURCE
}>()

const progress = computed(() => {
  const currentValue = resources[props.type].value;
  const maxValue = resources[`max${props.type}` as keyof typeof resources].value;
  return (currentValue / maxValue) * 100;
});

</script>

<template>
  <div class="money-container">
    <span class="title">{{ type.toString() }}</span>
    <div class="loading-bar-wrapper">
      <div
        class="loading-bar"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <div class="btn-amount">
    <button
      class="styled-button"
      @click="addResource(type, 1)"
    >
      Focus
    </button>
    <span> {{ `${resources[type].value} / ${resources[`max${type}`].value}` }}  </span>
  </div>
  </div>
</template>

<style scoped>
.money-container {
  background-color: #1a1a1a;
  border: 3px solid #242424;
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  width: 300px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  gap: .2rem;
}
.title {
  font-size: 1.2em;
}

.money-container-header {
  margin-bottom: 16px;
}

.money-container-title {
  font-size: 18px;
  color: #ffcc00; 
  text-shadow: 1px 1px 2px #000;
}

.loading-bar-wrapper {
  width: 100%;
  height: 20px;
  background: #242424;
  border: 2px solid #ffcc00;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
}

.loading-bar {
  height: 100%;
  background: linear-gradient(45deg, #ffcc00, #ffd700);
  transition: width 0.3s ease-in-out;
  border-radius: 8px;
}

.money-button:hover {
  transform: scale(1.05);
}

.styled-button {
  width: fit-content;
  padding: .33rem 2rem;
}

.btn-amount {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
