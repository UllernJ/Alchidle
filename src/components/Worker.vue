<template>
    <div>
    <span>{{ 'Workers' }}</span>
    <button :disabled="money <= 50"
        @click="buyWorker"
        > {{ '50$' }} </button>
    </div>
</template>

<script setup lang="ts">
import { useResource } from '../composable/useResource';

const { money } = useResource()
const buyWorker = () => {
    money.value -= 50
}

</script>

<style scoped>
</style>