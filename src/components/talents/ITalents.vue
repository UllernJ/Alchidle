<template>
  <v-overlay
    v-model="isReincarnationOpen"
    class="reincarnation-container"
    scroll-strategy="reposition"
    opacity="0"
  >
    <header class="reincarnation-header">
      <h2>Reincarnation</h2>
      <span class="text-warning">This will reset your progress and give you a bonus on your
        chosen talents.</span>
      <v-btn
        ref="closeButton"
        color="white"
        variant="outlined"
        :prepend-icon="mdiClose"
        @click="closeReincarnation"
      >
        Close
      </v-btn>
    </header>
    <section class="content-container">
      <div
        ref="container"
        class="talents-container"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @wheel="onZoom"
      >
        <div
          class="talents"
          :style="{
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`,
            transformOrigin: 'center',
          }"
        >
          <talent-node
            :node="tree"
            :points="pointsLeft"
          />
        </div>
      </div>
      <section class="buttons-container">
        <section class="points-container">
          <section class="points">
            <span>Points: {{ points }}</span>
          </section>
          <section class="points">
            <span>Spent: {{ pointsSpent }}</span>
          </section>
        </section>
        <section class="points-container">
          <v-btn
            color="warning"
            @click="clearTalentQueue"
          >
            Clear
          </v-btn>
          <v-btn
            color="success"
            :disabled="talentQueue.length === 0"
            @click="reincarnate"
          >
            Confirm
          </v-btn>
        </section>
      </section>
    </section>
  </v-overlay>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import TalentNode from "@/components/talents/TalentNode.vue";
import { upTree } from "@/data/talent";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { useWindowSize } from "@vueuse/core";
import { mdiClose } from "@mdi/js";

const tree = upTree;
const {
  isReincarnationOpen,
  closeReincarnation,
  points,
  pointsSpent,
  clearTalentQueue,
  reincarnate,
  talentQueue
} = useReincarnation();
const { height } = useWindowSize();
const pointsLeft = computed(() => points.value.minus(pointsSpent.value));

// Drag navigation logic
const container = ref<HTMLElement | null>(null);

const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  startX.value = event.clientX - offsetX.value;
  startY.value = event.clientY - offsetY.value;
};

const onDrag = (event: MouseEvent) => {
  if (isDragging.value) {
    offsetX.value = event.clientX - startX.value;
    offsetY.value = event.clientY - startY.value;
  }
};

const stopDrag = () => {
  isDragging.value = false;
};

// Zoom logic
const zoomLevel = ref(1);

const onZoom = (event: WheelEvent) => {
  event.preventDefault();
  const zoomFactor = 0.1; // Adjust zoom speed
  if (event.deltaY < 0) {
    // Zoom in
    zoomLevel.value += zoomFactor;
  } else {
    // Zoom out
    zoomLevel.value -= zoomFactor;
  }
  // Clamp zoom level to reasonable bounds
  zoomLevel.value = Math.max(0.5, Math.min(2, zoomLevel.value));
};

watchEffect(() => {
  if (isReincarnationOpen.value && container.value) {
    offsetY.value = height.value / 2 - container.value.clientHeight / 4;
  }
});
</script>

<style scoped>
.reincarnation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: black;
  color: white;
  border-bottom: 1px solid white;
  z-index: 1;
}

.content-container {
  position: relative;
}

.talents-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: relative;
  cursor: grab;
}

.talents-container:active {
  cursor: grabbing;
}

.reincarnation-container {
  background-color: grey;
  opacity: 0.95;
}

.points {
  width: 10rem;
  border: 1px solid white;
  padding: 1rem;
  border-top: unset;
}

.points-container {
  z-index: 1;
  background-color: black;
  display: flex;
  flex-direction: column;
  & .v-btn {
    border-radius: unset;
    height: 50%;
    border: 1px solid white;
    border-left: unset;
    &:first-child {
      border-top: unset;
      border-bottom: unset;
    }
  }
}

.buttons-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
}
</style>
