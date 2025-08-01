<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { productSchema } from "~/schema/productShema";
import { useBrandStore } from "~/stores/brand";

const brandStore = useBrandStore();
const brands = computed(() => brandStore.brand);

const { handleSubmit, errors, handleReset } = useForm({
  validationSchema: productSchema,
});

const { value: product_name } = useField<string>("product_name");
const { value: brand } = useField("brand");
const { value: article } = useField<string>("article");
const { value: price } = useField<number>("price");
const { value: stock } = useField<number>("stock");
const { value: quality } = useField<string>("quality");

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  handleReset();
});
</script>

<template>
  <div class="col-span-6">
    <h2 class="mb-40">Заполните поля для добавления товара</h2>
    <form class="grid grid-cols-3 gap-20" @submit="onSubmit">
      <FloatLabel variant="on">
        <InputText
          id="product_name"
          v-model="product_name"
          name="product_name"
          :invalid="!!errors?.product_name"
          size="large"
        />
        <Message
          v-if="errors?.product_name"
          severity="error"
          size="small"
          variant="simple"
          class="absolute"
        >
          {{ errors.product_name }}
        </Message>
        <label for="product_name">Название товара</label>
      </FloatLabel>
      <FloatLabel variant="on" class="h-full">
        <Select
          v-model="brand"
          label-id="brand"
          :options="brands"
          option-label="name"
          option-value="name"
          filter
          class="w-full h-full"
          fluid
          :invalid="!!errors?.brand"
          :pt="{
            label: '!flex items-center w-full',
          }"
        />
        <label for="brand">Бренд</label>
        <Message
          v-if="errors?.brand"
          severity="error"
          size="small"
          variant="simple"
          class="absolute"
          >{{ errors?.brand }}
        </Message>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText
          id="article"
          v-model="article"
          name="article"
          :invalid="!!errors?.article"
          size="large"
        />
        <Message
          v-if="errors?.article"
          severity="error"
          size="small"
          variant="simple"
          class="absolute"
        >
          {{ errors.article }}
        </Message>
        <label for="article">Артикул</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputNumber
          id="price"
          v-model="price"
          suffix=" ₽"
          name="price"
          class="w-full"
          :invalid="!!errors?.price"
          size="large"
        />
        <Message
          v-if="errors?.price"
          severity="error"
          size="small"
          variant="simple"
          class="absolute"
        >
          {{ errors.price }}
        </Message>
        <label for="price">Цена</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputNumber
          id="stock"
          v-model="stock"
          name="stock"
          class="w-full"
          suffix=" шт."
          :invalid="!!errors?.stock"
          size="large"
        />
        <Message
          v-if="errors?.stock"
          severity="error"
          size="small"
          variant="simple"
          class="absolute"
        >
          {{ errors.stock }}
        </Message>
        <label for="stock">Остаток</label>
      </FloatLabel>
      <FloatLabel variant="on" class="h-full">
        <Select
          v-model="quality"
          label-id="quality"
          :options="['Оригинал', 'OEM', 'Аналог']"
          class="w-full h-full"
          fluid
          :invalid="!!errors?.quality"
          :pt="{
            label: '!flex items-center w-full',
          }"
        />
        <label for="quality">Качество</label>
        <Message
          v-if="errors?.quality"
          severity="error"
          size="small"
          variant="simple"
          class="absolute"
          >{{ errors?.quality }}
        </Message>
      </FloatLabel>
      <Button type="submit" size="large" class="col-span-3">
        Добавить товар
      </Button>
    </form>
    <GoodsAnother />
  </div>
</template>

<style scoped></style>
