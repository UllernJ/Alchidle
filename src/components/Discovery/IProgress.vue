<template>
  <div class="progress-container">
    <div class="map-info">
      <span>Map: {{ map }}</span>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-btn
            :icon="mdiBagPersonal"
            size="large"
            density="compact"
            variant="outlined"
            v-bind="props"
            @click="toggleInventory"
          />
        </template>
        <span>Open Inventory</span>
      </v-tooltip>
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
            size="1.25em"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMonsters } from "../../composable/useMonsters";
import Icon from "../Icon.vue";
import { getResourceIcon } from "../../utils/resourceUtil";
import { computed } from "vue";
import { upgradeIcon } from "../../icons/icons";
import { mdiBagPersonal } from "@mdi/js";
import { useInventory } from "@/composable/useInventory";
import { MONSTER_STATE } from "@/types";

const { monsters, map, mapMonsters } = useMonsters();
const { toggleInventory } = useInventory();

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-left: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9em;
  font-weight: bold;
}
</style>
