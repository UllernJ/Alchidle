<script setup lang="ts">
import Resources from "./components/resources/Resources.vue";
import Tab from "./components/tab/Tab.vue";
import Popup from "./components/Popup.vue";
import Discovery from "./components/Discovery/Discovery.vue";
import IHeader from "./components/IHeader.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import { onMounted, onUnmounted } from "vue";
import { backgroundActivity } from "./utils/backgroundActivity";
import { isFirstTime, loadState, saveSession } from "./utils/localStorage";
import { MessageType } from "./composable/useMessage";
import { useActionLog } from "./composable/useActionLog";

let interval: number;
let saveInterval: number;
const MINUTE = 60000;

onMounted(() => {
  loadState();
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
  <LoadingScreen />
  <Popup />

  <IHeader />
  <main>
    <Resources />
    <Discovery />
  </main>
  <section class="content">
    <Tab />
    <div></div>
  </section>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 1rem;
  overflow: hidden;
  height: 100%;
}
.content {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 8fr 4fr;
}
</style>
