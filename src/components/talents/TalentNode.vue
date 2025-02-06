<template>
  <div
    v-if="node.value"
    class="talent-node"
  >
    <v-tooltip location="top">
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          variant="outlined"
          :class="[
            'node-content',
            { 'test-content': isTest },
          ]"
          color="white"
          base-color="yellow"
          :icon="node.value.icon"
          :disabled="
            points.lt(node.value.getPriceFromQuantity(quantity)) ||
              canLearnTalent || isTest
          "
          @click="addTalentToQueue(node.value)"
        />
      </template>
      <div class="tooltip-content">
        <span
          v-if="quantity"
          class="level"
        >Level: {{ node.value.level }} ({{
          node.value.level.plus(quantity)
        }})</span>
        <span
          v-else
          class="level"
        >Level: {{ node.value.level }}</span>
        <h3>{{ node.value.title }}</h3>
        <span>Costs: {{ node.value.getPriceFromQuantity(quantity) }}</span>
      </div>
    </v-tooltip>
    <div
      v-if="node.left?.value || node.right?.value"
      :disabled="points.lt(node.value.cost) || canLearnTalent"
      class="children"
    >
      <talent-node
        v-if="node.left?.value"
        :node="node.left"
        :points="points"
        class="left"
        :can-learn-talent="!isTalentInQueue && !node.value.level.gt(0)"
      />
      <talent-node
        v-if="node.right?.value"
        :node="node.right"
        :points="points"
        class="right"
        :can-learn-talent="!isTalentInQueue && !node.value.level.gt(0)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import type { TalentTree } from "@/models/talents/TalentTree";
import type Decimal from "break_eternity.js";
import { computed } from "vue";

const props = defineProps<{
  node: TalentTree;
  points: Decimal;
  canLearnTalent?: boolean;
}>();

const { addTalentToQueue, talentQueue } = useReincarnation();
const isTalentInQueue = computed(
  () =>
    !!props.node.value &&
    talentQueue.value.some((talent) => talent.title === props.node.value?.title)
);
const quantity = computed(() => {
  return talentQueue.value.filter(
    (talent) => talent.title === props.node.value?.title
  ).length;
});

const isTest = computed(() => props.node.value?.title.toLocaleLowerCase() === "test");
</script>

<style scoped>
.talent-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 1rem;
}

.node-content {
  font-weight: bold;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
  color: #000;
  z-index: 1;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.children {
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 2rem;
}

.left,
.right {
  position: relative;
  margin: 0 20px;
}

.children::before {
  content: "";
  position: absolute;
  top: -2rem;
  left: 50%;
  width: 1px;
  height: 0.75rem;
  background-color: black;
}

.children::after {
  content: "";
  position: absolute;
  top: -20px;
  left: 25%;
  width: 50%;
  height: 1px;
  background-color: black;
  z-index: 0;
}

.left::before,
.right::before {
  content: "";
  position: absolute;
  top: -20px;
  width: 1px;
  height: 20px;
  background-color: black;
}

.left::before {
  left: 50%;
  transform: translateX(-50%);
}

.right::before {
  right: 50%;
  transform: translateX(50%);
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.level {
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size: 0.7em;
  margin-bottom: -0.25rem;
}

.test-content {
  background-color: red !important;
}
/* .v-btn--variant-outlined {
    border: thin solid yellow !important;
  } */
</style>
