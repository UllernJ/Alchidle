<!-- eslint-disable vue/no-lone-template -->
<template>
  <section class="container">
    <ActionLog />
    <IProgress
      v-if="explortationResearch.unlocked && !isEveryMonsterDefeated && !isInventoryOpen"
    />
    <i-inventory v-else-if="isInventoryOpen" />
    <div v-else />
    <FightSection v-if="explortationResearch.unlocked" />
  </section>
</template>

<script lang="ts" setup>
import IInventory from "@/components/inventory/IInventory.vue";
import ActionLog from "./ActionLog.vue";
import FightSection from "./FightSection.vue";
import IProgress from "./IProgress.vue";
import { useMonsters } from "../../composable/useMonsters";
import { explortationResearch } from "../../data/research";
import { useInventory } from "@/composable/useInventory";

const { isEveryMonsterDefeated } = useMonsters();
const { isInventoryOpen } = useInventory();
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

@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 500) {
  .log {
    display: none;
  }
}
</style>
