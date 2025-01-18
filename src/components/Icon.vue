<template>
  <svg
    v-if="path"
    v-bind="$attrs"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="fill-current"
    :width="size"
    :height="size"
  >
    <path
      :d="path"
      :fill="color || '#fff'"
      fill-opacity="1"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  path: string | undefined;
  size: number | string;
  color?: string;
}>();
</script>

<style scoped></style>
