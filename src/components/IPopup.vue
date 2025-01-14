<template>
  <div
    v-if="showPopup"
    :class="['popup', messageType.toLowerCase()]"
  >
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useMessage } from "../composable/useMessage";

const { showPopup, message, messageType } = useMessage();
</script>

<style scoped>
.popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: bold;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

.popup.success {
  background-color: #4caf50;
}

.popup.error {
  background-color: #f44336;
}

.popup.warning {
  background-color: #ff9800;
}

.popup.info {
  background-color: #2196f3;
}
</style>
