<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import ManualLabor from './components/ManualLabor.vue';
import Profile from './components/Profile.vue';
import Worker from './components/Worker.vue';
import { useWorkers } from './composable/useWorkers';

const { gatherMoney } = useWorkers()
let interval: number;

onMounted(() => {
  interval = setInterval(gatherMoney, 1000); // 1-second interval
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <main>
    <ManualLabor />
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
}
</style>
