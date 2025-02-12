<template>
  <v-dialog
    v-model="isOpen"
    max-width="600px"
    scroll-strategy="reposition"
  >
    <v-card>
      <v-card-title class="headline">
        Import Save File
      </v-card-title>
      <v-card-text>
        <v-textarea
          v-model="importData"
          label="Paste Save File Here"
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
          @click="importSave"
        >
          Import
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
  import { ref } from "vue";
  import { MessageType, useMessage } from "@/composable/useMessage";
  
  const isOpen = ref(false);
  const importData = ref("");
  
  const open = () => {
    importData.value = "";
    isOpen.value = true;
  };
  
  const close = () => {
    isOpen.value = false;
  };
  
  const importSave = () => {
    try {
      localStorage.setItem("session", importData.value);
      window.location.reload(); //todo: replace with a better solution
      const { establishMessage } = useMessage();
      establishMessage(MessageType.SUCCESS, "Save file imported successfully");
      close();
    } catch (error: unknown) {
      const { establishMessage } = useMessage();
      if (error instanceof Error) {
        establishMessage(MessageType.ERROR, error.message);
        establishMessage(MessageType.ERROR, "Failed to import save file");
      }
    }
  };
  
  defineExpose({ open, close });
  </script>
  
  <style scoped></style>