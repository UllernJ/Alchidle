<template>
  <section class="Player">
    <h2>Player</h2>
    <section class="icon-container">
      <Icon :path="playerIcon" :size="100" />
    </section>
    <div class="PlayerStats">
      <div class="Stat">
        <span>{{ attackPower }}</span>
        <Icon :path="attackIcon" :size="24" />
      </div>
      <div class="Stat">
        <span>{{ defencePower }}</span>
        <Icon :path="defenceIcon" :size="24" />
      </div>
      <div class="Stat">
        <span>{{ health }}</span>
        <Icon :path="healthIcon" :size="24" color="red" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePlayer } from "../../composable/usePlayer";
import {
  attackIcon,
  defenceIcon,
  healthIcon,
  playerIcon,
} from "../../icons/icons";
import Icon from "../Icon.vue";

const { attackPower, defencePower, health } = usePlayer();
</script>

<style scoped>
.Player {
  background-color: #2b2b2b;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-right: 1px solid #f1f1f1;
  min-width: 15rem;
}

.icon-container {
  border-bottom: 1px solid #f1f1f1;
}

.PlayerStats {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  padding: 0.5rem 2rem;
}

.Stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.Stat span {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
