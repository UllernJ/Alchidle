<template>
  <div ref="actionLog" class="action-log">
    <div
      class="log-entry"
      v-for="entry in log"
      :key="entry.timestamp"
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

  color: #fff;
}

.log-entry {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #444;
}

.timestamp {
  font-size: 1em;
  color: #888;
  padding: 0.5rem;
  margin-right: 0.5rem;
  text-align: start;
  border-right: 1px solid #444;
  min-width: 6rem;
  max-width: 5rem;
}

.message {
  padding: 0.5rem;
  font-size: 1em;
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
