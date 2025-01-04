<template>
  <div class="buildings-container">
    <section class="building-list">
      <button
        v-for="(building, index) in buildings"
        :key="index"
        class="building-item"
        @click="buyBuilding(index)"
        :disabled="!canAfford(index)"
      >
        <Icon :path="building.icon" :size="76" />
        <div class="building-description">
          <h2>{{ building.name }} ({{ building.quantity }})</h2>
          <div
            v-for="(cost, costIndex) in building.cost"
            :key="costIndex"
            class="cost"
          >
            <p>{{ cost.value }}</p>
            <Icon :path="icon(cost.key)" :size="20" />
          </div>
        </div>
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBuildings } from "../../composable/useBuildings";
import { useResource } from "../../composable/useResource";
import Icon from "../Icon.vue";
import { RESOURCE } from "../../types";
import {
  alchemyIcon,
  miningIcon,
  moneyIcon,
  scienceIcon,
} from "../../icons/icons";

const { buildings, buyBuilding } = useBuildings();
const { resources } = useResource();

const icon = (resource: RESOURCE) => {
  switch (resource) {
    case RESOURCE.MONEY:
      return moneyIcon;
    case RESOURCE.MINING:
      return miningIcon;
    case RESOURCE.ALCHEMY:
      return alchemyIcon;
    case RESOURCE.SCIENCE:
      return scienceIcon;
  }
};

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
  border: 1px solid white;
  padding: 1rem;
  background-color: #292727;
  width: 15%;
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
}

.building-description h2 {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
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
  &:last-child {
    margin-top: -0.55rem;
  }
}
</style>
