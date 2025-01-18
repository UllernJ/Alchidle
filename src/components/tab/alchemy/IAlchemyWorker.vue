<template>
  <v-tooltip
    v-if="alchemyWorkers.required()"
    location="top"
  >
    <template #activator="{ props }">
      <v-btn
        color="white"
        variant="outlined"
        height="7rem"
        width="15rem"
        :disabled="!canAffordAlchemist"
        v-bind="props"
        @click="buyAlchemist"
      >
        <Icon
          :path="alchemistIcon"
          :size="80"
        />
        <div class="worker-description">
          <h2>
            {{ alchemyWorkers.name }} ({{ alchemyWorkers.numberOfWorkers }})
          </h2>
        </div>
      </v-btn>
    </template>
    <section class="tooltip-content">
      <div class="tooltip-header">
        <h2>{{ alchemyWorkers.name }}</h2>
      </div>
      <p class="description">
        Enchants every aspect of your life.
      </p>
      <div class="worker-cost">
        <span>Generates {{ formatNumber(alchemyWorkers.efficiency) }}</span>
        <Icon
          :path="alchemyIcon"
          :size="20"
        />
        <span>/s</span>
      </div>
      <div :class="['worker-cost', { 'text-red': !canAffordAlchemist }]">
        <span>Costs: {{ formatNumber(alchemyWorkers.cost.value) }}</span>
        <Icon
          :path="moneyIcon"
          :size="20"
          :color="canAffordAlchemist ? '' : 'red'"
        />
      </div>
    </section>
  </v-tooltip>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAlchemy } from "../../../composable/useAlchemy";
import { alchemistIcon, alchemyIcon, moneyIcon } from "../../../icons/icons";
import { RESOURCE } from "../../../types";
import { useResource } from "../../../composable/useResource";
import { formatNumber } from "../../../utils/number";
import Icon from "../../Icon.vue";

const { alchemyWorkers, buyAlchemist } = useAlchemy();
const { resources } = useResource();

const canAffordAlchemist = computed(() => {
  return resources[RESOURCE.MONEY].value >= alchemyWorkers.value.cost.value;
});
</script>
