<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {loginSchema} from "~/schema/loginSchema";

type Country = { code: "russia" | "united-states" | "china"; name?: string };
const { locale, locales, setLocale } = useI18n()
const DialogLogin = ref(false)
const authStore = useAuthStore()

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema: loginSchema,
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  await authStore.signUp(values.email, values.password)
  DialogLogin.value = false
  handleReset()
})

const selectedCountry = ref<Country>({ code: locale.value, name: locale.name });

locales.value.forEach(l => {
  if (l.code === locale.value) {
    selectedCountry.value = { code: l.code, name: l.name };
  }
})

watch(selectedCountry, (value) => {
  setLocale(value.code)
})
</script>

<template>
<header class="py-28">
  <div class="container m-auto flex justify-between">
    <div class="flex gap-50">
      <IconLogo class="w-228 h-48"/>
      <FloatLabel class="w-140 h-50">
        <Select v-model="selectedCountry" :options="locales" option-label="name" class="w-full h-full !rounded-2xl !bg-primary-500 !border-none">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center gap-8 h-full">
              <Icon :name="`icons:flag-${slotProps.value.code.toLowerCase()}`"/>
              <div class="text-white">{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center gap-8">
              <Icon :name="`icons:flag-${slotProps.option.code.toLowerCase()}`"/>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
          <template #dropdownicon>
            <Icon name="icons:arrow-drop-down-rounded" class="!w-[70%] !h-full !bg-white"/>
          </template>
        </Select>
      </FloatLabel>
    </div>
    <div class="flex gap-16">
      <Button v-if="!authStore.isAuthenticated" label="Войти" class="w-140 h-50 !rounded-2xl" severity="secondary" @click="DialogLogin = true"/>
      <Button v-if="!authStore.isAuthenticated" label="Регистрация" class="w-140 h-50 !rounded-2xl"/>

      <Dialog v-if="!authStore.isAuthenticated" v-model:visible="DialogLogin" modal class="w-840" :show-header="false" content-class="!p-40">
        <Button
            class="absolute top-16 right-16 !p-0 !w-20 !h-20 transition hover:opacity-50"
            :unstyled="true"
            @click="DialogLogin = false"
        ><Icon name="icons:close" class="text-xl"/></Button>
        <div class="flex flex-col gap-24">
          <Image class="w-full" src="/images/header/login.jpg" alt="login" image-class="w-full"/>
          <p class="text-2xl font-bold text-neutral-800">Войти в кабинет</p>
          <form class="flex flex-col gap-16" @submit="onSubmit">
            <div class="grid grid-cols-2 gap-8">
              <FloatLabel variant="on">
                <InputText id="email" v-model="email" name="email" :invalid="!!errors?.email" size="large"/>
                <Message
                    v-if="errors?.email"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="absolute"
                >
                  {{ errors.email }}
                </Message>
                <label for="email">Email</label>
              </FloatLabel>
              <FloatLabel variant="on">
                <Password
                    id="password"
                    v-model="password"
                    name="password"
                    fluid
                    :invalid="!!errors?.password"
                    :feedback="false"
                    size="large"
                />
                <Message
                    v-if="errors?.password"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="absolute"
                >
                  {{ errors.password }}
                </Message>
                <label for="email">Пароль</label>
              </FloatLabel>
            </div>
            <div class="flex flex-col gap-8">
              <Button
                  label="Войти"
                  type="submit"
                  class="w-auto"
                  :loading="authStore.loader ?? undefined"
                  size="large"
              />
              <Button label="Забыли пароль?" variant="text" size="large"/>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  </div>
</header>
</template>

<style scoped>

</style>
