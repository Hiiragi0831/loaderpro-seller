<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { useFormatter } from "~/utils/useFormatter";

const products = ref();
const selectedProducts = ref();
const filters = ref();
const editingRows = ref([]);
const defaultPerPage = ref(10);
const currentPage = ref(1);
const totalRecords = ref(0);
const sortField = ref();
const sortOrder = ref();
const productStore = useProductStore();
const toast = useToast();

const statuses = ref([
  "В продаже",
  "Ожидает отгрузки",
  "Ошибка",
  "Отправлен",
  "В архиве",
  "Ожидает",
  "Снят с продажи",
]);

const brands = ref(["Kalmar", "Toyota", "Hyster", "Crown", "Linde"]);

const qualities = ref(["Оригинал", "OEM", "Аналог"]);

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    product_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    article: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    brand: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    quality: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  };
};

const getSeverity = (status: string) => {
  switch (status) {
    case "В продаже":
      return "bg-green-100 text-green-800";
    case "Ожидает отгрузки":
    case "Ожидает":
      return "bg-yellow-100 text-yellow-800";
    case "Ошибка":
      return "bg-red-100 text-red-800";
    case "Отправлен":
      return "bg-blue-100 text-blue-800";
    case "В архиве":
      return "bg-gray-100 text-gray-800";
    case "Снят с продажи":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const clearFilter = () => {
  initFilters();
  nextTick(() => {
    loadData();
  });
};

const onRowEditSave = async (event: any) => {
  const { newData, index } = event;

  try {
    await productStore.updateProduct(newData.id, newData);

    if (products.value && products.value[index]) {
      products.value[index] = newData;
    }

    toast.add({
      severity: "success",
      summary: "Успешно",
      detail: "Товар обновлен",
      life: 3000,
    });
  } catch (error) {
    console.error("Ошибка обновления товара:", error);

    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Не удалось обновить товар",
      life: 4000,
    });
  }
};

const loadData = async (): Promise<void> => {
  try {
    const filterParams: Record<string, unknown> = {};

    // console.log("Текущие фильтры:", filters.value); // Добавим для отладки

    // Обрабатываем фильтры
    if (filters.value) {
      Object.entries(filters.value).forEach(([key, filter]: [string, any]) => {
        // console.log(`Обрабатываем фильтр ${key}:`, filter); // Для отладки

        if (key === "global") {
          // Глобальный поиск
          if (filter.value && filter.value.trim() !== "") {
            filterParams.search = filter.value.trim();
          }
          return;
        }

        // Обрабатываем фильтры с constraints
        if (filter.constraints && Array.isArray(filter.constraints)) {
          const activeConstraint = filter.constraints.find(
            (c: any) =>
              c.value !== null && c.value !== "" && c.value !== undefined,
          );
          if (activeConstraint) {
            filterParams[key] = activeConstraint.value;
            // console.log(`Добавлен фильтр ${key}:`, activeConstraint.value); // Для отладки
          }
        }
        // Обрабатываем простые фильтры
        else if (
          filter.value !== null &&
          filter.value !== "" &&
          filter.value !== undefined
        ) {
          filterParams[key] = filter.value;
          // console.log(`Добавлен простой фильтр ${key}:`, filter.value); // Для отладки
        }
      });
    }

    // Формируем параметры сортировки
    let sortValue;
    if (sortField?.value && sortOrder?.value) {
      sortValue =
        sortOrder.value === 1 ? sortField.value : `-${sortField.value}`;
    }

    const params = {
      page: currentPage.value || 1,
      limit: defaultPerPage.value || 10,
      ...(sortValue && { sortBy: sortValue }),
      ...filterParams,
    };

    // console.log("Параметры запроса:", params); // Для отладки

    const result = await productStore.fetchProducts(params);

    products.value = result.items || [];
    totalRecords.value = result.meta?.total_items || 0;
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Не удалось загрузить товары",
      life: 4000,
    });
  }
};

// Обработчики для пагинации и сортировки
const onPageChange = (event: any) => {
  currentPage.value = event.page + 1;
  defaultPerPage.value = event.rows;
  loadData();
};

const onSort = (event: any) => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder;
  loadData();
};

