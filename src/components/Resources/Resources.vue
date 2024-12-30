<template>
    <Resource :type="RESOURCE.MONEY" />
    <Resource :type="RESOURCE.FARMING" />
    <Resource :type="RESOURCE.MINING" />
    <Resource :type="RESOURCE.SCIENCE" />
</template>

<script lang="ts" setup>
import { RESOURCE } from '../../types';
import Resource from './Resource.vue';

</script>

<style scoped>
</style>