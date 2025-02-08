<template>
  <div class="gear-container">
    <h1>Gear</h1>
    <h2 class="title">
      Weapon
    </h2>

    <section class="gear-list">
      <template
        v-for="(weapon, index) in weapons"
        :key="index"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!canAffordWeapon(index)"
              v-bind="props"
              @click="buyWeapon(index, amountToBuy)"
            >
              <Icon
                :path="weapon.path"
                size="4em"
              />
              <div class="gear-description">
                <h2>{{ weapon.name }} ({{ weapon.quantity }})</h2>
                <div class="cost">
                  <p>{{ formatNumber(weapon.damage) }}</p>
                  <Icon
                    :path="attackIcon"
                    :size="20"
                  />
                </div>
              </div>
            </v-btn>
          </template>
          <div :class="['cost', { 'text-red': !canAffordWeapon(index) }]">
            <p>{{ formatNumber(getTotalPrice(weapon.cost, amountToBuy)) }}</p>
            <Icon
              :path="miningIcon"
              :size="20"
              :color="canAffordWeapon(index) ? '' : 'red'"
            />
          </div>
        </v-tooltip>
      </template>
    </section>

    <h2 class="title">
      Armor
    </h2>
    <section class="gear-list">
      <template
        v-for="(armor, index) in armors"
        :key="index"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              color="white"
              variant="outlined"
              height="7rem"
              width="15rem"
              :disabled="!canAffordArmor(index)"
              v-bind="props"
              @click="buyArmor(index, amountToBuy)"
            >
              <Icon
                :path="armor.path"
                size="4em"
              />
              <div class="gear-description">
                <h2>{{ armor.name }} ({{ armor.quantity }})</h2>
                <div class="cost">
                  <p>{{ formatNumber(armor.defense) }}</p>
                  <Icon
                    :path="healthIcon"
                    :size="20"
                    color="red"
                  />
                </div>
              </div>
            </v-btn>
          </template>
          <div :class="['cost', { 'text-red': !canAffordArmor(index) }]">
            <p>{{ formatNumber(getTotalPrice(armor.cost, amountToBuy)) }}</p>
            <Icon
              :path="miningIcon"
              :size="20"
              :color="canAffordArmor(index) ? '' : 'red'"
            />
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
import { attackIcon, healthIcon, miningIcon } from "../../icons/icons";
import { formatNumber } from "../../utils/number";
import { usePlayer } from "../../composable/usePlayer";
import Decimal from "break_eternity.js";

const { weapons, armors, buyArmor, buyWeapon } = useGear();
const { resources } = useResource();
const { amountToBuy } = usePlayer();

const canAffordWeapon = computed(() => {
  return (index: number) => {
    const weapon = weapons.value[index];
    const totalCost = getTotalPrice(weapon.cost, amountToBuy.value);
    return resources[RESOURCE.MINING].value.amount.gte(totalCost);
  };
});

const canAffordArmor = computed(() => {
  return (index: number) => {
    const armor = armors.value[index];
    const totalCost = getTotalPrice(armor.cost, amountToBuy.value);
    return resources[RESOURCE.MINING].value.amount.gte(totalCost);
  };
});

const getTotalPrice = (
  baseCost: Decimal,
  quantity: number,
  multiplier: number = 1.15
): Decimal => {
  let total = new Decimal(0);
  let currentCost = baseCost;

  for (let i = 0; i < quantity; i++) {
    total = total.add(currentCost);
    currentCost = currentCost.times(multiplier);
  }

  return total;
};
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
