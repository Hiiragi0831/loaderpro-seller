<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { salesmanSchema } from "~/schema/salesmanSchema";

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema: salesmanSchema,
});

const { value: name } = useField<string>("name");
const { value: tel } = useField<string>("tel");

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  handleReset();
});
</script>

<template>
  <main class="relative grid">
    <section class="relative">
      <Image
        src="/images/index/hero.jpg"
        class="absolute w-full h-full px-20"
        image-class="w-full h-full object-cover rounded-4xl"
      />
      <div class="container m-auto relative py-60">
        <div class="grid grid-cols-2 gap-300">
          <div class="flex flex-col text-white">
            <p class="text-6xl font-bold mb-7">
              <span class="text-white">LOADERPRO</span>
              <span class="text-primary-500">SELLER</span>
            </p>
            <p class="text-xl">
              Работая на рынке складской техники с 2017 года мы осуществляем
              продажу запчастей и комплектующих для бесперебойной и эффективной
              работы бизнеса в России.
            </p>
            <div class="mt-50 flex flex-col gap-24">
              <div class="flex items-center gap-24">
                <p class="w-170">С кем работаем</p>
                <div class="flex gap-24 p-10 bg-white/15 rounded-xl">
                  <div class="flex gap-12 items-center">
                    <Icon
                      name="icons:suitcase"
                      class="text-2xl text-primary-500"
                    />
                    <p>Юр. лица</p>
                  </div>
                  <div class="flex gap-12 items-center">
                    <Icon
                      name="icons:university"
                      class="text-2xl text-primary-500"
                    />
                    <p>ИП</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-24">
                <p class="w-170">Предоставляем</p>
                <div class="flex gap-24 p-10 bg-white/15 rounded-xl">
                  <div class="flex gap-12 items-center">
                    <Icon
                      name="icons:users"
                      class="text-2xl text-primary-500"
                    />
                    <p>Заказы / Поддержку / Аналитику</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-24">
                <p class="w-170">Форматы работы</p>
                <div class="flex gap-24 p-10 bg-white/15 rounded-xl">
                  <div class="flex gap-12 items-center">
                    <Icon
                      name="icons:book-open"
                      class="text-2xl text-primary-500"
                    />
                    <p>FBS / FBO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-40 rounded-2xl bg-white">
            <p class="text-2xl font-bold">Стать продавцом</p>
            <form class="flex flex-col gap-18 mt-24" @submit="onSubmit">
              <FloatLabel variant="on" class="h-50">
                <InputText
                  id="name"
                  v-model="name"
                  name="name"
                  :invalid="!!errors?.name"
                  size="large"
                  class="h-50 !bg-gray-100"
                />
                <Message
                  v-if="errors?.name"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="absolute"
                >
                  {{ errors.name }}
                </Message>
                <label for="name">Имя</label>
              </FloatLabel>
              <FloatLabel variant="on" class="h-50">
                <InputText
                  id="tel"
                  v-model="tel"
                  name="tel"
                  :invalid="!!errors?.tel"
                  size="large"
                  class="h-50 !bg-gray-100"
                />
                <Message
                  v-if="errors?.tel"
                  severity="error"
                  size="small"
                  variant="simple"
                  class="absolute"
                >
                  {{ errors.tel }}
                </Message>
                <label for="tel">Телефон</label>
              </FloatLabel>
              <Button
                label="Стать продавцом"
                class="w-full h-50"
                type="submit"
                variant="outlined"
              />
              <p class="text-sm text-gray-500">
                Нажимая кнопку «Стать продавцом», я даю свое согласие на
                обработку моих персональных данных, в соответствии с Федеральным
                законом от 27.07.2006 года No152-ФЗ «О персональных данных», на
                условиях и для целей, определенных в Согласии на обработку
                персональных данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="relative my-40 mx-20">
      <div class="absolute w-full h-full bg-primary-500 rounded-4xl" />
      <div class="container m-auto relative py-50">
        <div class="flex items-center gap-80">
          <p class="text-4xl font-bold text-white w-520">
            Почему вам стоит продавать на LOADERPRO
          </p>
          <div class="flex gap-43">
            <div class="flex flex-col gap-16 text-white">
              <p class="text-6xl font-semibold">12 000</p>
              <p class="text-xl font-semibold">Клиентов доверились LOADERPRO</p>
            </div>
            <Divider
              layout="vertical"
              type="dashed"
              class="!m-0"
              style="--p-divider-border-color: rgb(255, 255, 255)"
            />
            <div class="flex flex-col gap-16 text-white">
              <p class="text-6xl font-semibold">54 000</p>
              <p class="text-xl font-semibold">
                Заказов разместили наши клиенты
              </p>
            </div>
            <Divider
              layout="vertical"
              type="dashed"
              class="!m-0"
              style="--p-divider-border-color: rgb(255, 255, 255)"
            />
            <div class="flex flex-col gap-16 text-white w-390 flex-shrink-0">
              <p class="text-6xl font-semibold">1 000 000 000</p>
              <p class="text-xl font-semibold">Рублей получили наши продавцы</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
