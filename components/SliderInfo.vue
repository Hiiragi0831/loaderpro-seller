<script setup lang="ts">
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  autoplay: {
    delay: 5000,
  },
  pagination: true,
  spaceBetween: 30,
});

onMounted(() => swiper.instance);

const slides = [
  {
    image: "/images/slide-info/1.jpg",
    title: "Чтобы зарабатывать больше - работайте в «Запросы ONLINE»",
    content: [
      "На товары с вашего склада добавленные в каталог клиенты видят предложения сразу. Также у вас есть возможность дать цены на товары которых у вас нет на складе в сервисе «Запросы ONLINE». Мы даем 24 часа на обработку онлайн запроса. В нём вы можете указать цену и срок поставки товара до вашего склада и клиент увидит ваше предложение. Запрос пропадет автоматически из «Запросы ONLINE» через 24 часа.",
    ],
    link: "/",
  },
  {
    image: "/images/slide-info/2.jpg",
    title: "Больше товаров = больше заказов",
    content: [
      "Мы рекомендуем создавать витрину минимум на 500 товаров, начиная от этого количества вы начнете получать регулярные заказы. Воспользуйтесь любым удобным способом чтобы добавить все товары с вашего склада к нам в систему. Помните - не обязательно держать на витрине только ликвидные товары, так как запросов очень много и на любой товар найдется свой покупатель.",
    ],
    link: "/",
  },
  {
    image: "/images/slide-info/1.jpg",
    title: "Поддерживайте актуальность данных в товарах",
    content: [
      "Мы настоятельно просим внимательно следить за актуальностью данных в предлагаемых товарах. Это относится как к витрине, так и к сервису «Запросы ONLINE».",
      "Мы настоятельно просим внимательно следить за актуальностью данных в предлагаемых товарах. Это относится как к витрине, так и к сервису «Запросы ONLINE».",
    ],
  },
];
</script>

<template>
  <swiper-container
    ref="containerRef"
    :init="false"
    class="w-full rounded-2xl overflow-hidden"
  >
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="index"
      class="pb-66 p-40 rounded-2xl bg-primary-600 overflow-hidden"
    >
      <Image
        :src="slide.image"
        class="absolute top-0 left-0 h-full w-full opacity-10"
        image-class="h-full object-cover"
      />
      <div class="flex flex-col text-white gap-20 h-full z-2 relative">
        <p class="text-2xl font-bold">
          {{ slide.title }}
        </p>
        <p v-for="(paragraph, pIndex) in slide.content" :key="pIndex">
          {{ paragraph }}
        </p>
        <Button v-if="slide.link" severity="contrast" class="mt-auto"
          >Перейти</Button
        >
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
swiper-container::part(pagination) {
  display: grid;
  bottom: calc(25 * var(--width-multiplier));
  left: calc(40 * var(--width-multiplier));
  width: calc(100% - 80 * var(--width-multiplier));
  margin: 0;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(25 * var(--width-multiplier));
}

swiper-container::part(bullet) {
  width: 100%;
  border-radius: calc(50 * var(--width-multiplier));
  background: white;
  opacity: 1;
  height: calc(6 * var(--width-multiplier));
}
swiper-container::part(bullet-active) {
  width: 100%;
  border-radius: calc(50 * var(--width-multiplier));
  background: black;
  height: calc(6 * var(--width-multiplier));
}
</style>
