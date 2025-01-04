<template>
  <section>
    <Resource :type="RESOURCE.MONEY" :icon="moneyIcon" />
    <Resource :type="RESOURCE.MINING" :icon="miningIcon" />
    <Resource :type="RESOURCE.ALCHEMY" :icon="alchemyIcon" />
    <Resource :type="RESOURCE.SCIENCE" :icon="scienceIcon" />
  </section>
</template>

<script lang="ts" setup>
import {
  moneyIcon,
  alchemyIcon,
  miningIcon,
  scienceIcon,
} from "../../icons/icons";
import { RESOURCE } from "../../types";
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
