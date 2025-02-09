<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import IResources from "@/components/resources/IResources.vue";
import ITab from "@/components/tab/ITab.vue";
import IPopup from "@/components/IPopup.vue";
import IDiscovery from "@/components/Discovery/IDiscovery.vue";
import IHeader from "@/components/header/IHeader.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import IMultipliers from "@/components/IMultipliers.vue";
import PlayerSection from "@/components/PlayerSection.vue";
import IMaps from "@/components/inventory/IMaps.vue";
import ITalents from "@/components/talents/ITalents.vue";
import { backgroundActivity } from "@/utils/backgroundActivity";
import { isFirstTime, saveSession } from "@/utils/localStorage";
import { MessageType } from "@/composable/useMessage";
import { useActionLog } from "@/composable/useActionLog";
import { startTutorial } from "@/plugins/driver/tutorial";

let interval: ReturnType<typeof setInterval>;
let saveInterval: ReturnType<typeof setInterval>;
const MINUTE = 60000;
const INTERVAL = 100 // .1 second
onMounted(() => {
  if (isFirstTime()) {
    startTutorial();
    const { logMessage } = useActionLog();
    logMessage(
      "You are born anew, in a new world, this looks familiar...",
      MessageType.INFO
    );
  }
  interval = setInterval(() => backgroundActivity(), INTERVAL);
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
  <v-app
    id="app"
    theme="dark"
  >
    <i-popup />
    <LoadingScreen />
    <i-multipliers />
    <i-maps />
    <i-talents />

    <i-header />
    <v-main class="main-container">
      <section class="top-container">
        <i-resources />
        <i-discovery />
      </section>
      <section class="content-container">
        <i-tab />
        <player-section />
      </section>
    </v-main>
  </v-app>
</template>

<style scoped>
#app {
  max-height: 100dvh;
}
.main-container {
  height: 100%;
  display: grid;
  grid-template-rows: 1.1fr 2fr;
  background-color: #242424 !important;
  gap: 0.75rem;
}

.top-container {
  display: grid;
  grid-template-columns: 3fr 6fr;
  gap: 0.75rem;
  overflow: hidden;
  height: 100%;
}

.content-container {
  display: grid;
  grid-template-columns: 4.4fr 1fr;
}

@media (max-width: 1200px) {
  .top-container {
    grid-template-columns: 1fr 2fr;
  }
  .content-container {
    grid-template-columns: 1fr;
  }
  .main-container {
    grid-template-rows: 1fr 3fr;
  }
  .content-container > .Player {
    grid-row: 1;
    height: 100%;
  }
}
</style>
