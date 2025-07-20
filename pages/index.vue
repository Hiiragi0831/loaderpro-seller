<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {loginSchema} from "@/schema/loginSchema";

definePageMeta({
  layout: 'empty',
})

const authStore = useAuthStore()
const router = useRouter()
const visible = ref(false)

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema: loginSchema,
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  await authStore.signUp(values.email, values.password)
  if (authStore.isAuthenticated) {
    await router.push('/home')
  }
  handleReset()
})
</script>

<template>
  <main class="relative grid pt-60">
    <section>
      <div class="container m-auto">
        <p class="text-3xl font-bold mt-24 mb-40">{{ $t('welcome') }}</p>
        <div class="grid grid-cols-[1fr_auto_1fr] gap-130 max-lg:grid-cols-1 max-lg:gap-30">
          <div class="flex flex-col gap-20">
            <p class="text-2xl text-primary-500 font-bold">Уже зарегистрированы?</p>
            <p class="text-2xl font-bold">Выполнить вход</p>
            <form class="flex flex-col gap-20" @submit="onSubmit">
              <FloatLabel variant="on">
                <InputText id="email" v-model="email" name="email" :invalid="!!errors?.email" />
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
              <div class="flex gap-40">
                <Button
                    label="Авторизоваться"
                    type="submit"
                    class="w-auto"
                    :loading="authStore.loader ?? undefined"
                />
                <Button label="Забыли пароль?" variant="text" />
              </div>
            </form>
            <Button
                label="Презентация платформы"
                variant="outlined"
                fluid
                class="mt-auto"
                @click="visible = true"
            />
            <Dialog v-model:visible="visible" modal header="Презентация платформы" class="w-1080">
              <video
                  poster="@/assets/images/main/platform-preview.jpg"
                  data-dm-button-id="download-master-button-426080486"
              >
                <source src="@/assets/images/main/platform-presentation.mp4" type="video/mp4" />
              </video>
            </Dialog>
          </div>
          <div class="w-full">
            <Divider layout="vertical" class="!flex max-lg:!hidden"><b>ИЛИ</b></Divider>
            <Divider layout="horizontal" class="!hidden max-lg:!flex" align="center"
            ><b>ИЛИ</b></Divider
            >
          </div>
          <div class="flex flex-col gap-20">
            <p class="text-2xl text-primary-500 font-bold">Новый пользователь?</p>
            <p class="text-2xl font-bold">Зарегистрируйтесь здесь</p>
            <ul class="list-image">
              <li>Ничего лишнего в новом облике с привычным функционалом.</li>
              <li>Запросы на подбор по каталогу или номеру детали.</li>
              <li>Возможность добавить технику в гараж для простоты запроса.</li>
              <li>
                1616 брендов в портфеле, 25 000 тысяч товаров в наличии на складах в России.
              </li>
              <li>Оригиналы и аналоги, 3 надежных канала поставок</li>
            </ul>
            <Button label="Зарегистрироваться" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>
