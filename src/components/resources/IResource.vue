<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "@/composable/useResource";
import { RESOURCE } from "@/types";
import { useWorkers } from "@/composable/useWorkers";
import Icon from "@/components/Icon.vue";
import { formatNumber } from "@/utils/number";
import Decimal from "break_eternity.js";
import { usePlayerStore } from "@/stores/usePlayerStore";

const { resources } = useResource();
const { totalIncomePerSecond } = useWorkers();
const store = usePlayerStore();

const props = defineProps<{
  type: RESOURCE;
  icon: string;
}>();

const progress = computed(() => {
  const currentValue = resources[props.type].value;
  const maxValue =
    resources[props.type as keyof typeof resources].value.maxAmount;
  return currentValue.amount.dividedBy(maxValue).times(100).toNumber();
});

const gatherMessage = computed(() => {
  if (store.currentFocus === RESOURCE.MONEY) {
    return "Stealing...";
  } else if (store.currentFocus === RESOURCE.MINING) {
    return "Mining...";
  } else if (store.currentFocus === RESOURCE.SCIENCE) {
    return "Studying...";
  }
  return "No idea what to do...";
});
</script>

<template>
  <div class="resource-container">
    <div class="header">
      <Icon
        :path="icon"
        size="2em"
      />
      <span>{{ type.toString() }}</span>
    </div>
    <span class="resource-values">
      {{
        `${formatNumber(resources[type].value.amount)} / ${formatNumber(resources[type].value.maxAmount)}`
      }}
    </span>
    <div class="loading-bar-wrapper">
      <div
        class="loading-bar"
        :style="{
          width: progress + '%',
          background: progress > 90 ? 'red' : '',
        }"
      />
    </div>
    <div class="button-container">
      <v-btn
        color="white"
        variant="outlined"
        :active="store.currentFocus == type"
        width="50%"
        @click="store.setFocus(type)"
      >
        {{ store.currentFocus == type ? gatherMessage : "Gather" }}
      </v-btn>
      <span class="income">
        +{{ formatNumber(totalIncomePerSecond[props.type] ?? new Decimal(0)) }}/s
      </span>
    </div>
  </div>
</template>

<style scoped>
.resource-container {
  background-color: #1a1a1a;
  padding: 0.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.33rem;
  border: 1px solid #f1f1f1;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-top: -0.75rem;
  font-size: 1.5em;
}

.loading-bar-wrapper {
  width: 100%;
  height: 1.2rem;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.loading-bar {
  height: 100%;
  background: #ffcc00;
  transition: width 0.25s ease-in-out;
  border-radius: 8px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 2rem;
}
.income {
  font-size: 1em;
  font-weight: 600;
  width: 20%;
}
</style>
