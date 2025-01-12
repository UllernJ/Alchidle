<template>
  <div class="money-container">
    <div class="header">
      <Icon :path="alchemyWorkers.icon" :size="40" />
      <span>Alchemists</span>
    </div>
    <span class="styled-button">
      Workers: {{ alchemyWorkers.numberOfWorkers }}
    </span>
    <span> Effiency: {{ alchemyWorkers.efficiency }}x</span>
  </div>
</template>

<script setup lang="ts">
import { useAlchemy } from "../../composable/useAlchemy";
import Icon from "../Icon.vue";

const { alchemyWorkers } = useAlchemy();
</script>

<style scoped>
.money-container {
  background-color: #1a1a1a;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.33rem;
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

.styled-button {
  width: 12rem;
  padding: 0.33rem 2rem;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}
</style>
