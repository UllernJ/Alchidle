<template>
  <section class="container">    
    <ActionLog />
    <IProgress v-if="explortationResearch.unlocked" />
    <FightSection v-if="explortationResearch.unlocked" />
  </section>
</template>

<script lang="ts" setup>
import { explortationResearch } from "../../data/research/research.science";
import ActionLog from "./ActionLog.vue";
import FightSection from "./FightSection.vue";
import IProgress from "./IProgress.vue";
</script>

<style scoped>
.container {
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 8fr 3fr 3fr;
  height: 100%;
  width: 100%;
  height: 100%;
}
</style>
