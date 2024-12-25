<script setup lang="ts">
import MoneyPanel from './components/MoneyPanel.vue'
import Profile from './components/Profile.vue';
</script>

<template>
  <main>
    <MoneyPanel />
    <Profile />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
}
</style>
