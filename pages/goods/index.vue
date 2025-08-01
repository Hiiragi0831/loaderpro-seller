<script setup lang="ts">
import { useGoodsStore } from "~/stores/goods";

const goodsStore = useGoodsStore();
</script>

<template>
  <main class="relative grid">
    <section>
      <div class="container m-auto">
        <h1 v-if="goodsStore.activeTab === 'home'" class="mb-40">
          Добавить товары
        </h1>
        <div class="grid grid-cols-8 gap-20">
          <GoodsHome v-if="goodsStore.activeTab === 'home'" />
          <GoodsManual v-if="goodsStore.activeTab === 'manual'" />
          <GoodsTemplate v-if="goodsStore.activeTab === 'template'" />
          <GoodsApi v-if="goodsStore.activeTab === 'api'" />
          <GoodsHelp v-if="goodsStore.activeTab !== 'home'" />
        </div>
      </div>
    </section>
  </main>
</template>
