<template>
  <section class="Player">
    <div class="buttons">
      <v-btn
        density="compact"
        :prepend-icon="mdiMultiplicationBox"
        size="large"
        @click="toggleMultipliers"
      >
        Multipliers
      </v-btn>

      <v-btn
        density="compact"
        size="large"
        :disabled="!isReincarnationUnlocked"
        :prepend-icon="mdiMeditation"
        @click="openReincarnation"
      >
        Reincarnation
        <span
          v-if="nextPoints > 0"
          class="ml-2"
        >{{ `(+${nextPoints})` }}</span>
      </v-btn>
      <v-btn
        density="compact"
        size="large"
        :prepend-icon="mdiMeditation"
        @click="viewTalents?.open()"
      >
        Talents
      </v-btn>
    </div>
    <div class="header">
      <h2>Stats</h2>
    </div>
    <div class="PlayerStats">
      <div class="Stat">
        <span>{{ formatNumber(store.attackPower, true) }}</span>
        <Icon
          :path="attackIcon"
          :size="24"
        />
      </div>
      <div class="Stat">
        <span>{{ formatNumber(store.defencePower, true) }}</span>
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
            {{ formatNumber(store.health) }} / {{ formatNumber(store.maxHealth) }}
            <Icon
              :path="healthIcon"
              size="1em"
              color="white"
            />
          </span>
        </div>
      </div>
      <div class="Stat-regen">
        <span>+ {{ formatNumber(store.regen, true) }}</span>
        <Icon
          :path="healthIcon"
          size="1em"
          color="red"
        />
        <span>/s</span>
      </div>
    </div>
  </section>
  <view-talents ref="view-talents" />
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ViewTalents from "@/components/talents/ViewTalents.vue";
import { computed, useTemplateRef } from "vue";
import { useMultipliers } from "@/composable/useMultipliers";
import { attackIcon, defenceIcon, healthIcon } from "@/icons/icons";
import Icon from "./Icon.vue";
import { mdiMeditation, mdiMultiplicationBox } from "@mdi/js";
import { formatNumber } from "@/utils/number";
import { useReincarnation } from "@/composable/reincarnation/useReincarnation";
import { usePlayerStore } from "@/stores/usePlayerStore";

const store = usePlayerStore();
const { toggleMultipliers } = useMultipliers();
const { openReincarnation, isReincarnationUnlocked, nextPoints } = useReincarnation();

const viewTalents = useTemplateRef("view-talents");

const healthPercentage = computed(() => {
  return store.health.dividedBy(store.maxHealth).times(100).toNumber();
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
  height: 89.1%;
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
  gap: 0.25rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > .v-btn {
    border-radius: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
  }
}
section {
  width: 100%;
  display: flex;
  & > .v-btn {
    border-radius: 0;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: start;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
  }
  & > .v-icon {
    width: 10%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f1f1f1;
  }
}
</style>
