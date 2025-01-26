<template>
  <div class="progress-container">
    <div class="map-info">
      <span>Map: {{ map }}</span>
      <v-btn
        :icon="mdiBagPersonal"
        size="large"
        density="compact"
        variant="outlined"
      />
    </div>
    <div class="progress-grid">
      <div
        v-for="(monster, index) in monsters"
        :key="index"
        :class="[
          'progress-box',
          { defeated: monster.health <= 0 },
          { current: index === current },
        ]"
      >
        <div class="icon-container">
          <Icon
            v-if="monster.drop.amount > 0"
            class="icon"
            :path="
              index !== monsters.length - 1
                ? getResourceIcon(monster.drop.resource)
                : upgradeIcon
            "
            :size="20"
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

const { monsters, map } = useMonsters();

const current = computed(() => monsters.value.findIndex((m) => m.health > 0));
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
  grid-template-columns: repeat(5, 1fr);
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
