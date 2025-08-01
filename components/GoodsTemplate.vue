<script setup lang="ts">
import type { FileUploadUploaderEvent } from "primevue";

const toast = useToast();

const upLoader = async (event: FileUploadUploaderEvent) => {
  let file: File | undefined;

  if (Array.isArray(event.files)) {
    file = event.files[0];
  } else {
    file = event.files;
  }

  if (!file) return;

  toast.add({
    severity: "success",
    summary: "Файл загружен",
    detail: `Файл ${file.name} успешно загружен.`,
    life: 3000,
  });
};
</script>

<template>
  <div class="col-span-6">
    <h1 class="mb-40">Загрузить товары через шаблон</h1>
    <div class="flex flex-col gap-40">
      <div class="col">
        <h3 class="mb-12">Шаг 1. Скачайте шаблон</h3>
        <Button size="large" class="!rounded-2xl"> Скачать шаблон </Button>
      </div>
      <div class="col">
        <h3 class="mb-12">Шаг 2. Заполните шаблон</h3>
        <div class="flex w-570 items-center gap-20">
          <Button class="shrink-0 !rounded-2xl" size="large">
            Инструкция
          </Button>
          <Divider layout="vertical" class="!m-0 !h-full" />
          <p class="text-lg">
            Внесите информацию о товарах вашего склада в соответствующие поля
            таблицы.
          </p>
        </div>
      </div>
      <div class="col">
        <h3 class="mb-12">Шаг 3. Загрузите шаблон</h3>
        <div class="w-320">
          <!-- 10485760 -->
          <FileUpload
            :custom-upload="true"
            :auto="true"
            name="file"
            accept=".xls, .xlsx, .xlsm"
            :max-file-size="10485760"
            invalid-file-size-message="Максимальный размер файла 10 МБ"
            choose-label="Загрузить файл"
            unstyled
            :pt="{
              input: {
                class: 'hidden',
              },
            }"
            @uploader="upLoader"
          >
            <template #header="{ chooseCallback }">
              <Button
                class="flex flex-col !rounded-2xl w-full"
                size="large"
                @click="chooseCallback()"
              >
                Выберите файл
                <span class="text-sm opacity-50">
                  Формат - .XLS .XLSX .XLSM. Не больше 10 МБ
                </span>
              </Button>
            </template>
            <template #content="{ files, uploadedFiles, messages }">
              <div class="flex flex-col gap-8">
                <Message
                  v-for="message of messages"
                  :key="message"
                  class="mt-8 items-center"
                  severity="error"
                  :pt="{
                    content: { class: 'justify-center' },
                  }"
                >
                  {{ message }}
                </Message>
                <div v-if="files.length > 0"></div>
                <div v-if="uploadedFiles.length > 0"></div>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
      <div class="col">
        <Button severity="contrast" size="large" class="!rounded-2xl">
          Опубликовать
        </Button>
      </div>
    </div>
    <GoodsAnother />
  </div>
</template>

<style scoped></style>
