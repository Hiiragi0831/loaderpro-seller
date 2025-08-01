import { useAuthStore } from "@/stores/auth";

const publicRoutes = ["index", "privacy-policy"]; // Добавьте сюда ваши публичные маршруты

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await authStore.checkToken();

  if (authStore.isAuthenticated && to.name === "index") {
    return navigateTo({ name: "home" });
  }

  if (!publicRoutes.includes(to.name as string) && !authStore.isAuthenticated) {
    return navigateTo({ name: "index" });
  }
});
