<template>
  <v-dialog
    v-model="isOpen"
    max-width="600px"
  >
    <v-card>
      <v-card-title class="headline">
        Export Save File
      </v-card-title>
      <v-card-text>
        <v-textarea
          v-model="exportData"
          label="Save File"
          readonly
          rows="10"
          outlined
          no-resize
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="outlined"
          @click="copyToClipboard"
        >
          Copy to Clipboard
        </v-btn>
        <v-btn
          color="success"
          variant="outlined"
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { MessageType, useMessage } from "@/composable/useMessage";
import { ref } from "vue";

const isOpen = ref(false);
const exportData = ref("");

const open = (data: string) => {
  exportData.value = data;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(exportData.value);
  const { establishMessage } = useMessage();
  establishMessage(MessageType.INFO, "Copied to clipboard");
};

defineExpose({ open, close });
</script>

<style scoped></style>
