<template>
  <div class="container">
    <div class="header">
      <Icon :path="alchemyWorkers.icon" :size="40" />
      <span>Alchemy</span>
    </div>
    <div class="alchemy-info">
      <span>
        {{
          alchemyWorkers.numberOfWorkers === 0
            ? "You should hire alchemists to start infusing!"
            : `Workers: ${alchemyWorkers.numberOfWorkers}`
        }}
      </span>
      <span> Effiency: {{ alchemyWorkers.efficiency }}x</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlchemy } from "../../composable/useAlchemy";
import Icon from "../Icon.vue";

const { alchemyWorkers } = useAlchemy();
</script>

<style scoped>
.container {
  background-color: #1a1a1a;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.header {
  padding: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-top: -0.75rem;
  font-size: 1.5em;
}

.alchemy-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>
