<template>
  <div class="worker-tab">
    <h1>Workers</h1>
    <section class="worker-list">
      <div
        v-for="{ worker, isAffordable } in affordableWorkers"
        v-show="!worker.requirement || worker.requirement()"
        :key="worker.id"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!isAffordable"
              v-bind="props"
              @click="worker.buyQuantity(store.amountToBuy)"
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
            <h2 v-if="store.amountToBuy !== 1">
              {{ store.amountToBuy + "x" }}
            </h2>
            <p class="description">
              {{ worker.description }}
            </p>
            <div
              v-if="worker instanceof Worker"
              class="worker-cost"
            >
              <span>Generates
                {{
                  formatNumber(
                    worker.getProduction(workerStore.eachWorkerBoostPercentage),
                    true
                  )
                }}</span>
              <Icon
                :path="getResourceIcon(worker.production.resource)"
                :size="20"
              />
              <span>/s</span>
            </div>
            <div
              :class="['worker-cost', { 'text-red': !isAffordable }]"
            >
              <span>{{
                formatNumber(
                  worker.getTotalPriceFromQuantity(store.amountToBuy)
                )
              }}</span>
              <Icon
                :path="moneyIcon"
                :size="20"
                :color="isAffordable ? '' : 'red'"
              />
            </div>
          </section>
        </v-tooltip>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "@/composable/useResource";
import Icon from "@/components/Icon.vue";
import { moneyIcon } from "@/icons/icons";
import { getResourceIcon } from "@/utils/resourceUtil";
import { formatNumber } from "@/utils/number";
import { Worker } from "@/models/worker/Worker";
import { useWorkersStore } from "@/stores/useWorkerStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const workerStore = useWorkersStore();
const store = usePlayerStore();

const { throttledMoneyAmount } = useResource();

const affordableWorkers = computed(() => {
  return workerStore.workers.map((worker) => ({
    worker,
    isAffordable: throttledMoneyAmount.value.gte(
      worker.getTotalPriceFromQuantity(store.amountToBuy)
    ),
  }));
});
</script>

<style scoped>

.worker-tab {
  height: 100%;
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
