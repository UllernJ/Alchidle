<template>
  <div class="research-tab">
    <h1>Research</h1>
    <section class="research-list">
      <template
        v-for="research in researchList"
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
              v-bind="props"
              @click="research.unlock()"
            >
              <h2>{{ research.getName() }}</h2>
            </v-btn>
          </template>
          <span>{{ research.description }}</span>
          <div :class="['research-cost', { 'text-red': !canAfford(RESOURCE.SCIENCE, research.cost) }]">
            <p>{{ research.cost.toString() }}</p>
            <Icon
              :path="scienceIcon"
              :size="20"
              :color="canAfford(RESOURCE.SCIENCE, research.cost) ? '' : 'red'"
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
import { useResearch } from "../../composable/useResearch";
import { scienceIcon } from "../../icons/icons";
import Icon from "../Icon.vue";
import { UpgradeableResearch } from "../../models/research/UpgradeableResearch";
import { useResource } from "../../composable/useResource";
import { RESOURCE } from "../../types";

const { researchList } = useResearch();
const { canAfford } = useResource();

const isEverythingResearched = computed(() => {
  return researchList.value.every((research) => research.unlocked);
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
