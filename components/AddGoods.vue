<script setup lang="ts"></script>

<template>
  <section>
    <div class="container m-auto">
      <div class="grid grid-cols-8">
        <div class="col-span-6">
          <h1 class="mb-40">Загрузить товары через шаблон</h1>
          <div class="flex flex-col gap-40">
            <div class="col">
              <h3 class="mb-12">Шаг 1. Скачайте шаблон</h3>
              <Button size="large" class="!rounded-2xl">
                Скачать шаблон
              </Button>
            </div>
            <div class="col">
              <h3 class="mb-12">Шаг 2. Заполните шаблон</h3>
              <div class="flex w-570 items-center gap-20">
                <Button class="shrink-0 !rounded-2xl" size="large">
                  Инструкция
                </Button>
                <Divider layout="vertical" class="!m-0 !h-full" />
                <p class="text-lg">
                  Внесите информацию о товарах вашего склада в соответствующие
                  поля таблицы.
                </p>
              </div>
            </div>
            <div class="col">
              <h3 class="mb-12">Шаг 3. Загрузите шаблон</h3>
              <Button size="large" class="!rounded-2xl">Скачать шаблон</Button>
            </div>
            <div class="col">
              <Button severity="contrast" size="large" class="!rounded-2xl">
                Опубликовать
              </Button>
            </div>
          </div>
        </div>
        <div class="col-span-2">Если нужна помощь</div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
