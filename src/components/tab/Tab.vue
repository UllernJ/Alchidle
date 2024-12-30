<template>
    <aside class="state-sidebar">
        <ul class="state-list">
            <li class="state-item" v-for="state in states" :key="state">
                <button class="state-button" 
                @click="setState(state)"
                :class="{'active': state === currentState}"
                >{{ state }}
            </button>
            </li>
        </ul>
        <Workers v-if="currentState === TAB_STATE.WORKERS"/>
    </aside>
</template>

<script lang="ts" setup>
import { TAB_STATE, useTab } from '../../composable/useTab';
import Workers from './Workers.vue';

const { getStates, setState, currentState } = useTab();

const states = getStates();
</script>

<style scoped>
.state-sidebar {
    background-color: #1a1a1a;
    display: flex;
    width: 100%;
    min-height: 50vh;
    border: 1px solid white;
}

.state-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid white;
}

.state-item {
    text-align: left;
    &:last-child {
        border-bottom: 1px solid white;
    }
    &:not(:last-child, :first-child) {
        border-top: 1px solid white;
        border-bottom: 1px solid white;
    }
}

.state-button {
    padding: .6rem 1.3rem;
    font-size: .9em;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
}

.state-button:hover {
    opacity: .8;
}
.active {
    background-color: #1a1a1a;
}
</style>
