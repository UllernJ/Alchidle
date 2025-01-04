<template>
  <section class="fight-container">
    <section class="fight-cube">
      <section class="monster">
        <span class="monster-name">Bad Gnome</span>
        <Icon :path="badGnomeIcon" :size="124" />
        <div class="health-bar">
          <div class="health-bar-inner" :style="{ width: health + '%' }"></div>
        </div>
      </section>
      <section class="attack">
        <button class="attack-button">Attack</button>
        <button class="attack-button">Auto attack</button>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { badGnomeIcon } from "../icons/icons";
import Icon from "./Icon.vue";

const health = ref(100);
</script>

<style scoped>
.fight-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.fight-cube {
  position: absolute;
  right: 0;
  background-color: #2b2b2b;
  padding: 2rem;
  border-left: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
}

.monster {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
}

.monster-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.health-bar {
  height: 20px;
  width: 100%;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  margin-top: 10px;
  overflow: hidden;
}

.health-bar-inner {
  height: 100%;
  background-color: red;
  border-radius: 8px;
  transition: width 0.3s ease-in-out;
}

.attack {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
}

.attack-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2b2b;
  width: fit-content;
  height: 100%;
  padding: 1rem;
  border: 1px solid #f1f1f1;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.attack-button:hover {
  cursor: pointer;
  background-color: #3a3939;
}
</style>
