<script setup lang="ts">
import { useGoodsStore } from "~/stores/goods";

const goodsStore = useGoodsStore();
</script>

<template>
  <GoodsItem
    title="Вручную"
    description="Подойдет, если товаров немного. Можно создавать по одному товару, указывая цену и остаток вручную."
    image="/images/goods/1.png"
    class="col-span-3"
    image-class="-top-28 -right-102 w-408 h-258"
    @click="goodsStore.setActiveTab('manual')"
  />
  <GoodsItem
    title="Через шаблон"
    description="Добавляйте сразу много товаров через таблицу EXCEL. Для этого мы создали умные таблицы с подсказками."
    image="/images/goods/2.png"
    class="col-span-3"
    image-class="-top-10 -right-90 w-408 h-258"
    @click="goodsStore.setActiveTab('template')"
  />
  <SliderInfo class="row-span-2 col-span-2" />
  <GoodsItem
    title="Через API ключ"
    description="Управляйте товарами автоматически — подключите свою систему к личному кабинету LOADERPRO SELLER"
    image="/images/goods/3.png"
    class="col-span-6"
    image-class="top-0 right-0 w-377 h-238"
    @click="goodsStore.setActiveTab('api')"
  />
</template>

<style scoped></style>
