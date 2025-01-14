<template>
  <aside class="state-sidebar">
    <ul class="state-list">
      <li
        v-for="state in states"
        :key="state.name"
        class="state-item"
      >
        <button
          class="state-button"
          :class="{ active: state.name === currentState }"
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
        </button>
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
  max-height: 50vh;
}

.state-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  border-bottom: 1px solid #f1f1f1;
}

.state-item {
  width: 100%;
  display: flex;
  &:not(:last-child) {
    border-right: 1px solid #f1f1f1;
  }
}

.state-button {
  height: 100%;
  padding: 0.8rem 1.3rem;
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    pointer-events: none;
  }
}

.active {
  background-color: #1a1a1a;
}

.button-content {
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
}
</style>
