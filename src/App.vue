<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Profile from './components/Profile.vue';
import Worker from './components/Worker.vue';
import { useWorkers } from './composable/useWorkers';
import Resources from './components/Resources/Resources.vue';

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
  <main>
    <Resources />
    <Profile />
  </main>
  <section>
    <Worker />
  </section>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
  gap: .25rem;
  section {
    display: flex;
    gap: .25rem;
  }
}
</style>
