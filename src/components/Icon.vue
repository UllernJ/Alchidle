<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="fill-current"
    :width="size"
    :height="size"
  >
    <path
      :d="path"
      fill="#fff"
      fill-opacity="1"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  path: string;
  size: number;
}>();
</script>

<style scoped></style>
