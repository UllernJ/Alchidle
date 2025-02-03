<template>
  <div class="worker-tab">
    <h1>Workers</h1>
    <section class="worker-list">
      <template
        v-for="worker in workerStations"
        :key="worker.name"
      >
        <v-tooltip
          v-if="!worker.requirement || worker.requirement()"
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!canAffordAmount(worker)"
              v-bind="props"
              @click="worker.buyQuantity(amountToBuy)"
            >
              <Icon
                :path="worker.icon"
                size="4.5em"
              />
              <div class="worker-description">
                <h2>{{ worker.name }} ({{ worker.numberOfWorkers }})</h2>
              </div>
            </v-btn>
          </template>
          <section>
            <h2 v-if="amountToBuy !== 1">
              {{ amountToBuy + 'x' }}
            </h2>

            <p class="description">
              {{ worker.description }}
            </p>
            <div
              v-if="worker instanceof Worker"
              class="worker-cost"
            >
              <span>Generates {{ formatNumber(worker.production.rate) }}</span>
              <Icon
                :path="getResourceIcon(worker.production.resource)"
                :size="20"
              />
              <span>/s</span>
            </div>
            <div :class="['worker-cost', { 'text-red': !canAffordAmount(worker) }]">
              <span>{{ formatNumber(worker.getTotalPriceFromQuantity(amountToBuy)) }}</span>
              <Icon
                :path="moneyIcon"
                :size="20"
                :color="canAffordAmount(worker) ? '' : 'red'"
              />
            </div>
          </section>
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "../../composable/useResource";
import { useWorkers } from "../../composable/useWorkers";
import Icon from "../Icon.vue";
import {  moneyIcon } from "../../icons/icons";
import { getResourceIcon } from "../../utils/resourceUtil";
import { formatNumber } from "../../utils/number";
import { usePlayer } from "../../composable/usePlayer";
import { RESOURCE } from "../../types";
import type { BaseWorker } from "../../models/worker/BaseWorker";
import { Worker } from "../../models/worker/Worker";
import type Decimal from "break_eternity.js";

const { workerStations } = useWorkers();
const { amountToBuy } = usePlayer();

const { resources } = useResource();

const canAfford = computed(() => {
  return (cost: Decimal) => {
    return resources[RESOURCE.MONEY].value.amount.gte(cost);
  };
});

const canAffordAmount = computed(() => {
  return (worker: BaseWorker) => {
    return canAfford.value(worker.getTotalPriceFromQuantity(amountToBuy.value));
  };
})

</script>

<style scoped>
.worker-tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  padding: 1rem;
}

.worker-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

h2 {
  font-size: 1.5em;
}

.worker-cost {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25em;
  gap: 0.2rem;
  width: 100%;
  &:last-child {
    border-top: 1px solid #f1f1f1;
    margin-top: 0.5rem;
  }
}

.worker-description {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.description {
  font-size: 1.25em;
}
</style>
