<script setup lang="ts">

</script>

<template>
<footer class="mt-auto bg-[#131313] py-40">
  <div class="container m-auto relative">
    <IconLogo class="w-228 h-48 text-white"/>
    <Divider class="!my-40" style="--p-divider-border-color: #404040"/>
    <div class="grid grid-cols-3">
      <div class="flex flex-col gap-20">
        <p class="text-xl font-bold text-white">Навигация</p>
        <div class="flex text-white w-340 gap-70">
          <div class="flex flex-col text-white w-340 gap-30">
            <RouterLink to="/home">Главная</RouterLink>
            <RouterLink to="/home">Товары</RouterLink>
            <RouterLink to="/home">Запросы ONLINE</RouterLink>
          </div>
          <div class="flex flex-col text-white w-340 gap-30">
            <RouterLink to="/home">Заказы</RouterLink>
            <RouterLink to="/home">Добавить товар</RouterLink>
            <RouterLink to="/home">Контакты</RouterLink>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-20">
        <p class="text-xl font-bold text-white">Контакты</p>
        <div class="flex text-white gap-12 items-center">
          <Icon name="icons:location" class="text-2xl"/>
          Российская Федерация
        </div>
        <div class="flex text-white gap-12 items-center">
          <Icon name="icons:phone" class="text-2xl"/>
          8 (800) 551-19-96 | +7 (812) 642-12-56
        </div>
        <div class="flex text-white gap-12 items-center">
          <Icon name="icons:mail" class="text-2xl"/>
          seller@loaderpro.ru
        </div>
      </div>
      <div class="flex flex-col gap-20 items-end">
        <div class="flex gap-15">
          <a href="#" target="_blank" class="rounded-full bg-white h-32 w-32 flex items-center justify-center">
            <Icon name="icons:whatsapp" class="text-2xl"/>
          </a>
          <a href="#" target="_blank" class="rounded-full bg-white h-32 w-32 flex items-center justify-center">
            <Icon name="icons:telegram" class="text-2xl"/>
          </a>
          <a href="#" target="_blank" class="rounded-full bg-white h-32 w-32 flex items-center justify-center">
            <Icon name="icons:vk" class="text-2xl"/>
          </a>
          <a href="#" target="_blank" class="rounded-full bg-white h-32 w-32 flex items-center justify-center">
            <Icon name="icons:youtube" class="text-2xl"/>
          </a>
          <a href="#" target="_blank" class="rounded-full bg-white h-32 w-32 flex items-center justify-center">
            <Icon name="icons:rutube" class="text-base"/>
          </a>
        </div>
        <Image src="images/footer/ya.jpg" class="w-162 h-48 mt-auto"/>
      </div>
    </div>
    <Divider class="!my-40" style="--p-divider-border-color: #404040"/>
    <p class="text-white text-center">Все права защищены. 2025</p>
  </div>

</footer>
</template>

<style scoped>

</style>
