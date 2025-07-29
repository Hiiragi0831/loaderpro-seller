<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { loginSchema } from "~/schema/loginSchema";

const DialogShow = ref(false);
const authStore = useAuthStore();

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema: loginSchema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const onSubmit = handleSubmit(async (values) => {
  await authStore.signUp(values.email, values.password);
  DialogShow.value = false;
  handleReset();
});
</script>

<template>
  <div>
    <Button
      label="Войти"
      class="w-140 h-50 !rounded-2xl"
      severity="secondary"
      @click="DialogShow = true"
    />
    <Dialog
      v-model:visible="DialogShow"
      modal
      class="w-840"
      :show-header="false"
      content-class="!p-40"
    >
      <Button
        class="absolute top-16 right-16 !p-0 !w-20 !h-20 transition hover:opacity-50"
        :unstyled="true"
        @click="DialogShow = false"
        ><Icon name="icons:close" class="text-xl"
      /></Button>
      <div class="flex flex-col gap-24">
        <Image
          class="w-full rounded-xl overflow-hidden"
          src="/images/header/login.jpg"
          alt="login"
          image-class="w-full"
        />
        <p class="text-2xl font-bold text-neutral-800">Войти в кабинет</p>
        <form class="flex flex-col gap-16" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-8">
            <FloatLabel variant="on">
              <InputText
                id="email"
                v-model="email"
                name="email"
                :invalid="!!errors?.email"
                size="large"
              />
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
            <Button label="Забыли пароль?" variant="text" size="large" />
          </div>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
