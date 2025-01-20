<template>
  <section class="Player">
    <div class="header">
      <h2>Stats</h2>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-btn
            variant="outlined"
            density="compact"
            :icon="mdiMultiplicationBox"
            size="large"
            :border="true"
            v-bind="props"
            @click="toggleMultipliers"
          />
        </template>
        <span>View multipliers</span>
      </v-tooltip>
    </div>
    <div class="PlayerStats">
      <div class="Stat">
        <span>{{ formatNumber(attackPower) }}</span>
        <Icon
          :path="attackIcon"
          :size="24"
        />
      </div>
      <div class="Stat">
        <span>{{ formatNumber(defencePower) }}</span>
        <Icon
          :path="defenceIcon"
          :size="24"
        />
      </div>
      <div class="Stat-regen">
        <span> {{ formatNumber(health) }} / {{ formatNumber(maxHealth) }}</span>
        <Icon
          :path="healthIcon"
          :size="20"
          color="red"
        />
      </div>
      <div class="Stat-regen">
        <span>+ {{ formatNumber(regen) }}</span>
        <Icon
          :path="healthIcon"
          :size="20"
          color="red"
        />
        <span>/s</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMultipliers } from "../composable/useMultipliers";
import { usePlayer } from "../composable/usePlayer";
import { attackIcon, defenceIcon, healthIcon } from "../icons/icons";
import Icon from "./Icon.vue";
import { mdiMultiplicationBox } from "@mdi/js";
import { formatNumber } from "../utils/number";

const { attackPower, defencePower, health, maxHealth, regen } = usePlayer();
const { toggleMultipliers } = useMultipliers()
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  gap: 1rem;
}

.Player {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-right: 1px solid #f1f1f1;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
}

.icon-container {
  border-bottom: 1px solid #f1f1f1;
}

.PlayerStats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.Stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
}

.Stat span {
  font-size: 1.25em;
  font-weight: bold;
}

.Stat-regen {
  font-size: 0.75em;
  display: flex;
  align-items: center;
  gap: 0.1rem;
}
</style>
