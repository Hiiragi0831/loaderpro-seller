<script setup lang="ts">
const route = useRoute();

const menuItems = [
  { name: "Главная", path: "/home" },
  { name: "Товары", path: "/products" },
  { name: "Добавить товары", path: "/goods" },
];
</script>

<template>
  <section>
    <div class="container m-auto">
      <div class="relative flex gap-16">
        <NuxtLink
          v-for="(item, id) in menuItems"
          :key="id"
          :to="item.path"
          class="px-16 py-8 inline-block relative text-lg"
          :class="{
            'text-black border-b-2 border-primary-500':
              route.path === item.path,
            'text-gray-400': route.path !== item.path,
          }"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
