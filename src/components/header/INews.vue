<template>
  <v-dialog
    v-model="isOpen"
    max-width="800px"
    scroll-strategy="reposition"
  >
    <v-card>
      <v-card-title class="headline">
        Patch Notes
      </v-card-title>
      <v-card-text>
        <div
          v-for="note in patchNotes"
          :key="note.version"
          class="patch-note"
        >
          <h3>{{ note.version }} - {{ note.date }}</h3>
          <ul>
            <li
              v-for="change in note.changes"
              :key="change"
            >
              {{ change }}
            </li>
          </ul>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
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
import { patchNotes } from "./news";
  
  const isOpen = ref(false);

  
  const open = () => {
    isOpen.value = true;
  };
  
  const close = () => {
    isOpen.value = false;
  };
  
  defineExpose({open, close });
  </script>
  
  <style scoped>
  .patch-note {
    margin-bottom: 1.5rem;
  }
  
  .patch-note h3 {
    color: #42b983;
    margin-bottom: 0.5rem;
  }
  
  .patch-note ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  .patch-note li {
    margin-bottom: 0.5rem;
  }
  </style>