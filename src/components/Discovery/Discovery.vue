<template>
  <section class="container">
    <PlayerSection />
    <component :is="showMap ? MapComponent : ActionLog" />
    <Progress />
    <FightSection />
  </section>
</template>

<script lang="ts" setup>
import ActionLog from "./ActionLog.vue";
import Map from "./Map.vue";
import FightSection from "./FightSection.vue";
import PlayerSection from "./PlayerSection.vue";
import { useMap } from "../../composable/useMap";
import Progress from "./Progress.vue";

const MapComponent = Map;
const { showMap } = useMap();
</script>

<style scoped>
.container {
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  background-color: #1a1a1a;
  display: grid;
  grid-template-columns: 1fr 4fr 1.5fr 1.5fr;
  height: 100%;
  width: 100%;
}
</style>
