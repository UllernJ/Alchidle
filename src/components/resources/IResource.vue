<script setup lang="ts">
import { computed, ref } from "vue";
import { useResource } from "../../composable/useResource";
import { RESOURCE } from "../../types";
import { usePlayer } from "../../composable/usePlayer";
import Icon from "../Icon.vue";
import { BigNumber } from "../../models/BigNumber";

const { getResource } = useResource();
const { setFocus, currentFocus } = usePlayer();

const props = defineProps<{
  type: RESOURCE;
  icon: string;
}>();

const _progress = ref(0);

const progress = computed(() => {
  const resource = getResource(props.type);
  const percentage = resource.amount.getPercentageOf(resource.maxAmount);
  if(percentage === 0 && resource.amount.compare(BigNumber.fromString("0")) !== 0) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    _progress.value++
    return _progress.value
  }
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  _progress.value = percentage;
  return percentage;
});


const gatherMessage = computed(() => {
  if (currentFocus.value === RESOURCE.MONEY) {
    return "Stealing money...";
  } else if (currentFocus.value === RESOURCE.MINING) {
    return "Mining rocks...";
  } else if (currentFocus.value === RESOURCE.SCIENCE) {
    return "Studying...";
  }
  return "No idea what to do...";
});
</script>

<template>
  <div class="resource-container">
    <div class="header">
      <Icon
        :path="icon"
        size="1.2em"
      />
      <span>{{ type.toString() }}</span>
    </div>
    <span class="resource-values">
      {{
        `${getResource(props.type).amount}/${getResource(props.type).maxAmount}`
      }}
    </span>
    <div class="loading-bar-wrapper">
      <div
        class="loading-bar"
        :style="{
          width: progress + '%',
          background: progress > 90 ? 'red' : '',
        }"
      />
    </div>
    <div class="button-container">
      <v-btn
        color="white"
        variant="outlined"
        :active="currentFocus == type"
        width="50%"
        @click="setFocus(type)"
      >
        {{ currentFocus == type ? gatherMessage : "Gather" }}
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.resource-container {
  background-color: #1a1a1a;
  padding: 0.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.33rem;
  border: 1px solid #f1f1f1;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-top: -0.75rem;
  font-size: 1.5em;
}

.loading-bar-wrapper {
  width: 100%;
  height: 1.2rem;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.loading-bar {
  height: 100%;
  background: #ffcc00;
  transition: width 0.5s ease-in-out;
  border-radius: 8px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 2rem;
}
.income {
  font-size: 1em;
  font-weight: 600;
  width: 20%;
}
</style>
