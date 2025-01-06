<template>
  <section class="container">
    <PlayerSection />
    <ActionLog />
    <FightSection />
  </section>
</template>

<script lang="ts" setup>
import ActionLog from "./ActionLog.vue";
import FightSection from "./FightSection.vue";
import PlayerSection from "./PlayerSection.vue";
</script>

<style scoped>
.container {
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100%;
}
</style>
