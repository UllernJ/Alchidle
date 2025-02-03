<template>
  <section class="Player">
    <div class="header">
      <h2>Stats</h2>
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
        <div class="health-bar">
          <div
            class="health-bar-inner"
            :style="{ width: healthPercentage + '%' }"
          />
          <span class="health-text">
            {{ formatNumber(health) }} / {{ formatNumber(maxHealth) }}
            <Icon
              :path="healthIcon"
              size="1em"
              color="white"
            />
          </span>
        </div>
      </div>
      <div class="Stat-regen">
        <span>+ {{ formatNumber(regen) }}</span>
        <Icon
          :path="healthIcon"
          size="1em"
          color="red"
        />
        <span>/s</span>
      </div>
      <div class="buttons">
        <v-btn
          variant="outlined"
          density="compact"
          :prepend-icon="mdiMultiplicationBox"
          size="large"
          @click="toggleMultipliers"
        >
          Multipliers
        </v-btn>
        <v-btn
          variant="outlined"
          density="compact"
          :prepend-icon="mdiMeditation"
          size="large"
          :disabled="!isDev && !isReincarnationUnlocked"
          @click="openReincarnation"
        >
          Reincarnation
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMultipliers } from "@/composable/useMultipliers";
import { usePlayer } from "@/composable/usePlayer";
import { attackIcon, defenceIcon, healthIcon } from "@/icons/icons";
import Icon from "./Icon.vue";
import { mdiMeditation, mdiMultiplicationBox } from "@mdi/js";
import { formatNumber } from "@/utils/number";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { isDev } from "@/utils/dev";

const { attackPower, defencePower, health, maxHealth, regen } = usePlayer();
const { toggleMultipliers } = useMultipliers();
const { openReincarnation, isReincarnationUnlocked } = useReincarnation();


const healthPercentage = computed(() => {
  return health.value.dividedBy(maxHealth.value).times(100).toNumber();
});
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
  border: 1px solid #f1f1f1;
  height: 59.1dvh;
  z-index: 1;
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
  justify-content: center;
  gap: 0.1rem;
  width: 100%;
}

.health-bar {
  position: relative;
  width: 90%;
  height: 1.5rem;
  background-color: #444;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin-right: 0.5rem;
}

.health-bar-inner {
  height: 100%;
  background-color: red;
  transition: width 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: inherit;
}

.health-text {
  font-size: 0.85em;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  color: #fff;
}

.buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > .v-btn {
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: start;
  }
}
</style>
