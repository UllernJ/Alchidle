<template>
  <v-overlay
    v-model="isMapOpen"
    scroll-strategy="reposition"
    class="overlay"
  >
    <v-card class="inventory-card">
      <v-card-title class="headline">
        Maps
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
              @click="switchMap(item)"
            >
              <span>{{ item.name }}</span>
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :prepend-icon="mdiClose"
          :active="true"
          @click="toggleMap"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { mdiClose } from "@mdi/js";
import { useMap } from "@/composable/useMap";

const { toggleMap, maps, switchMap, isMapOpen } = useMap();
</script>

<style scoped>
.inventory-card {
  background-color: #2b2b2b;
  border: 1px solid #ffff;
  width: 50rem !important;
  padding: 2rem;
}

.inventory-grid {
  display: flex;
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

.map-btn:hover {
  background-color: #333 !important;
  opacity: 0.8 !important;
}
</style>