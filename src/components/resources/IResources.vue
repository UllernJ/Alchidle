<template>
  <section>
    <i-resource
      :type="RESOURCE.MONEY"
      :icon="moneyIcon"
    />
    <i-resource
      :type="RESOURCE.MINING"
      :icon="miningIcon"
    />
    <i-resource
      :type="RESOURCE.SCIENCE"
      :icon="scienceIcon"
    />
  </section>
</template>

<script lang="ts" setup>
import { moneyIcon, miningIcon, scienceIcon } from "../../icons/icons";
import { RESOURCE } from "../../types";
import IResource from "./IResource.vue";
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;
}
</style>
