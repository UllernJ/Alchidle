<script setup lang="ts">
import IResources from "./components/resources/IResources.vue";
import ITab from "./components/tab/ITab.vue";
import IPopup from "./components/IPopup.vue";
import IDiscovery from "./components/Discovery/IDiscovery.vue";
import IHeader from "./components/IHeader.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import IMultipliers from "./components/IMultipliers.vue";
import { onMounted, onUnmounted } from "vue";
import { backgroundActivity } from "./utils/backgroundActivity";
import { isFirstTime, saveSession } from "./utils/localStorage";
import { MessageType } from "./composable/useMessage";
import { useActionLog } from "./composable/useActionLog";

let interval: number;
let saveInterval: number;
const MINUTE = 60000;

onMounted(() => {
  if (isFirstTime()) {
    const { logMessage } = useActionLog();
    logMessage(
      "You are born anew, in a new world, this looks familiar...",
      MessageType.INFO
    );
  }
  interval = setInterval(backgroundActivity, 1000); // 1-second interval
  saveInterval = setInterval(() => {
    saveSession();
  }, MINUTE);
});

onUnmounted(() => {
  clearInterval(interval);
  clearInterval(saveInterval);
});
</script>

<template>
  <i-popup />
  <LoadingScreen />
  <i-multipliers />

  <i-header />
  <main class="main-container">
    <section class="top-container">
      <i-resources />
      <i-discovery />
    </section>
    <section class="content-container">
      <i-tab />
      <div />
    </section>
  </main>
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.top-container {
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 1rem;
  overflow: hidden;
  height: 100%;
}

.content-container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 8fr 4fr;
}

@media (max-width: 1200px) {
  .top-container {
    grid-template-columns: 1fr;
  }
  .content-container {
    grid-template-columns: 1fr;
  }
}
</style>
