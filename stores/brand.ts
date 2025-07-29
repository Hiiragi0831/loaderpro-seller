import { defineStore } from "pinia";

export interface Brand {
  name: string;
}

export const useBrandStore = defineStore("brand", {
  state: () => ({
    brand: [] as Brand[],
    loaded: false,
  }),
  actions: {
    async getBrands() {
      // console.log("getBrands вызван, loaded:", this.loaded);

      if (this.loaded) {
        // console.log("Бренды уже загружены");
        return;
      }

      const storedBrands = localStorage.getItem("brand");

      if (storedBrands) {
        try {
          this.brand = JSON.parse(storedBrands);
          this.loaded = true;
          // console.log("Бренды загружены из localStorage:", this.brand.length);
          return;
        } catch (error) {
          console.error("Ошибка парсинга брендов:", error);
        }
      }

      const userStr = localStorage.getItem("user");
      // console.log("Пользователь в localStorage:", !!userStr);

      if (!userStr) {
        // console.error("User not found in localStorage");
        return;
      }

      const user = JSON.parse(userStr);
      // console.log("Загружаем бренды с сервера...");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/brand`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.ok) {
        this.brand = await res.json();
        localStorage.setItem("brand", JSON.stringify(this.brand));
        this.loaded = true;
        // console.log("Бренды загружены с сервера:", this.brand.length);
      } else {
        // console.error("Ошибка загрузки брендов:", res.status);
      }
    },
  },
});
