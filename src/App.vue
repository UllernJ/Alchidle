<script setup lang="ts">
import IResources from "./components/resources/IResources.vue";
import ITab from "./components/tab/ITab.vue";
import IPopup from "./components/IPopup.vue";
import IDiscovery from "./components/Discovery/IDiscovery.vue";
import IHeader from "./components/IHeader.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import IMultipliers from "./components/IMultipliers.vue";
import PlayerSection from "./components/PlayerSection.vue";
import { onMounted, onUnmounted } from "vue";
import { backgroundActivity } from "./utils/backgroundActivity";
import { isFirstTime, saveSession } from "./utils/localStorage";
import { MessageType } from "./composable/useMessage";
import { useActionLog } from "./composable/useActionLog";
import { Resource } from "./models/Resource";
import { RESOURCE } from "./types";

let interval: number;
let saveInterval: number;
const MINUTE = 60000;
const INTERVAL = 1000 // 1 second

const money = new Resource(RESOURCE.MONEY)
console.log(money.maxAmount.toString())


onMounted(() => {
  if (isFirstTime()) {
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
.main-container {
  height: 100%;
  display: grid;
  grid-template-rows: 1.2fr 2fr;
  background-color: #242424 !important;
}

.top-container {
  display: grid;
  grid-template-columns: 3.5fr 6fr;
  gap: 0.75rem;
  overflow: hidden;
  height: 100%;
}

.content-container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 6.5fr 1fr;
}

@media (max-width: 1200px) {
  .top-container {
    grid-template-columns: 1fr;
  }
  .content-container {
    grid-template-columns: 1fr;
  }
  .main-container {
    grid-template-rows: 1fr 1fr;
  }
}
@media screen and (max-width: 500px) {
  .content-container > .Player {
    grid-row: 1;
    
  }
}
</style>
