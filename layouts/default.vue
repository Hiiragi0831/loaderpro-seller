<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>

<style scoped></style>
