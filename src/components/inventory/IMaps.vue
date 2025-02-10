<template>
  <v-overlay
    v-model="isMapOpen"
    scroll-strategy="reposition"
    class="overlay"
  >
    <v-card class="inventory-card">
      <v-card-title class="headline">
        Dungeons
      </v-card-title>
      <v-card-text>
        <div class="inventory-grid">
          <div
            v-for="(item, index) in maps"
            :key="index"
          >
            <v-btn
              variant="outlined"
              :prepend-icon="item.icon.path"
              :color="item.icon.color"
              :class="[{'active': item.active}, 'map-btn']"
              :append-icon="item.cleared ? mdiCheck : undefined"
              @click="switchMap(item)"
            >
              <span>{{ item.name }}</span>
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="white"
          :prepend-icon="mdiClose"
          :active="true"
          variant="outlined"
          @click="toggleMap"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { mdiCheck, mdiClose } from "@mdi/js";
import { useMap } from "@/composable/useMap";

const { toggleMap, maps, switchMap, isMapOpen } = useMap();
</script>

<style scoped>
.inventory-card {
  background-color: #2b2b2b;
  border: 1px solid #ffff;
  width: 25rem !important;
  padding: 2rem;
}

.inventory-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
}

.headline {
  color: white;
}

.active {
  background-color: black !important;
  color: white !important;
}

.map-btn {
  width: 15rem;
  display: flex;
  justify-content: start;
  align-items: center;
}

.map-btn:hover {
  background-color: #333 !important;
  opacity: 0.8 !important;
}
</style>