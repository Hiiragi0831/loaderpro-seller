<script setup lang="ts">
import { useLogout } from "~/composables/useLogout";

const logOut = useLogout();

const onOut = async () => {
  await logOut();
};
</script>

<template>
  <div class="flex">
    <Button class="h-50 w-50 !rounded-2xl" severity="secondary" @click="onOut">
      <Icon name="icons:account" class="text-xl" />
    </Button>
  </div>
</template>

<style scoped></style>
