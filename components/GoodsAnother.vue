<script setup lang="ts">
import { useGoodsStore } from "~/stores/goods";

const goodsStore = useGoodsStore();
</script>

<template>
  <div>
    <h3 class="mt-40 mb-20">Другие способы добавить товар</h3>
    <div class="grid grid-cols-2 gap-40">
      <GoodsItem
        v-if="goodsStore.activeTab != 'manual'"
        title="Вручную"
        description="Подойдет, если товаров немного. Можно создавать по одному товару, указывая цену и остаток вручную."
        image="/images/goods/1.png"
        image-class="-top-28 -right-102 w-408 h-258"
        @click="goodsStore.setActiveTab('manual')"
      />
      <GoodsItem
        v-if="goodsStore.activeTab != 'template'"
        title="Через шаблон"
        description="Добавляйте сразу много товаров через таблицу EXCEL. Для этого мы создали умные таблицы с подсказками."
        image="/images/goods/2.png"
        image-class="-top-10 -right-90 w-408 h-258"
        @click="goodsStore.setActiveTab('template')"
      />
      <GoodsItem
        v-if="goodsStore.activeTab != 'api'"
        title="Через API ключ"
        description="Управляйте товарами автоматически — подключите свою систему к личному кабинету LOADERPRO SELLER"
        image="/images/goods/3.png"
        image-class="-top-10 -right-90 w-377 h-238"
        @click="goodsStore.setActiveTab('api')"
      />
    </div>
  </div>
</template>

<style scoped></style>
