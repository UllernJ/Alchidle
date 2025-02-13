<template>
  <aside class="state-sidebar">
    <div class="state-list">
      <ul class="list">
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
      <section
        v-if="currentState !== TAB_STATE.ALCHEMY && currentState !== TAB_STATE.RESEARCH"
        class="buy-buttons"
      >
        <v-btn
          rounded="0"
          class="button"
          :active="store.amountToBuy === 1"
          @click="store.amountToBuy = 1"
        >
          1
        </v-btn>
        <v-btn
          rounded="0"
          class="button"
          :active="store.amountToBuy === 5"
          @click="store.amountToBuy = 5"
        >
          5
        </v-btn>
        <v-btn
          rounded="0"
          class="button"
          :active="store.amountToBuy === 10"
          @click="store.amountToBuy = 10"
        >
          10
        </v-btn>
        <v-btn
          rounded="0"
          class="button"
          :active="store.amountToBuy === 20"
          @click="store.amountToBuy = 20"
        >
          20
        </v-btn>
      </section>
    </div>
    <div
      ref="sidebar"
      class="state-content"
    >
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
import { onBeforeMount, useTemplateRef, watch } from "vue";
import { TAB_STATE, useTab } from "@/composable/useTab";
import IAlchemy from "@/components/tab/alchemy/IAlchemy.vue";
import IAll from "@/components/tab/IAll.vue";
import IBuildings from "@/components/tab/IBuildings.vue";
import IGear from "@/components/tab/IGear.vue";
import IResearch from "@/components/tab/IResearch.vue";
import IWorkers from "@/components/tab/IWorkers.vue";
import { mdiLock, mdiAlertBox } from "@mdi/js";
import { usePlayerStore } from "@/stores/usePlayerStore";

const store = usePlayerStore();
const { states, setState, currentState, loadTabState } = useTab();

const sidebar = useTemplateRef("sidebar");

watch(currentState, () => {
  if (sidebar.value) {
    sidebar.value.scrollTo({ top: 0, behavior: "smooth" });
  }
});

onBeforeMount(() => {
  loadTabState();
});
</script>

<style scoped>
.state-content {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto !important; /* Force scrollbar */
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #f1f1f1 #1a1a1a;
  max-height: 51dvh;
}

.state-sidebar {
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  margin: 0;
  border-left: 1px solid #f1f1f1;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
}

.state-list {
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
}

.list {
  list-style: none;
  display: flex;
  width: 100%;
  flex-direction: row;
  border-bottom: 1px solid #f1f1f1;
}

.state-item {
  width: 100%;
  display: flex;
  height: fit-content;
  &:not(:last-child) {
    border-right: 1px solid #f1f1f1;
  }
}

.buy-buttons {
  display: flex;
  flex-direction: row;
  width: fit-content;
  border-bottom: 1px solid #f1f1f1;
}

.button {
  border-right: 1px solid #f1f1f1;
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
