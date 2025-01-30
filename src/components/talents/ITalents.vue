<template>
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
        transformOrigin: 'top left'
      }"
    >
      <talent-node :node="tree" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TalentNode from "@/components/talents/TalentNode.vue";
import { upTree } from "@/data/talent";

const tree = upTree;

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
</script>

<style scoped>
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

.talents {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: top left;
}
</style>