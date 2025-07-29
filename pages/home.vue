<script setup lang="ts"></script>

<template>
  <main class="relative grid">
    <section>
      <div class="container m-auto">
        <div class="grid grid-cols-4 gap-15">
          <InfoBlock
            value="1 428 462 ₽"
            description="Выручка за текущий месяц"
            text="+2,4% от прошлого месяца"
          />
          <InfoBlock
            value="135"
            description="Заказов за текущий месяц"
            text="+7,4% от прошлого месяца"
          />
          <InfoBlock
            value="3 448 ₽"
            description="Упущено за текущий месяц"
            text="15% от вашего оборота"
          />
          <InfoBlock
            value="18"
            description="Активных товаров"
            text="Рекомендуем добавить"
          />
          <div class="bg-gray-100 rounded-2xl col-span-3">
            <ChartInfo />
          </div>
          <div class="flex relative">
            <SliderInfo />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
