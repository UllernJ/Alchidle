<template>
  <div class="gear-container">
    <h1>Gear</h1>
    <h2 class="title">
      Weapon
    </h2>
    <section class="gear-list">
      <div
        v-for="{ item, isAffordable, totalCost } in availableWeapons"
        :key="item.name"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!isAffordable"
              v-bind="props"
              @click="item.buy(store.amountToBuy)"
            >
              <Icon
                :path="item.path"
                size="4em"
              />
              <div class="gear-description">
                <h2>{{ item.name }} ({{ item.quantity }})</h2>
                <div class="cost">
                  <p>{{ formatNumber(item.damage) }}</p>
                  <Icon
                    :path="attackIcon"
                    :size="20"
                  />
                </div>
              </div>
            </v-btn>
          </template>
          <div :class="['cost', { 'text-red': !isAffordable }]">
            <p>{{ formatNumber(totalCost) }}</p>
            <Icon
              :path="miningIcon"
              :size="20"
              :color="isAffordable ? '' : 'red'"
            />
          </div>
        </v-tooltip>
      </div>
    </section>

    <h2 class="title">
      Armor
    </h2>
    <section class="gear-list">
      <template
        v-for="{ item, isAffordable, totalCost } in availableArmors"
        :key="item.name"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!isAffordable"
              v-bind="props"
              @click="item.buy(store.amountToBuy)"
            >
              <Icon
                :path="item.path"
                size="4em"
              />
              <div class="gear-description">
                <h2>{{ item.name }} ({{ item.quantity }})</h2>
                <div class="cost">
                  <p>{{ formatNumber(item.defense) }}</p>
                  <Icon
                    :path="healthIcon"
                    :size="20"
                    color="red"
                  />
                </div>
              </div>
            </v-btn>
          </template>
          <div :class="['cost', { 'text-red': !isAffordable }]">
            <p>{{ formatNumber(totalCost) }}</p>
            <Icon
              :path="miningIcon"
              :size="20"
              :color="isAffordable ? '' : 'red'"
            />
          </div>
        </v-tooltip>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResource } from "@/composable/useResource";
import Icon from "@/components/Icon.vue";
import { attackIcon, healthIcon, miningIcon } from "@/icons/icons";
import { formatNumber } from "@/utils/number";
import Decimal from "break_eternity.js";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useGearStore } from "@/stores/useGearStore";

const { throttledMiningAmount } = useResource();
const store = usePlayerStore();
const gearStore = useGearStore();

const getTotalPrice = (baseCost: Decimal, quantity: number): Decimal => {
  let total = new Decimal(0);
  let currentCost = baseCost;
  const multiplier = 1.15;

  for (let i = 0; i < quantity; i++) {
    total = total.add(currentCost);
    currentCost = currentCost.times(multiplier);
  }
  return total;
};

const canAffordCost = (cost: Decimal) => {
  return throttledMiningAmount.value.gte(cost);
};

const availableWeapons = computed(() => {
  return gearStore.weapons.map((weapon) => {
    const totalCost = getTotalPrice(weapon.cost, store.amountToBuy);
    return {
      item: weapon,
      isAffordable: canAffordCost(totalCost),
      totalCost
    };
  });
});

const availableArmors = computed(() => {
  return gearStore.armors.map((armor) => {
    const totalCost = getTotalPrice(armor.cost, store.amountToBuy);
    return {
      item: armor,
      isAffordable: canAffordCost(totalCost),
      totalCost
    };
  });
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

.gear-description {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
