<template>
  <div class="buildings-container">
    <section class="building-list">
      <template v-for="(building, index) in buildings" :key="index">
        <v-tooltip
          location="top"
          v-if="!building.requirement || building.requirement()"
          content-class="custom-tooltip"
        >
          <template v-slot:activator="{ props }">
            <button
              class="building-item"
              @click="upgradeBuilding(index)"
              :disabled="!canAfford(index)"
              v-bind="props"
            >
              <Icon :path="building.icon" :size="76" />
              <div class="building-description">
                <h2>{{ building.name }} ({{ building.quantity }})</h2>
              </div>
            </button>
          </template>
          <div class="tooltip-content">
            <div class="tooltip-header">
              <h2>{{ building.name }}</h2>
            </div>
            <p class="description">{{ building.description }}</p>
            <div class="building-costs">
              <div
                v-for="(cost, costIndex) in building.cost"
                :key="costIndex"
                class="cost"
              >
                <span>Costs: {{ cost.value }}</span>
                <Icon :path="getResourceIcon(cost.key)" :size="20" />
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
import { useBuildings } from "../../composable/useBuildings";
import { useResource } from "../../composable/useResource";
import Icon from "../Icon.vue";
import { getResourceIcon } from "../../utils/resourceUtil";

const { buildings } = useBuildings();
const { resources, subtractResource } = useResource();

const canAfford = computed(() => {
  return (index: number) => {
    const building = buildings.value[index];
    for (const cost of building.cost) {
      if (resources[cost.key].value < cost.value) {
        return false;
      }
    }
    return true;
  };
});

const upgradeBuilding = (index: number) => {
  const building = buildings.value[index];
  building.upgrade();
};
</script>

<style scoped>
.buildings-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin-left: 1rem;
}

.building-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.building-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #f1f1f1;
  padding: 1rem;
  background-color: #2b2b2b;
  width: 15rem;
  &:hover {
    cursor: pointer;
    background-color: #3a3939;
  }
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
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.tooltip-header {
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  width: 100%;
  margin-bottom: 0.5rem;
}

.tooltip-content span {
  font-size: 1.25em;
  margin-bottom: 0.5rem;
}
.cost {
  width: 100%;
  border-top: 1px solid #f1f1f1;
}
.description {
  font-size: 1.25em;
}
</style>
