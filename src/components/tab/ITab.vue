<template>
  <aside
    ref="sidebar"
    class="state-sidebar"
  >
    <ul class="state-list">
      <li
        v-for="state in states"
        :key="state.name"
        class="state-item"
      >
        <v-btn
          width="100%"
          :active="state.name === currentState"
          :disabled="state.unlocked && !state.unlocked()"
          @click="setState(state)"
        >
          <div class="button-content">
            {{ state.name }}
            <v-icon
              v-if="state.unlocked && !state.unlocked()"
              :icon="mdiLock"
            />
            <v-icon
              v-else-if="state.alert"
              :icon="mdiAlertBox"
              color="warning"
              class="alert-icon"
            />
          </div>
        </v-btn>
      </li>
    </ul>
    <div class="state-content">
      <i-all v-if="currentState === TAB_STATE.ALL" />
      <i-workers v-else-if="currentState === TAB_STATE.WORKERS" />
      <i-buildings v-else-if="currentState === TAB_STATE.BUILDINGS" />
      <i-research v-else-if="currentState === TAB_STATE.RESEARCH" />
      <i-gear v-else-if="currentState === TAB_STATE.GEAR" />
      <i-alchemy v-else-if="currentState === TAB_STATE.ALCHEMY" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useTemplateRef, watch } from "vue";
import { TAB_STATE, useTab } from "../../composable/useTab";
import IAlchemy from "./IAlchemy.vue";
import IAll from "./IAll.vue";
import IBuildings from "./IBuildings.vue";
import IGear from "./IGear.vue";
import IResearch from "./IResearch.vue";
import IWorkers from "./IWorkers.vue";
import { mdiLock, mdiAlertBox } from "@mdi/js";

const { getStates, setState, currentState } = useTab();
const states = getStates();

const sidebar = useTemplateRef("sidebar")

watch(currentState, () => {
  if (sidebar.value) {
    sidebar.value.scrollTo({ top: 0, behavior: "smooth" });
  }
});

</script>

<style scoped>
.state-content {
  width: 100%;
}

.state-sidebar {
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #f1f1f1;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #f1f1f1 #1a1a1a;
  overflow: overlay;
  max-height: 60vh;
}

.state-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  border-bottom: 1px solid #f1f1f1;
  position: sticky;
  height: fit-content;
  top: 0;
  background-color: #1a1a1a;
  z-index: 1;
}

.state-item {
  width: 100%;
  display: flex;
  height: fit-content;
  &:not(:last-child) {
    border-right: 1px solid #f1f1f1;
  }
}

.active {
  background-color: #1a1a1a;
}

.button-content {
  display: flex;
  align-items: center;
  text-align: start;
}

@keyframes alert-blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.alert-icon {
  animation: alert-blink 1s infinite;
  margin-left: 0.5rem;
}

@media (max-width: 1200px) {
  .state-sidebar {
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: fit-content !important;
}
}
</style>
