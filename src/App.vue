<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useWorkers } from './composable/useWorkers';
import Resources from './components/resources/Resources.vue';
import Tab from './components/tab/Tab.vue';

const { gatherResources } = useWorkers()
let interval: number;

onMounted(() => {
  interval = setInterval(gatherResources, 1000); // 1-second interval
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
    <Resources />
  <section class="content">
    <Tab />
  </section>
</template>

<style scoped>
.content {
  margin-top: 1rem;
}
</style>
