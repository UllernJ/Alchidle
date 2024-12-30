<template>
    <section>
    <Resource :type="RESOURCE.ALCHEMY" />
    <Resource :type="RESOURCE.FARMING" />
    <Resource :type="RESOURCE.MINING" />
    <Resource :type="RESOURCE.SCIENCE" />
</section>
</template>

<script lang="ts" setup>
import { RESOURCE } from '../../types';
import Resource from './Resource.vue';

</script>

<style scoped>
section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

</style>