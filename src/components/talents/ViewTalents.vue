<template>
  <v-dialog
    v-model="isOpen"
    max-width="1200px"
    scroll-strategy="reposition"
  >
    <div class="talents-container">
      <button
        class="close-button"
        @click="close"
      >
        <v-icon
          :icon="mdiClose"
          size="24"
        />
      </button>
  
      <div class="talents-tree">
        <template v-for="(talent, index) in Object.values(talentNodes)">
          <div
            v-if="!talent.title.toLowerCase().includes('test')"
            :key="index"
            class="talent-node"
            :class="{ 'talent-learned': talent.level.gt(0) }"
          >
            <div class="talent-icon">
              <v-icon
                :icon="talent.icon"
                size="32"
              />
              <div
                v-if="talent.level.gt(0)"
                class="talent-level"
              >
                {{ talent.level.toString() }}
              </div>
            </div>
            <div class="talent-title">
              {{ talent.title }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </v-dialog>
</template>
  
  <script setup lang="ts">
  import { talentNodes } from "@/data/talent";
import { mdiClose } from "@mdi/js";
  import { ref } from "vue";
  
  const isOpen = ref(false);
  
  const open = () => {
    isOpen.value = true;
  };
  
  const close = () => {
    isOpen.value = false;
  };
  
  defineExpose({ open, close });
  </script>
  
  <style scoped>
  .talents-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100%;
    background: linear-gradient(135deg, #1e1e2f, #2a2a40);
    border-radius: 12px;
    position: relative; /* Required for positioning the close button */
  }
  .close-button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  
    &:active {
      transform: scale(0.9);
    }
  }
  
  .talents-tree {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
    overflow-y: auto;
  }
  
  .talent-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      background-color: rgba(255, 255, 255, 0.1);
    }
  
    &.talent-learned {
      background-color: rgba(76, 175, 80, 0.15);
      border-color: #4caf50;
      box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
  
      &:hover {
        background-color: rgba(76, 175, 80, 0.25);
      }
    }
  }
  
  .talent-icon {
    position: relative;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: background 0.2s ease;
  
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  .talent-level {
    position: absolute;
    bottom: -5px;
    right: -5px;
    background-color: #4caf50;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .talent-title {
    text-align: center;
    font-size: 0.9rem;
    color: #fff;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  .v-dialog {
    animation: fadeIn 0.3s ease;
  
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
  </style>