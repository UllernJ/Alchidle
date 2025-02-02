<template>
  <div class="progress-container">
    <div class="map-info">
      <span v-if="monsters.state === MONSTER_STATE.MONSTERS">Map: {{ map }}</span>
      <span v-if="monsters.state === MONSTER_STATE.MAP">{{ activeMap?.name }}</span>
    </div>
    <div class="progress-grid">
      <div
        v-for="(monster, index) in currentmap"
        :key="index"
        :class="[
          'progress-box',
          { defeated: monster.health.lessThanOrEqualTo(0) },
          { current: index === current },
        ]"
      >
        <div class="icon-container">
          <Icon
            v-if="monster.drop.amount.gt(0) || index === monsters.value.length - 1"
            class="icon"
            :path="
              index !== monsters.value.length - 1
                ? getResourceIcon(monster.drop.resource)
                : upgradeIcon
            "
            size="1.3em"
          />
        </div>
      </div>
    </div>
    <div
      class="maps-section"
    >
      <v-btn
        :prepend-icon="mdiMap"
        class="maps-button"
        @click="toggleMap"
      >
        Maps
      </v-btn>

      <v-btn
        v-if="monsters.state === MONSTER_STATE.MAP"
        :prepend-icon="mdiExitRun"
        class="maps-button"
        @click="activeMap?.exit()"
      >
        Exit
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import { getResourceIcon } from "../../utils/resourceUtil";
import { computed } from "vue";
import { upgradeIcon } from "../../icons/icons";
import { MONSTER_STATE } from "@/types";
import { useMap } from "@/composable/useMap";
import { mdiExitRun, mdiMap } from "@mdi/js";

const { monsters, map, mapMonsters } = useMonsters();
const { activeMap, toggleMap } = useMap();

const currentmap = computed(() => {
  if (monsters.state === MONSTER_STATE.MAP){
    return mapMonsters.value;
  }
  return monsters.value;
});

const current = computed(() => {
  if (monsters.state === MONSTER_STATE.MAP) {
    return mapMonsters.value.findIndex((m) => m.health.gt(0));
  }
  return monsters.value.findIndex((m) => m.health.gt(0));
});
</script>

<style scoped>
.progress-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-left: 1px solid #f1f1f1;
  box-sizing: border-box;
  width: 100%;
  padding: 0.25rem 0.5rem;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.progress-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 100%;
  background-color: #444;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  position: relative;
}

.progress-box.defeated {
  background-color: green;
}

.current {
  border: 2px solid yellow;
}

.icon-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-info {
  text-align: center;
  width: 100%;
  font-size: 0.9em;
  font-weight: bold;
}

.maps-section {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.maps-button {
  width: 6rem !important;
  &:first-child {
    border-top: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
  }
  &:last-child {
    border-top: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
  }
  border-radius: 0 !important;
}
</style>
