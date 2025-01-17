<template>
  <div class="container">
    <section>
      <span class="title">Workers</span>
      <i-workers />
    </section>
    <section>
      <span class="title">Buildings</span>
      <i-buildings />
    </section>
    <section v-if="!isEveryResearchUnlocked">
      <span class="title">Research</span>
      <i-research />
    </section>
    <section v-if="GEAR.unlocked && GEAR.unlocked()">
      <span class="title">Gear</span>
      <i-gear />
    </section>
    <section v-if="ALCHEMY.unlocked && ALCHEMY.unlocked()">
      <i-alchemy />
    </section>
  </div>
</template>

<script lang="ts" setup>
import IBuildings from "./IBuildings.vue";
import IGear from "./IGear.vue";
import IResearch from "./IResearch.vue";
import IWorkers from "./IWorkers.vue";
import IAlchemy from "./IAlchemy.vue";
import { computed } from "vue";
import { useResearch } from "../../composable/useResearch";
import { ALCHEMY, GEAR } from "../../composable/useTab";

const { researchList } = useResearch();

const isEveryResearchUnlocked = computed(() => {
  return researchList.value.every((research) => research.unlocked);
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
.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-left: 1rem;
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
