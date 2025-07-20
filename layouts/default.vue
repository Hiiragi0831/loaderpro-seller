<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";

const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.isAuthenticated" key="main-layout" class="wrapper">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
  <div v-else key="auth-layout" class="wrapper">
    <slot />
  </div>
</template>

<style scoped></style>
