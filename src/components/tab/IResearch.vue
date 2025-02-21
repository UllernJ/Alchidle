<template>
  <div class="research-tab">
    <h1>Research</h1>
    <section class="research-list">
      <template
        v-for="{ research, isAffordable } in availableResearch"
        :key="research.name"
      >
        <v-tooltip
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!isAffordable"
              v-bind="props"
              @click="research.unlock()"
            >
              <h2>{{ research.getName() }}</h2>
            </v-btn>
          </template>
          <div class="tooltip-content">
            <p class="description">
              {{ research.description }}
            </p>
            <div :class="['research-cost', { 'text-red': !isAffordable }]">
              <p>{{ formatNumber(research.cost) }}</p>
              <Icon
                :path="scienceIcon"
                :size="20"
                :color="isAffordable ? '' : 'red'"
              />
            </div>
          </div>
        </v-tooltip>
      </template>
      <span
        v-if="isEverythingResearched"
        class="text-success"
      >
        Looks like you've researched everything.
      </span>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useResource } from "@/composable/useResource";
import { scienceIcon } from "@/icons/icons";
import Icon from "@/components/Icon.vue";
import { formatNumber } from "@/utils/number";
import type { Research } from "@/models/research/Research";
import { UpgradeableResearch } from "@/models/research/UpgradeableResearch";
import { useResearchStore } from "@/stores/useResearchStore";

const store = useResearchStore();
const { throttledScienceAmount } = useResource();

const canAffordResearch = (research: Research) => {
  return throttledScienceAmount.value.gte(research.cost);
};

const availableResearch = computed(() => {
  return store.researchList
    .filter(research => 
      (!research.unlocked && research.requirement()) || 
      (research instanceof UpgradeableResearch && research.requirement())
    )
    .map(research => ({
      research,
      isAffordable: canAffordResearch(research)
    }));
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

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description {
  font-size: 1.25em;
}

.research-cost {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.2rem;
  border-top: 1px solid #f1f1f1;
  margin-top: 0.5rem;
  & p {
    font-size: 1.2em;
    margin: 0;
  }
}
</style>