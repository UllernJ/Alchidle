<template>
  <div>
    <template v-for="research in researchList" :key="research.name">
      <button
        :disabled="!canAfford(research)"
        @click="unlockResearch(research)"
        v-if="!research.unlocked"
      >
        <p class="title">{{ research.name }}</p>
        <p>{{ research.description }}</p>
        <div class="cost">
          <p>{{ research.cost }}</p>
          <Icon :path="scienceIcon" :size="20" />
        </div>
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useResearch, type Research } from "../../composable/useResearch";
import { useResource } from "../../composable/useResource";
import { scienceIcon } from "../../icons/icons";
import { RESOURCE } from "../../types";
import Icon from "../Icon.vue";

const { researchList, unlockResearch } = useResearch();
const { resources } = useResource();

const canAfford = computed(() => {
  return (research: Research) => {
    return resources[RESOURCE.SCIENCE].value >= research.cost;
  };
});
</script>

<style scoped>
.title {
  font-size: 1.25rem;
  font-weight: bold;
}

div {
  position: relative;
  margin-top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}
button {
  position: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 1px solid white;
  padding: 1rem;
  background-color: #292727;
  text-align: center;
  width: 15%;
  height: 30%;

  &:hover {
    cursor: pointer;
    background-color: #3a3939;
  }
}

p {
  margin: 0;
  color: #ffffff;
}

.cost {
  position: absolute;
  bottom: 1rem;
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
</style>
