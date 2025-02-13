<template>
  <div class="container">
    <section>
      <i-workers />
    </section>
    <section>
      <i-buildings />
    </section>
    <section v-if="!isEveryResearchUnlocked">
      <i-research />
    </section>
    <section v-if="GEAR.unlocked && GEAR.unlocked()">
      <i-gear />
    </section>
    <section v-if="ALCHEMY.unlocked && ALCHEMY.unlocked()">
      <i-alchemy />
    </section>
  </div>
</template>

<script lang="ts" setup>
import IBuildings from './IBuildings.vue';
import IGear from './IGear.vue';
import IResearch from './IResearch.vue';
import IWorkers from './IWorkers.vue';
import IAlchemy from './alchemy/IAlchemy.vue';
import { computed } from 'vue';
import { ALCHEMY, GEAR } from "@/composable/useTab";
import { useResearchStore } from '../stores/useResearchStore';

const researchStore = useResearchStore();

const isEveryResearchUnlocked = computed(() => {
  return researchStore.researchList.every((research) => research.unlocked);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
}
section {
  height: 100%;
  width: 100%;
}
section:not(:first-child) {
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
}

.research {
  display: flex;
  flex-direction: row;
}
</style>
