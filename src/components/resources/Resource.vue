<script setup lang="ts">
import { computed } from 'vue';
import { useResource } from '../../composable/useResource';
import type { RESOURCE } from '../../types';
import { useWorkers } from '../../composable/useWorkers';
import { usePlayer } from '../../composable/usePlayer';

const { resources } = useResource()
const { totalIncomePerSecond } = useWorkers()
const { setFocus, currentFocus } = usePlayer()

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
    <span> {{ `${resources[type].value} / ${resources[`max${type}`].value}` }}  </span>
    <div class="loading-bar-wrapper">
      <div
        class="loading-bar"
        :style="{ 
          width: progress + '%',
          background: progress > 90 ? 'red' : ''
        }"
      >
    </div>
    </div>
    <button
      class="styled-button"
      @click="setFocus(type)"
    >
      {{currentFocus == type ? 'Gathering...' : 'Gather'}}
    </button>
  </div>
</template>

<style scoped>
.money-container {
  background-color: #1a1a1a;
  border: 3px solid #242424;
  padding: 1.1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .33rem;
  border: 1px solid white;
}
.title {
  font-weight: bold;
  margin-top: -.75rem;
  
  font-size: 1.2em;
}

.loading-bar-wrapper {
  width: 100%;
  height: 20px;
  border: 2px solid #ffcc00;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: .5rem;
}

.loading-bar {
  height: 100%;
  background: #ffcc00;
  transition: width 0.3s ease-in-out;
  border-radius: 8px;
}

.styled-button {
  width: 10rem;
  padding: .33rem 2rem;
  border: 1px solid white;
  &:hover {
    opacity: .8;
    cursor: pointer;
  }
}
</style>
