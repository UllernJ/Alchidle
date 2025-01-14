<template>
  <div
    ref="actionLog"
    class="action-log"
  >
    <div
      v-for="entry in log"
      :key="entry.timestamp"
      class="log-entry"
      :class="entry.logType"
    >
      <span class="timestamp">{{ entry.timestamp }}</span>
      <span class="message">{{ entry.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick, useTemplateRef, onMounted } from "vue";
import { useActionLog } from "../../composable/useActionLog";

const { log } = useActionLog();
const actionLog = useTemplateRef("actionLog");

// Scroll to the bottom of the log when a new entry is added
watch(log.value, async () => {
  await nextTick();
  const logElement = actionLog.value;
  if (logElement) {
    logElement.scrollTop = logElement.scrollHeight;
  }
});

onMounted(() => {
  const logElement = actionLog.value;
  if (logElement) {
    logElement.scrollTop = logElement.scrollHeight;
  }
});
</script>

<style scoped>
.action-log {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: 100%;
  min-height: 100%;
  max-height: 15rem;
  width: 100%;
  background-image: url("../../assets/logo.png");
  background-size: 25%;
  background-position: bottom right;
  background-position-x: 95%;
  background-position-y: 95%;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-color: #1a1a1a;
  color: #fff;
}

.log-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  height: fit-content;
}

.timestamp {
  font-size: 0.75em;
  color: #888;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  border-right: 1px solid #444;
  max-width: 5rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message {
  padding: 0.5rem;
  font-size: 0.75em;
  text-align: start;
}

.Success {
  color: green;
}

.Error {
  color: red;
}

.Warning {
  color: orange;
}

.Info {
  color: rgb(94, 94, 231);
}
</style>
