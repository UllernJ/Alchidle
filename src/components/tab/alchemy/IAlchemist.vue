<template>
  <div class="container">
    <div class="header">
      <Icon
        :path="alchemist.icon"
        size="1.2em"
      />
      <span>Alchemy</span>
      <v-tooltip
        text="Alchemy allows you to create powerful infusions that can be used to enhance your abilities."
        location="top"
      >
        <template #activator="{ props }">
          <v-icon
            :icon="mdiInformationBoxOutline"
            color="white"
            size="1.25em"
            v-bind="props"
          />
        </template>
      </v-tooltip>
    </div>
    <div class="alchemy-info">
      <span>
        {{
          alchemist.numberOfWorkers.equals(0)
            ? "You should hire alchemists to start infusing!"
            : `Workers: ${alchemist.numberOfWorkers}`
        }}
      </span>
      <span v-show="alchemist.numberOfWorkers.notEquals(0)">
        Effiency: {{ formatNumber(alchemist.efficiency, true) }}x</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiInformationBoxOutline } from "@mdi/js";
import Icon from "../../Icon.vue";
import { formatNumber } from "@/utils/number";
import { useAlchemyStore } from "@/stores/useAlchemyStore";

const { alchemist } = useAlchemyStore();
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  min-width: 22rem;
}

.header {
  padding: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-top: -0.75rem;
  font-size: 1.5em;
}

.alchemy-info {
  font-size: 1.1em;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>
