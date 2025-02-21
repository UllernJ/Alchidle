<template>
  <div class="buildings-container">
    <h1>Buildings</h1>
    <section class="building-list">
      <div
        v-for="{ building, index, isAffordable } in affordableBuildings"
        v-show="!building.requirement || building.requirement()"
        :key="index"
      >
        <v-tooltip
          location="top"
          content-class="custom-tooltip"
        >
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!isAffordable"
              v-bind="props"
              @click="building.buy(store.amountToBuy)"
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
              v-if="store.amountToBuy !== 1 && !isUniqueBuilding(building)"
              class="tooltip-header"
            >
              {{ `${store.amountToBuy}x` }}
            </h2>

            <p class="description">
              {{ building.description }}
            </p>
            <div class="building-costs">
              <div
                v-for="(cost, costIndex) in building.getTotalPriceForQuantity(
                  isUniqueBuilding(building) ? 1 : store.amountToBuy
                )"
                :key="costIndex"
                :class="['cost', { 'text-red': !canAffordResource(cost) }]"
              >
                <span>{{ formatNumber(cost.value) }}</span>
                <Icon
                  :path="getResourceIcon(cost.key)"
                  :size="20"
                  :color="canAffordResource(cost) ? '' : 'red'"
                />
              </div>
            </div>
          </div>
        </v-tooltip>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "@/composable/useResource";
import Icon from "@/components/Icon.vue";
import { getResourceIcon } from "@/utils/resourceUtil";
import { formatNumber } from "@/utils/number";
import { RESOURCE } from "@/types";
import type Decimal from "break_eternity.js";
import { useBuildingsStore } from "@/stores/useBuildingsStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Building } from "@/models/Building";

const buildingsStore = useBuildingsStore();
const { throttledMoneyAmount, throttledMiningAmount, throttledScienceAmount } =
  useResource();
const store = usePlayerStore();

const UNIQUE_BUILDINGS = ["Bank", "Mine", "Science Lab"];

const isUniqueBuilding = (building: Building) =>
  UNIQUE_BUILDINGS.includes(building.name);

const canAffordResource = (cost: { key: RESOURCE; value: Decimal }) => {
  switch (cost.key) {
    case RESOURCE.MONEY:
      return throttledMoneyAmount.value.gte(cost.value);
    case RESOURCE.MINING:
      return throttledMiningAmount.value.gte(cost.value);
    case RESOURCE.SCIENCE:
      return throttledScienceAmount.value.gte(cost.value);
  }
  return false;
};

const affordableBuildings = computed(() => {
  return buildingsStore.buildings.map((building, index) => {
    const buyQuantity = isUniqueBuilding(building) ? 1 : store.amountToBuy;
    const isAffordable = building
      .getTotalPriceForQuantity(buyQuantity)
      .every((cost) => canAffordResource(cost));

    return {
      building,
      index,
      isAffordable,
    };
  });
});
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
