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
      if (this.loaded) return;

      const storedBrands = localStorage.getItem("brand");
      if (storedBrands) {
        this.brand = JSON.parse(storedBrands);
        this.loaded = true;
        return;
      }

      const userStr = localStorage.getItem("user");
      if (!userStr) {
        console.error("User not found in localStorage");
        return;
      }

      const user = JSON.parse(userStr);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/brand`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      this.brand = await res.json();
      localStorage.setItem("brand", JSON.stringify(this.brand));
      this.loaded = true;
    },
  },
});
