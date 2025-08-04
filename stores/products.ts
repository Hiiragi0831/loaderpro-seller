import { defineStore } from "pinia";

interface ProductParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  status?: string;
  quality?: string;
  brand?: string;
  product_name?: string;
  article?: string;
  price_from?: number;
  price_to?: number;
  stock_from?: number;
  stock_to?: number;
  [key: string]: any; // Для поддержки любых дополнительных параметров
}

export const useProductStore = defineStore("products", {
  state: () => ({
    cache: new Map(),
    loading: false,
    updating: false,
    cacheTimeout: 5 * 60 * 1000, // 5 минут
  }),

  getters: {
    isLoading: (state) => state.loading,
    isUpdating: (state) => state.updating,
  },

  actions: {
    generateCacheKey(params: ProductParams): string {
      return JSON.stringify(params);
    },

    isCacheValid(entry: any): boolean {
      return Date.now() - entry.timestamp < this.cacheTimeout;
    },

    async fetchProducts(params: ProductParams = {}): Promise<any> {
      const cacheKey = this.generateCacheKey(params);
      const cachedEntry = this.cache.get(cacheKey);

      // Проверяем кэш
      if (cachedEntry && this.isCacheValid(cachedEntry)) {
        return cachedEntry.data;
      }

      this.loading = true;

      try {
        const urlParams = new URLSearchParams();

        // Добавляем базовые параметры пагинации
        urlParams.set("page", String(params.page || 1));
        urlParams.set("limit", String(params.limit || 10));

        // Добавляем все остальные параметры фильтрации
        Object.entries(params).forEach(([key, value]) => {
          // Пропускаем базовые параметры, которые уже добавлены
          if (key === "page" || key === "limit") return;

          // Добавляем параметр, только если значение не пустое
          if (value !== undefined && value !== null && value !== "") {
            urlParams.set(key, String(value));
          }
        });

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products?${urlParams}`,
          {
            method: "GET",
          },
        );

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }

        const result = await res.json();

        // Сохраняем в кэш
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
          params,
        });

        return result;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id: number, data: any) {
      this.updating = true;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }

        const updatedProduct = await res.json();

        // Инвалидируем кэш после обновления
        this.invalidateCache();

        return updatedProduct;
      } finally {
        this.updating = false;
      }
    },

    clearCache() {
      this.cache.clear();
    },

    invalidateCache(pattern?: Partial<ProductParams>) {
      if (!pattern) {
        this.clearCache();
        return;
      }

      // Удаляем записи, которые соответствуют паттерну
      for (const [key, entry] of this.cache.entries()) {
        const shouldInvalidate = Object.entries(pattern).every(
          ([paramKey, paramValue]) => {
            if (paramValue === undefined) return true;
            return entry.params[paramKey as keyof ProductParams] === paramValue;
          },
        );

        if (shouldInvalidate) {
          this.cache.delete(key);
        }
      }
    },
  },
});
