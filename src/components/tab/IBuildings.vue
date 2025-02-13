<template>
  <div class="buildings-container">
    <h1>Buildings</h1>
    <section class="building-list">
      <template
        v-for="(building, index) in buildings"
        :key="index"
      >
        <v-tooltip
          v-if="!building.requirement || building.requirement()"
          location="top"
          content-class="custom-tooltip"
        >
          <template #activator="{ props }">
            <v-btn 
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!canAfford(index)"
              v-bind="props"
              @click="upgradeBuilding(index)"
            >
              <Icon
                :path="building.icon"
                size="4.5em"
              />
              <div class="building-description">
                <h2>{{ building.name }} ({{ building.quantity }})</h2>
              </div>
            </v-btn>
          </template>
          <div class="tooltip-content">
            <h2
              v-if="amountToBuy !== 1"
              class="tooltip-header"
            >
              <!-- todo format -->
              {{ `${amountToBuy}x` }}
            </h2>

            <p class="description">
              {{ building.description }}
            </p>
            <div class="building-costs">
              <div
                v-for="(cost, costIndex) in building.getTotalPriceForQuantity(amountToBuy)"
                :key="costIndex"
                :class="['cost', { 'text-red': !canAffordResource(cost) }]"
              >
                <span>{{
                  formatNumber(cost.value)
                }}</span>
                <Icon
                  :path="getResourceIcon(cost.key)"
                  :size="20"
                  :color="canAffordResource(cost) ? '' : 'red'"
                />
              </div>
            </div>
          </div>
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "../../composable/useResource";
import Icon from "../Icon.vue";
import { getResourceIcon } from "../../utils/resourceUtil";
import { formatNumber } from "../../utils/number";
import type { RESOURCE } from "../../types";
import { usePlayer } from "../../composable/usePlayer";
import type Decimal from "break_eternity.js";
import { useBuildingsStore } from "@/stores/useBuildingsStore";

const { buildings } = useBuildingsStore();
const { resources } = useResource();
const { amountToBuy } = usePlayer();

const canAfford = computed(() => {
  return (index: number) => {
    const building = buildings[index];
    if (!building) return false;
    for (const cost of building.getTotalPriceForQuantity(amountToBuy.value)) {
      if (resources[cost.key].value.amount.lt(cost.value)) {
        return false;
      }
    }
    return true;
  };
});

const canAffordResource = computed(() => {
  return (cost: { key: RESOURCE; value: Decimal }) => {
    return resources[cost.key].value.amount.gte(cost.value);
  };
});

const upgradeBuilding = (index: number) => {
  const building = buildings[index];
  building.buy(amountToBuy.value);
};
</script>

<style scoped>
.buildings-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  padding: 1rem;
}

.building-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}



.building-description {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.p {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}

.cost {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25em;
  gap: 0.2rem;
  &:first-child {
    border-top: 1px solid #f1f1f1;
  }
}

.tooltip-header {
  font-size: 1.5em;
}

.description {
  font-size: 1.25em;
}

.building-costs {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
