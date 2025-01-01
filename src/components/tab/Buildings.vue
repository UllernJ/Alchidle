<template>
    <div class="buildings-container">
        <section class="building-list">
            <button v-for="building, index in buildings" :key="index" class="building-item" @click="buyBuilding(index)"
                :disabled="canAfford(index)">
                <h2>{{ building.name }} ({{ building.quantity }})</h2>
                <p v-for="(cost, costIndex) in building.cost" :key="costIndex">
                    {{ cost.key }}: {{ cost.value }}
                </p>
                <!-- <button @click="buyBuilding(index)" class="buy-button">Buy</button> -->
            </button>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBuildings } from '../../composable/useBuildings';
import { useResource } from '../../composable/useResource';

const { buildings, buyBuilding } = useBuildings();
const { resources } = useResource();

const canAfford = computed(() => {
    return (index: number) => {
        const building = buildings.value[index];
        for (const cost of building.cost) {
            if (resources[cost.key].value < cost.value) {
                return false;
            }
        }
        return true;
    };
});
</script>

<style scoped>
.buildings-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
    color: #ffffff;
    padding-right: 1rem;
    padding-left: 1rem;
}

.building-list {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

.building-item {
    border: 1px solid white;
    padding: 1rem;
    background-color: #292727;
    text-align: center;
    width: 22%;

    &:hover {
        cursor: pointer;
        background-color: #3a3939;
    }
}

.p {
    font-size: 1.2em;
    margin: 0;
    font-weight: bold;
}
</style>