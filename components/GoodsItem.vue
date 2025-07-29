<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Заголовок",
  },
  description: {
    type: String,
    default: "Описание",
  },
  image: {
    type: String,
    default: "/images/goods/1.png",
  },
  variant: {
    type: String,
    default: "default",
  },
  imageClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="rounded-2xl p-30 min-h-230 relative bg-gray-100 overflow-hidden transition-colors hover:bg-primary-500 hover:text-white"
  >
    <div class="w-10/12 flex flex-col gap-12">
      <p class="text-2xl font-bold">{{ title }}</p>
      <p class="max-w-1/2">{{ description }}</p>
    </div>
    <Image :src="image" :class="['absolute', imageClass]" />
  </div>
</template>

<style scoped></style>
