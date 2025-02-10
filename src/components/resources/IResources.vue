<template>
  <section class="resources-container">
    <i-resource
      :type="RESOURCE.MONEY"
      :icon="moneyIcon"
    />
    <i-resource
      :type="RESOURCE.SCIENCE"
      :icon="scienceIcon"
    />
    <i-resource
      v-if="blacksmithingResearch.unlocked"
      :type="RESOURCE.MINING"
      :icon="miningIcon"
    />
  </section>
</template>

<script lang="ts" setup>
import { blacksmithingResearch } from "@/data/research";
import { moneyIcon, miningIcon, scienceIcon } from "../../icons/icons";
import { RESOURCE } from "../../types";
import IResource from "./IResource.vue";
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: .5rem;
  height: 100%;
}
</style>
