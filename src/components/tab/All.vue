<template>
  <div class="container">
    <section>
      <span class="title">Workers</span>
      <Workers />
    </section>
    <section>
      <span class="title">Buildings</span>
      <Buildings />
    </section>
    <section>
      <span class="title">Research</span>
      <Research class="research" />
    </section>
    <section>
      <span class="title">Gear</span>
      <Gear />
    </section>
  </div>
</template>

<script lang="ts" setup>
import Buildings from "./Buildings.vue";
import Gear from "./Gear.vue";
import Research from "./Research.vue";
import Workers from "./Workers.vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
}
section {
  padding: 1rem;
}
section:not(:first-child) {
  border-top: 1px solid #f1f1f1;
}

.research {
  display: flex;
  flex-direction: row;
}
</style>
