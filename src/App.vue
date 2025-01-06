<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useWorkers } from "./composable/useWorkers";
import Resources from "./components/resources/Resources.vue";
import Tab from "./components/tab/Tab.vue";
import Popup from "./components/Popup.vue";
import Discovery from "./components/discovery/Discovery.vue";

const { gatherResources } = useWorkers();
let interval: number;

onMounted(() => {
  interval = setInterval(gatherResources, 1000); // 1-second interval
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <Popup />
  <main>
    <Resources />
    <Discovery />
  </main>
  <section class="content">
    <Tab />
  </section>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  overflow: hidden;
  max-height: 50vh;
}
.content {
  margin-top: 1rem;
}
</style>
