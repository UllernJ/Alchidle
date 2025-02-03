<template>
  <div
    v-if="node.value"
    class="talent-node"
  >
    <v-tooltip location="top">
      <template #activator="{ props }">
        <v-btn
          variant="outlined"
          class="node-content"
          color="white"
          base-color="yellow"
          :icon="node.value.icon"
          v-bind="props"
        />
      </template>
      <div class="tooltip-content">
        <h3>{{ node.value.title }}</h3>
        <span>{{ node.value.description }}</span>
        <span>Costs {{ node.value.cost }}</span>
      </div>
    </v-tooltip>
    <div
      v-if="node.left?.value || node.right?.value"
      class="children"
    >
      <talent-node
        v-if="node.left?.value"
        :node="node.left"
        class="left"
      />
      <talent-node
        v-if="node.right?.value"
        :node="node.right"
        class="right"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TalentTree } from "@/models/talents/TalentTree";

defineProps<{ node: TalentTree }>();
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
  top: -40px;
  left: 50%;
  width: 1px;
  height: 20px;
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
  gap: 0.5rem;
  padding: 0.5rem;
}
/* .v-btn--variant-outlined {
    border: thin solid yellow !important;
  } */
</style>
