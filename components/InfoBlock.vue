<script setup lang="ts">
defineProps({
  value: { type: String, default: "" },
  description: { type: String, default: "" },
  text: { type: String, default: "" },
});
</script>

<template>
  <div class="flex flex-col bg-gray-100 p-30 rounded-2xl">
    <div class="text-6xl font-medium text-zinc-900">{{ value }}</div>
    <div class="text-xl text-zinc-900 mt-16">{{ description }}</div>
    <div class="text-xl text-zinc-400 mt-30">{{ text }}</div>
  </div>
</template>
