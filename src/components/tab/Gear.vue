<template>
  <div class="gear-container">
    <h2 class="title">Weapon</h2>

    <section class="gear-list">
      <template v-for="(weapon, index) in weapons" :key="index">
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <button
              class="gear-item"
              @click="buyWeapon(index)"
              :disabled="!canAffordWeapon(index)"
              v-bind="props"
            >
              <Icon :path="weapon.path" :size="76" />
              <div class="gear-description">
                <h2>{{ weapon.name }}</h2>
                <div class="cost">
                  <p>{{ formatNumber(weapon.damage) }}</p>
                  <Icon :path="attackIcon" :size="20" />
                </div>
              </div>
            </button>
          </template>
          <div class="cost">
            <p>Costs: {{ formatNumber(weapon.cost) }}</p>
            <Icon :path="miningIcon" :size="20" />
          </div>
        </v-tooltip>
      </template>
    </section>

    <h2 class="title">Armor</h2>
    <section class="gear-list">
      <template v-for="(armor, index) in armors" :key="index">
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <button
              class="gear-item"
              @click="buyArmor(index)"
              :disabled="!canAffordArmor(index)"
              v-bind="props"
            >
              <Icon :path="armor.path" :size="76" />
              <div class="gear-description">
                <h2>{{ armor.name }}</h2>
                <div class="cost">
                  <p>{{ formatNumber(armor.defense) }}</p>
                  <Icon :path="defenceIcon" :size="20" />
                </div>
              </div>
            </button>
          </template>
          <div class="cost">
            <p>Costs: {{ formatNumber(armor.cost) }}</p>
            <Icon :path="miningIcon" :size="20" />
          </div>
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGear } from "../../composable/useGear";
import { useResource } from "../../composable/useResource";
import Icon from "../Icon.vue";
import { RESOURCE } from "../../types";
import { attackIcon, defenceIcon, miningIcon } from "../../icons/icons";
import { formatNumber } from "../../utils/number";

const { weapons, armors, buyArmor, buyWeapon } = useGear();
const { resources } = useResource();

const canAffordWeapon = computed(() => {
  return (index: number) => {
    const weapon = weapons.value[index];
    return resources[RESOURCE.MINING].value >= weapon.cost;
  };
});

const canAffordArmor = computed(() => {
  return (index: number) => {
    const armor = armors.value[index];
    return resources[RESOURCE.MINING].value >= armor.cost;
  };
});
</script>

<style scoped>
.title {
  display: flex;
  align-self: flex-start;
  font-size: 1.3em !important;
  font-weight: bold;
  margin: 1rem 0;
}

.gear-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  padding: 1rem;
}

.gear-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.gear-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #f1f1f1;
  padding: 1rem;
  background-color: #2b2b2b;
  height: 100%;
  width: 15rem;
  &:hover {
    cursor: pointer;
    background-color: #3a3939;
  }
}

.gear-description {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gear-description h2 {
  font-size: 1.2em;
  margin: 0;
  font-weight: bold;
}

.gear-description p {
  font-size: 1.2em;
  font-weight: bold;
}

.cost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
</style>
