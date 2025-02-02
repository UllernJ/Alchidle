<template>
  <svg
    v-if="path"
    v-bind="$attrs"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="fill-current"
    :width="relativeSize"
    :height="relativeSize"
  >
    <path
      :d="path"
      :fill="color || '#fff'"
      fill-opacity="1"
    />
  </svg>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<{
  path: string | undefined;
  size: number | string;
  color?: string;
}>();

const { width } = useWindowSize()

const relativeSize = computed(() => {
  if (typeof props.size === 'number') {
    return (width.value / 1500) * props.size;
  }
  if (typeof props.size === 'string' && props.size.endsWith('em')) {
    const emValue = parseFloat(props.size);
    return emValue * 16;
  }
  if (typeof props.size === 'string' && props.size.endsWith('px')) {
    return parseFloat(props.size);
  }
  return 24;
});


</script>

<style scoped></style>
