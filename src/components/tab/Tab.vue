<template>
  <aside class="state-sidebar">
    <ul class="state-list">
      <li class="state-item" v-for="state in states" :key="state.name">
        <button
          class="state-button"
          @click="setState(state)"
          :class="{ active: state.name === currentState }"
          :disabled="state.unlocked && !state.unlocked()"
        >
          <div class="button-content">
            {{ state.name }}
            <v-icon
              :icon="mdiLock"
              v-if="state.unlocked && !state.unlocked()"
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
      <All v-if="currentState === TAB_STATE.ALL" />
      <Workers v-else-if="currentState === TAB_STATE.WORKERS" />
      <Buildings v-else-if="currentState === TAB_STATE.BUILDINGS" />
      <Research v-else-if="currentState === TAB_STATE.RESEARCH" />
      <Gear v-else-if="currentState === TAB_STATE.GEAR" />
      <Alchemy v-else-if="currentState === TAB_STATE.ALCHEMY" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { TAB_STATE, useTab } from "../../composable/useTab";
import Alchemy from "./Alchemy.vue";
import All from "./All.vue";
import Buildings from "./Buildings.vue";
import Gear from "./Gear.vue";
import Research from "./Research.vue";
import Workers from "./Workers.vue";
import { mdiLock, mdiAlertBox } from "@mdi/js";

const { getStates, setState, currentState } = useTab();

const states = getStates();
</script>

<style scoped>
.state-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.state-sidebar {
  background-color: #1a1a1a;
  display: flex;
  width: 100%;
  min-height: 75vh;
  border: 1px solid #f1f1f1;
}

.state-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 9rem;
  border-right: 1px solid #f1f1f1;
}

.state-item {
  text-align: left;

  &:last-child {
    border-bottom: 1px solid #f1f1f1;
  }

  &:not(:last-child, :first-child) {
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
  }
}

.state-button {
  padding: 0.6rem 1.3rem;
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-align: left;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
