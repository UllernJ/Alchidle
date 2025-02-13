<template>
  <div class="research-tab">
    <h1>Research</h1>
    <section class="research-list">
      <template
        v-for="research in store.researchList"
        :key="research.name"
      >
        <v-tooltip
          v-if="!research.unlocked && research.requirement() || research instanceof UpgradeableResearch && research.requirement()"
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!canAfford(research)"
              v-bind="props"
              @click="research.unlock()"
            >
              <h2>{{ research.getName() }}</h2>
            </v-btn>
          </template>
          <span>{{ research.description }}</span>
          <div :class="['research-cost', { 'text-red': !canAfford(research) }]">
            <p>{{ formatNumber(research.cost) }}</p>
            <Icon
              :path="scienceIcon"
              :size="20"
              :color="canAfford(research) ? '' : 'red'"
            />
          </div>
        </v-tooltip>
      </template>
      <span
        v-if="isEverythingResearched"
        class="text-success"
      >Looks like you've researched everything.</span>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useResource } from "@/composable/useResource";
import { scienceIcon } from "@/icons/icons";
import { RESOURCE } from "@/types";
import Icon from "@/components/Icon.vue";
import { formatNumber } from "@/utils/number";
import type { Research } from "@/models/research/Research";
import { UpgradeableResearch } from "@/models/research/UpgradeableResearch";
import { useResearchStore } from "../stores/useResearchStore";

const store = useResearchStore();
const { resources } = useResource();

const canAfford = computed(() => {
  return (research: Research) => {
    return resources[RESOURCE.SCIENCE].value.amount.gte(research.cost);
  };
});

const isEverythingResearched = computed(() => {
  return store.researchList.every((research) => research.unlocked);
});

</script>

<style scoped>
.research-tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  padding: 1rem;
}

.research-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.research-cost {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.2rem;
  border-top: 1px solid #f1f1f1;
  margin-top: 2rem;
}

p {
  font-size: 1.2em;
  margin: 0;
}
</style>
