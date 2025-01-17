<template>
  <v-overlay
    v-model="showMultipliers"
    scroll-strategy="reposition"
    class="overlay"
  >
    <v-card class="multipliers-card">
      <v-card-title class="headline">
        Multipliers
      </v-card-title>
      <v-card-text>
        <div
          v-for="(value, key) in multipliers"
          :key="key"
          class="multiplier-item"
        >
          <span class="multiplier-key">{{ key }}:</span>
          <span class="multiplier-value">{{ formatNumber(value.value) }}x</span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :prepend-icon="mdiClose"
          :active="true"
          active-color="secondary"
          density="default"
          color="primary"
          variant="text"
          class="close-button"
          @click="toggleMultipliers"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script lang="ts" setup>
import { mdiClose } from "@mdi/js";
import { useMultipliers } from "../composable/useMultipliers";
import { formatNumber } from "../utils/number";

const { getMultipliers, showMultipliers, toggleMultipliers } = useMultipliers();
const multipliers = getMultipliers();
</script>

<style scoped>
.multipliers-card {
  background-color: #2b2b2b;
  border: 1px solid #ffff;
  width: 400px;
  padding: 16px;
}

.multiplier-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.headline {
  color: white;
}

.multiplier-key {
  color: white;
  font-weight: bold;
}

.multiplier-value {
  color: #4caf50;
}

</style>