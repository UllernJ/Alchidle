<template>
  <div class="inventory-container">
    <div class="inventory-header">
      <span>COMING SOON</span>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-btn
            :icon="mdiClose"
            size="large"
            density="compact"
            variant="outlined"
            v-bind="props"
            @click="toggleInventory"
          />
        </template>
        <span>Close Inventory</span>
      </v-tooltip>
    </div>
    <div class="inventory-grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="inventory-item"
      >
        <div class="icon-container">
          <Icon
            :path="item.icon"
            size="1.25em"
          />
        </div>
        <span>{{ item.name }}</span>
        <span>{{ item.amount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInventory } from "@/composable/useInventory";
import { mdiClose } from "@mdi/js";

const { toggleInventory } = useInventory();

const items = [
    {
        name: "Gold",
        amount: 100,
        icon: "mdiCurrencyUsd",
    },
    {
        name: "Iron",
        amount: 50,
        icon: "mdiSword",
    },
    {
        name: "Wood",
        amount: 25,
        icon: "mdiTree",
    },
]
</script>
<style scoped>
.inventory-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-left: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.87);
}

.inventory-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9em;
  font-weight: bold;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f1f1;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  width: 100%;
}

.inventory-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: #444;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  position: relative;
  text-align: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.inventory-item span {
  font-size: 0.8em;
}
</style>