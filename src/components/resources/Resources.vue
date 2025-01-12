<template>
  <section>
    <Resource :type="RESOURCE.MONEY" :icon="moneyIcon" />
    <Resource :type="RESOURCE.MINING" :icon="miningIcon" />
    <Resource :type="RESOURCE.SCIENCE" :icon="scienceIcon" />
    <Alchemist v-if="unlockAlchemyResearch.unlocked" />
  </section>
</template>

<script lang="ts" setup>
import { unlockAlchemyResearch } from "../../data/research/research.alchemy";
import { moneyIcon, miningIcon, scienceIcon } from "../../icons/icons";
import { RESOURCE } from "../../types";
import Alchemist from "./Alchemist.vue";
import Resource from "./Resource.vue";
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 100%;
  width: 100%;
}
</style>