// Обработчик для фильтров - вызывается при изменении любого фильтра
const onFilter = () => {
  // console.log("Фильтры изменились, перезагружаем данные"); // Для отладки
  currentPage.value = 1; // Сбрасываем на первую страницу
  loadData();
};

initFilters();
onMounted(loadData);
</script>

<template>
  <main class="relative grid">
    <section>
      <div class="container m-auto">
        <h1 class="mb-40">Список товаров</h1>
        <DataTable
          v-model:filters="filters"
          v-model:selection="selectedProducts"
          v-model:editing-rows="editingRows"
          :value="products"
          :loading="productStore.isLoading"
          paginator
          :rows="defaultPerPage"
          :total-records="totalRecords"
          :lazy="true"
          data-key="id"
          filter-display="menu"
          :global-filter-fields="['product_name', 'article']"
          edit-mode="row"
          @row-edit-save="onRowEditSave"
          @page="onPageChange"
          @sort="onSort"
          @filter="onFilter"
        >
          <template #header>
            <div class="flex justify-between">
              <IconField class="w-300">
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Поиск по названию или артикулу"
                  @input="onFilter"
                />
              </IconField>
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Очистить фильтры"
                variant="outlined"
                @click="clearFilter()"
              />
            </div>
          </template>

          <template #empty> Товары не найдены </template>
          <template #loading> Загрузка товаров... </template>

          <Column selection-mode="multiple" class="w-30"></Column>

          <!-- Название товара -->
          <Column
            field="product_name"
            header="Название товара"
            :sortable="true"
            class="w-400"
          >
            <template #body="{ data }">
              {{ data.product_name }}
            </template>
          </Column>

          <!-- Артикул -->
          <Column
            field="article"
            header="Артикул"
            :sortable="true"
            class="w-150"
          >
            <template #body="{ data }">
              {{ data.article }}
            </template>
          </Column>

          <!-- Бренд -->
          <Column
            field="brand"
            header="Бренд"
            :sortable="true"
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            :show-add-button="false"
            class="w-200"
          >
            <template #filter="{ filterModel }">
              <Select
                v-model="filterModel.value"
                :options="brands"
                placeholder="Выберите бренд"
                show-clear
                @change="onFilter"
              />
            </template>
          </Column>

          <!-- Качество -->
          <Column
            field="quality"
            header="Качество"
            :sortable="true"
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            :show-add-button="false"
            class="w-200"
          >
            <template #filter="{ filterModel }">
              <Select
                v-model="filterModel.value"
                :options="qualities"
                placeholder="Выберите качество"
                show-clear
                @change="onFilter"
              />
            </template>
          </Column>

          <!-- Цена (редактируемая) -->
          <Column field="price" header="Цена" :sortable="true" class="w-150">
            <template #body="{ data }">
              {{ useFormatter().formatMoney(data.price) }}
            </template>
            <template #editor="{ data, field }">
              <InputNumber
                v-model="data[field]"
                mode="currency"
                currency="RUB"
                locale="ru-RU"
              />
            </template>
          </Column>

          <!-- Остаток (редактируемый) -->
          <Column field="stock" header="Остаток" :sortable="true" class="w-110">
            <template #body="{ data }"> {{ data.stock }} шт. </template>
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" :min="0" suffix=" шт." />
            </template>
          </Column>

          <!-- Статус (редактируемый) -->
          <Column
            field="status"
            header="Статус"
            :sortable="true"
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            :show-add-button="false"
            class="w-180"
          >
            <template #body="{ data }">
              <Tag
                :value="data.status"
                :class="`px-5 py-3 rounded-md font-semibold ${getSeverity(data.status)}`"
                :unstyled="true"
              />
            </template>
            <template #editor="{ data, field }">
              <Select
                v-model="data[field]"
                :options="statuses"
                placeholder="Выберите статус"
              />
            </template>
            <template #filter="{ filterModel }">
              <Select
                v-model="filterModel.value"
                :options="statuses"
                placeholder="Выберите статус"
                show-clear
                @change="onFilter"
              />
            </template>
          </Column>

          <!-- Действия -->
          <Column
            :row-editor="true"
            class="w-110"
            body-style="text-align: center"
            header="Действия"
            :pt="{
              columnheadercontent: 'flex items-center justify-center',
            }"
          >
          </Column>
        </DataTable>
      </div>
    </section>
  </main>
</template>
