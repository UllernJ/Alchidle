<template>
  <div class="research-tab">
    <section class="research-list">
      <template v-for="research in researchList" :key="research.name">
        <v-tooltip
          location="top"
          v-if="!research.unlocked && research.requirement()"
        >
          <template v-slot:activator="{ props }">
            <button
              class="research"
              @click="unlockResearch(research)"
              :disabled="!canAfford(research)"
              v-bind="props"
            >
              <h2>{{ research.name }}</h2>
            </button>
          </template>
          <span>{{ research.description }}</span>
          <div class="research-cost">
            <p>Costs: {{ research.cost }}</p>
            <Icon :path="scienceIcon" :size="20" />
          </div>
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useResearch } from "../../composable/useResearch";
import { useResource } from "../../composable/useResource";
import { scienceIcon } from "../../icons/icons";
import { RESOURCE } from "../../types";
import Icon from "../Icon.vue";
import type { Research } from "../../data/research";

const { researchList, unlockResearch } = useResearch();
const { resources } = useResource();

const canAfford = computed(() => {
  return (research: Research) => {
    return resources[RESOURCE.SCIENCE].value >= research.cost;
  };
});
</script>

<style scoped>
.research-tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin-left: 1rem;
}

.research-list {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.research {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  background-color: #2b2b2b;
  text-align: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  height: 100%;
  width: 15rem;
  &:hover {
    cursor: pointer;
    background-color: #3a3939;
  }
}

.research-cost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.p {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}
</style>
