<template>
  <v-dialog
    v-model="isOpen"
    max-width="600px"
    scroll-strategy="reposition"
  >
    <v-card>
      <v-card-title class="headline">
        Reset Game
      </v-card-title>
      <v-card-text>
        Are you sure you want to start over? All your progress and your save
        file will be deleted.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          variant="outlined"
          @click="resetGame"
        >
          Yes, I am sure
        </v-btn>
        <v-btn
          color="success"
          variant="outlined"
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage, MessageType } from "@/composable/useMessage";
import { useTab } from "@/composable/useTab";
import { resetToDefault } from "@/utils/useResetStore";

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const resetGame = () => {
  const { resetTabState } = useTab();
  const { establishMessage } = useMessage();
  resetToDefault();
  localStorage.removeItem("session");
  resetTabState();
  establishMessage(MessageType.SUCCESS, "Game has been reset");
  close();
};

defineExpose({ open, close });
</script>

<style scoped></style>
