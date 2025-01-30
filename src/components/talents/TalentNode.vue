<template>
  <div class="talent-node">
    <div class="node-content">
      {{ node.node?.tba }}
    </div>
    <div
      v-if="node.left || node.right"
      class="children"
    >
      <talent-node
        v-if="node.left"
        :node="node.left"
        class="left"
      />
      <talent-node
        v-if="node.right"
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
  z-index: 1;
  width: 50px; /* Fixed size */
  height: 50px; /* Fixed size */
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

.left, .right {
  position: relative;
  margin: 0 20px;
}

.left::before, .right::before {
  content: '';
  position: absolute;
  top: -20px;
  width: 1px;
  height: 20px;
  background-color: #ccc;
}

.left::before {
  left: 50%;
  transform: translateX(-50%);
}

.right::before {
  right: 50%;
  transform: translateX(50%);
}

.children::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 50%;
  width: 1px;
  height: 20px;
  background-color: #ccc;
}

.children::after {
  content: '';
  position: absolute;
  top: -20px;
  left: 25%;
  width: 50%;
  height: 1px;
  background-color: #ccc;
  z-index: 0;
}
</style>