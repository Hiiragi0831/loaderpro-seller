<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/useLogout'

const authStore = useAuthStore()
const logOut = useLogout()

const onCheck = async () => {
  await authStore.checkToken()
}
const onOut = async () => {
  await logOut()
}
</script>

<template>
  <main class="relative grid">
    <section>
      <div class="container m-auto">
        <p>{{ $t('welcome') }}</p>
        <Button label="Проверка токена" class="w-full" @click="onCheck" />
        <Button label="Выйти" class="w-full" @click="onOut" />
      </div>
    </section>
  </main>
</template>
