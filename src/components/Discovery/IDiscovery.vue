<template>
  <section class="container">
    <PlayerSection />
    <ActionLog />
    <IProgress />
    <FightSection />
  </section>
</template>

<script lang="ts" setup>
import ActionLog from "./ActionLog.vue";
import FightSection from "./FightSection.vue";
import PlayerSection from "./PlayerSection.vue";
import IProgress from "./IProgress.vue";
</script>

<style scoped>
.container {
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 2fr 7fr 3fr 3fr;
  height: 100%;
  width: 100%;
}
</style>
