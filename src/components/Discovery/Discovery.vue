<template>
  <section class="fight-container">
    <PlayerSection />
    <FightSection />
  </section>
</template>

<script lang="ts" setup>
import FightSection from "./FightSection.vue";
import PlayerSection from "./PlayerSection.vue";
</script>

<style scoped>
.fight-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  display: flex;
}
</style>
