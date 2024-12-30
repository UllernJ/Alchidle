<template>
    <aside class="state-sidebar">
        <ul class="state-list">
            <li class="state-item" v-for="state in states" :key="state">
                <button class="state-button" @click="setState(state)">{{ state }}</button>
            </li>
        </ul>
        <Workers />
    </aside>
</template>

<script lang="ts" setup>
import { useTab } from '../../composable/useTab';
import Workers from './Workers.vue';

const { getStates, setState } = useTab();

const states = getStates();
</script>

<style scoped>
.state-sidebar {
    background-color: #1a1a1a;
    display: flex;
    width: 100%;
    border: 1px solid white;
}

.state-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.state-item {
    text-align: left;
    &:first-child {
        border-right: 1px solid white;
    }
    &:last-child {
        border-bottom: 1px solid white;
        border-right: 1px solid white;
    }
    &:not(:last-child, :first-child) {
        border-right: 1px solid white;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
    }
}

.state-button {
    padding: .6rem 1.1rem;
    font-size: .85em;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
}

.state-button:hover {
    opacity: .8;
}
</style>
