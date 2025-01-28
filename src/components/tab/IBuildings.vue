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
              v-bind="props"
              @click="upgradeBuilding(index)"
            >
              <Icon
                :path="building.icon"
                :size="76"
              />
              <div class="building-description">
                <h2>{{ building.name }} ({{ building.quantity }})</h2>
              </div>
            </v-btn>
          </template>
          <!-- <div class="tooltip-content">
            <h2
              v-if="amountToBuy !== 1"
              class="tooltip-header"
            >
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
          </div> -->
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useBuildings } from "../../composable/useBuildings";
import Icon from "../Icon.vue";
import { usePlayer } from "../../composable/usePlayer";

const { buildings } = useBuildings();
const { amountToBuy } = usePlayer();


const upgradeBuilding = (index: number) => {
  const building = buildings.value[index];
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
