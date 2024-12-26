<script setup lang="ts">
import ManualLabor from './components/ManualLabor.vue';
import Profile from './components/Profile.vue';
import Worker from './components/Worker.vue';
</script>

<template>
  <main>
    <ManualLabor />
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
