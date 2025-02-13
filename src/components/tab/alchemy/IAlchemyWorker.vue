<template>
  <v-tooltip
    v-if="alchemist.requirement && alchemist.requirement()"
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
        @click="alchemist.buy()"
      >
        <Icon
          :path="alchemistIcon"
          size="4em"
        />
        <div class="worker-description">
          <h2>
            {{ alchemist.name }} ({{ formatNumber(alchemist.numberOfWorkers) }})
          </h2>
        </div>
      </v-btn>
    </template>
    <section class="tooltip-content">
      <div class="tooltip-header">
        <h2>{{ alchemist.name }}</h2>
      </div>
      <p class="description">
        Enchants every aspect of your life.
      </p>
      <div :class="['worker-cost', { 'text-red': !canAffordAlchemist }]">
        <span>Costs: {{ formatNumber(alchemist.cost.value) }}</span>
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
import { alchemistIcon, moneyIcon } from "../../../icons/icons";
import { RESOURCE } from "../../../types";
import { useResource } from "../../../composable/useResource";
import { formatNumber } from "../../../utils/number";
import Icon from "../../Icon.vue";
import { useAlchemyStore } from "@/stores/useAlchemyStore";

const { alchemist } = useAlchemyStore();
const { resources } = useResource();

const canAffordAlchemist = computed(() => {
  return resources[RESOURCE.MONEY].value.amount.gte(alchemist.cost.value);
});
</script>

<style scoped>
.worker-cost {
  padding: 0.5rem 0rem;
  display: flex;
  align-items: center;
  &:last-child {
    border-top: 1px solid #f1f1f1;
  }
}
</style>
