<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "../../composable/useResource";
import { RESOURCE } from "../../types";
import { useWorkers } from "../../composable/useWorkers";
import { usePlayer } from "../../composable/usePlayer";
import Icon from "../Icon.vue";
import { formatNumber } from "../../utils/number";

const { resources } = useResource();
const { totalIncomePerSecond } = useWorkers();
const { setFocus, currentFocus } = usePlayer();

const props = defineProps<{
  type: RESOURCE;
  icon: string;
}>();

const progress = computed(() => {
  const currentValue = resources[props.type].value;
  const maxValue =
    resources[`max${props.type}` as keyof typeof resources].value;
  return (currentValue / maxValue) * 100;
});

const gatherMessage = computed(() => {
  if (currentFocus.value === RESOURCE.MONEY) {
    return "Stealing money...";
  } else if (currentFocus.value === RESOURCE.MINING) {
    return "Mining rocks...";
  } else if (currentFocus.value === RESOURCE.SCIENCE) {
    return "Studying...";
  }
});
</script>

<template>
  <div class="money-container">
    <div class="header">
      <Icon :path="icon" :size="40" />
      <span>{{ type.toString() }}</span>
    </div>
    <span>
      +{{ formatNumber(totalIncomePerSecond[props.type] as number) }}/s</span
    >
    <span>
      {{
        `${formatNumber(resources[type].value)} / ${formatNumber(resources[`max${type}`].value)}`
      }}
    </span>
    <div class="loading-bar-wrapper">
      <div
        class="loading-bar"
        :style="{
          width: progress + '%',
          background: progress > 90 ? 'red' : '',
        }"
      ></div>
    </div>
    <button class="styled-button" @click="setFocus(type)">
      {{ currentFocus == type ? gatherMessage : "Gather" }}
    </button>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-top: -0.75rem;
  font-size: 1.5em;
}

.money-container {
  background-color: #1a1a1a;
  padding: 1.1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.33rem;
  border: 1px solid #f1f1f1;
  height: 100%;
  box-sizing: border-box;
}

.loading-bar-wrapper {
  width: 100%;
  height: 1.25rem;
  border: 2px solid #ffcc00;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.loading-bar {
  height: 100%;
  background: #ffcc00;
  transition: width 0.5s ease-in-out;
  border-radius: 8px;
}

.styled-button {
  width: 12rem;
  padding: 0.5rem 2rem;
  border: 1px solid #f1f1f1;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
