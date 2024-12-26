<script setup lang="ts">
import MoneyPanel from './components/MoneyPanel.vue'
import Profile from './components/Profile.vue';
import Worker from './components/Worker.vue';
</script>

<template>
  <main>
    <MoneyPanel />
    <Profile />
  </main>
  <section>
    <Worker />
  </section>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
}
</style>
