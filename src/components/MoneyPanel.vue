<script setup lang="ts">
import { useResource } from '../composable/useResource';

const { money } = useResource()
</script>

<template>
  <div class="card">
    <button type="button" @click="money++">Harvest</button>

</div>
</template>

<style scoped>

button {
  border-radius: 8px;
  border: 1px solid black;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  display:flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
}
</style>
